import { useState, useEffect } from "react";
import CloseIcon from "@mui/icons-material/Close";
import RemoveIcon from "@mui/icons-material/Remove";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import CodeIcon from "@mui/icons-material/Code";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import DoneIcon from "@mui/icons-material/Done";
import TerminalIcon from "@mui/icons-material/Terminal";
import BugReportIcon from "@mui/icons-material/BugReport";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

export const CodeEditorMockup = () => {
  const [codeCopied, setCodeCopied] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleCopyCode = () => {
    setCodeCopied(true);
    navigator.clipboard.writeText(codeContent);
    setTimeout(() => setCodeCopied(false), 2000);
  };

  const codeContent = `// 1. Two Sum
var twoSum = function(nums, target) {
    const map = new Map();
    for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i];
        if (map.has(complement)) {
            return [map.get(complement), i];
        }
        map.set(nums[i], i);
    }
};`;

  const codeLines = codeContent.split("\n");

  // Calculate parallax values
  const y = scrollY * -0.2;
  const rotationFactor = Math.min(scrollY / 500, 1);
  const rotateZ = 5 - rotationFactor * 5;

  return (
    <div
      className="hidden lg:block mt-12 lg:mt-0 relative parallax-container overflow-visible "
      style={{ perspective: "1000px" }}
    >
      {/* Code Editor Container with 3D Transform */}
      <div
        className="bg-editor-bg rounded-xl shadow-2xl border border-border-dark overflow-hidden transform  hover:scale-[1.03] hover:shadow-[0_0_80px_-10px_rgba(249,115,22,0.6)] hover:-translate-y-2 w-[140%] -ml-[20%] relative z-10  mt-14"
        style={{
          transform: `translateY(${y}px) rotateX(10deg) rotateY(-5deg) rotateZ(${rotateZ}deg)`,
          transformStyle: "preserve-3d",
          willChange: "transform",
        }}
      >
        {/* Window Header */}
        <WindowHeader onCopy={handleCopyCode} codeCopied={codeCopied} />

        {/* Code Content */}
        <CodeContent lines={codeLines} />

        {/* Editor Footer */}
        <EditorFooter />
      </div>
    </div>
  );
};

// Window Header Component
const WindowHeader = ({
  onCopy,
  codeCopied,
}: {
  onCopy: () => void;
  codeCopied: boolean;
}) => {
  return (
    <div className="flex items-center justify-between px-4 py-3 bg-background-dark border-b border-border-dark">
      {/* Traffic Light Buttons */}
      <div className="flex items-center space-x-2">
        <TrafficLightButton
          color="red"
          icon={<CloseIcon sx={{ fontSize: 10 }} />}
        />
        <TrafficLightButton
          color="yellow"
          icon={<RemoveIcon sx={{ fontSize: 10 }} />}
        />
        <TrafficLightButton
          color="green"
          icon={<FullscreenIcon sx={{ fontSize: 10 }} />}
        />
      </div>

      {/* File Name */}
      <div className="flex items-center text-sm text-subtext-dark">
        <CodeIcon className="mr-2 text-blue-400" />
        TwoSum.js
      </div>

      {/* Copy Button */}
      <div className="w-12 flex justify-end">
        <button
          onClick={onCopy}
          className="text-subtext-dark hover:text-text-dark transition-colors"
        >
          {codeCopied ? (
            <DoneIcon className="text-green-400" fontSize="small" />
          ) : (
            <ContentCopyIcon fontSize="small" />
          )}
        </button>
      </div>
    </div>
  );
};

// Traffic Light Button Component
const TrafficLightButton = ({
  color,
  icon,
}: {
  color: "red" | "yellow" | "green";
  icon: React.ReactNode;
}) => {
  const colorClasses = {
    red: "bg-red-500",
    yellow: "bg-yellow-500",
    green: "bg-green-500",
  };

  const iconColorClasses = {
    red: "text-red-900",
    yellow: "text-yellow-900",
    green: "text-green-900",
  };

  return (
    <span
      className={`w-3.5 h-3.5 ${colorClasses[color]} rounded-full flex items-center justify-center group cursor-pointer`}
    >
      <span
        className={`${iconColorClasses[color]} opacity-0 group-hover:opacity-100 transition-opacity`}
      >
        {icon}
      </span>
    </span>
  );
};

