import { Link } from "react-router-dom";
import CodeIcon from "@mui/icons-material/Code";
import SearchIcon from "@mui/icons-material/Search";
import MenuIcon from "@mui/icons-material/Menu";
import type { ReactNode } from "react";

const navLinks: { label: string; href: string; icon?: ReactNode }[] = [
  { label: "Problems", href: "#" },
  { label: "Contests", href: "#" },
  { label: "Pricing", href: "#" },
  { label: "Resources", href: "#" },
  { label: "", href: "#", icon: <SearchIcon /> },
];

const authButtons: { label: string; href: string; className?: string }[] = [
  {
    label: "Log in",
    href: "/login",
    className:
      "text-subtext-light dark:text-subtext-dark hover:text-primary dark:hover:text-primary font-medium",
  },
  {
    label: "Sign up",
    href: "/signup",
    className:
      "bg-black text-white px-6 py-2 rounded-lg font-semibold hover:bg-gray-800 transition-colors",
  },
];

export const Navbar = () => {
  return (
    <header className="w-full">
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <CodeIcon className=" text-primary text-3xl" fontSize="large" />
          <h1 className="text-2xl font-bold text-text-light dark:text-text-dark">
            algora
          </h1>
        </Link>
        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link, idx) => (
            <Link
              key={idx}
              className="text-subtext-light dark:text-subtext-dark hover:text-primary dark:hover:text-primary"
              to={link.href}
            >
              {link.icon ? link.icon : link.label}
            </Link>
          ))}
        </div>
        {/* Desktop Auth Buttons */}
        <div className="hidden md:flex items-center space-x-4">
          {authButtons.map((btn, idx) => (
            <Link key={idx} to={btn.href} className={btn.className}>
              {btn.label}
            </Link>
          ))}
        </div>
        {/* Mobile Menu Button */}
        <button className="md:hidden text-subtext-light dark:text-subtext-dark">
          <MenuIcon />
        </button>
      </nav>
    </header>
  );
};
