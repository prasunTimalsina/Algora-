import CodeIcon from "@mui/icons-material/Code";
import { Link } from "react-router-dom";

/**
 * SignupHeader Component
 *
 * Displays the application logo and signup title
 * Maintains consistent branding across auth pages
 */
export const SignupHeader = () => {
  return (
    <div>
      {/* Logo and App Name */}
      <div className="flex items-center text-text-light dark:text-text-dark mb-2">
        <CodeIcon className="text-2xl mr-2" />
        <Link to="/" className="text-2xl font-bold font-display">
          algora
        </Link>
      </div>

      {/* Subtitle */}
      <p className="text-sm text-subtext-light dark:text-subtext-dark">
        Create your account
      </p>
    </div>
  );
};
