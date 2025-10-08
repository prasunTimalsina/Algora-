import { AuthFormContainer } from "../components/auth/AuthFormContainer";
import { LoginHeroSection } from "../components/auth/LoginHeroSection";

/**
 * LoginPage Component
 *
 * Main login page layout with two-column design:
 * - Left: Authentication form
 * - Right: Hero section with testimonials
 */
export const LoginPage = () => {
  return (
    <div className="flex min-h-screen bg-background-light dark:bg-background-dark">
      {/* Authentication Form Section */}
      <AuthFormContainer />

      {/* Hero Section */}
      <LoginHeroSection />
    </div>
  );
};