// Code Content Component
const CodeContent = ({ lines }: { lines: string[] }) => {
  return (
    <div
      className="code-editor text-sm leading-relaxed overflow-auto text-gray-300"
      style={{ maxHeight: "450px" }}
    >
      <div className="flex p-4">
        {/* Line Numbers */}
        <div className="line-numbers pr-4 text-right">
          {lines.map((_, index) => (
            <div key={index} className="line-number text-gray-500 select-none">
              {index + 1}
            </div>
          ))}
        </div>

        {/* Code Content */}
        <pre className="flex-1">
          <code className="language-js">
            {lines.map((line, index) => (
              <div
                key={index}
                className="code-line hover:bg-gray-800/50 transition-colors"
              >
                <SyntaxHighlightedLine line={line} />
              </div>
            ))}
            {/* Blinking Cursor */}
            <span className="inline-block h-4 w-0.5 bg-white animate-pulse ml-1"></span>
          </code>
        </pre>
      </div>
    </div>
  );
};

// Syntax Highlighting Component
// Simpler and more reliable syntax highlighting
const SyntaxHighlightedLine = ({ line }: { line: string }) => {
  const highlightSyntax = (text: string) => {
    const parts: Array<{ text: string; className: string }> = [];
    let remaining = text;

    // Handle comments (highest priority)
    if (remaining.includes("//")) {
      const commentIndex = remaining.indexOf("//");
      const beforeComment = remaining.substring(0, commentIndex);
      const comment = remaining.substring(commentIndex);

      if (beforeComment) {
        parts.push(...tokenize(beforeComment));
      }
      parts.push({ text: comment, className: "text-gray-500" });

      return parts;
    }

    return tokenize(remaining);
  };

  const tokenize = (
    text: string
  ): Array<{ text: string; className: string }> => {
    const tokens = text.split(/(\s+|[{}();,.])/);

    return tokens.map((token) => {
      if (/^\s+$/.test(token) || token === "") {
        return { text: token, className: "" };
      }

      // Keywords
      if (/^(var|const|let|for|if|return|new|function)$/.test(token)) {
        return { text: token, className: "text-pink-400" };
      }

      // Built-in methods
      if (/^(Map|has|get|set|length)$/.test(token)) {
        return { text: token, className: "text-yellow-300" };
      }

      // Variables
      if (/^(twoSum|map|nums|target|i|complement)$/.test(token)) {
        return { text: token, className: "text-cyan-300" };
      }

      // Numbers
      if (/^\d+$/.test(token)) {
        return { text: token, className: "text-green-300" };
      }

      // Strings
      if (/^["'].*["']$/.test(token)) {
        return { text: token, className: "text-green-400" };
      }

      return { text: token, className: "text-gray-300" };
    });
  };

  const tokens = highlightSyntax(line);

  return (
    <>
      {tokens.map((token, index) => (
        <span key={index} className={token.className}>
          {token.text}
        </span>
      ))}
    </>
  );
};

// Editor Footer Component
const EditorFooter = () => {
  const tools = [
    { icon: <TerminalIcon />, label: "Console" },
    { icon: <BugReportIcon />, label: "Debugger" },
  ];

  const actionButtons = [
    {
      icon: <PlayArrowIcon />,
      label: "Run",
      className:
        "bg-gray-700/50 border border-gray-600 text-white hover:bg-gray-700",
    },
    {
      icon: <CheckCircleIcon />,
      label: "Submit",
      className: "bg-green-600/80 text-white hover:bg-green-600",
    },
  ];

  return (
    <div className="p-3 bg-background-dark/50 backdrop-blur-sm border-t border-border-dark flex justify-between items-center">
      {/* Left: Tools */}
      <div className="flex items-center space-x-4">
        {tools.map((tool, index) => (
          <div
            key={index}
            className="flex items-center space-x-2 text-sm text-subtext-dark"
          >
            {tool.icon}
            <span>{tool.label}</span>
          </div>
        ))}
      </div>

      {/* Right: Action Buttons */}
      <div className="flex space-x-2">
        {actionButtons.map((button, index) => (
          <button
            key={index}
            className={`${button.className} px-4 py-1.5 rounded-md text-sm font-medium transition-all flex items-center space-x-2`}
          >
            {button.icon}
            <span>{button.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};
