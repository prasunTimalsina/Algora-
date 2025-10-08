import { Code, EmojiEvents, TrendingUp } from "@mui/icons-material";

/**
 * SignupHeroSection Component
 *
 * Right-side hero section with background pattern
 * Hidden on mobile, visible on large screens
 */
export const SignupHeroSection = () => {
  return (
    <div className="relative hidden w-0 flex-1 lg:block">
      {/* Dotted Grid Background */}
      <div
        className="absolute inset-0 h-full w-full bg-background-light dark:bg-background-dark"
        style={{
          backgroundImage:
            "radial-gradient(circle, #e5e7eb 1px, transparent 1px)",
          backgroundSize: "16px 16px",
        }}
      />

      {/* Dark mode background override */}
      <div
        className="dark:absolute dark:inset-0 dark:h-full dark:w-full dark:bg-background-dark dark:opacity-100"
        style={{
          backgroundImage:
            "radial-gradient(circle, #1f2937 1px, transparent 1px)",
          backgroundSize: "16px 16px",
        }}
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-background-light via-transparent to-transparent dark:from-background-dark" />

      {/* Content */}
      <div className="flex h-full flex-col justify-center items-center px-10 relative z-10">
        <div className="max-w-2xl text-center">
          <h1 className="text-4xl font-black tracking-tight text-text-light dark:text-text-dark sm:text-5xl md:text-6xl font-display">
            Welcome to the <span className=" text-primary">arena</span>.
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
            Join thousands of developers who are sharpening their skills,
            solving challenges, and advancing their careers. Your coding journey
            starts here.
          </p>
        </div>

        {/* Feature Icons */}
        <div className="mt-12 flex justify-center items-center space-x-8">
          <div className="flex flex-col items-center space-y-2">
            <div className="bg-gray-200 dark:bg-gray-800 p-4 rounded-full">
              <span className="material-icons text-4xl text-primary">
                <EmojiEvents />
              </span>
            </div>
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Compete
            </span>
          </div>
          <div className="flex flex-col items-center space-y-2">
            <div className="bg-gray-200 dark:bg-gray-800 p-4 rounded-full">
              <span className="material-icons text-4xl text-primary">
                <Code />
              </span>
            </div>
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Solve
            </span>
          </div>
          <div className="flex flex-col items-center space-y-2">
            <div className="bg-gray-200 dark:bg-gray-800 p-4 rounded-full">
              <span className="material-icons text-4xl text-primary">
                <TrendingUp />
              </span>
            </div>
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Improve
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
