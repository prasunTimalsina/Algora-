import { LoginHeader } from "./LoginHeader";
import { LoginForm } from "./LoginForm";
import { SocialAuthSection } from "./SocialAuthSection";
import { AuthFooter } from "./AuthFooter";

/**
 * AuthFormContainer Component
 *
 * Container for the authentication form section
 * Handles the layout and spacing for all auth-related components
 */
export const AuthFormContainer = () => {
  return (
    <div className="flex flex-1 flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
      <div className="mx-auto w-full max-w-sm lg:w-96">
        {/* Header with logo and title */}
        <LoginHeader />

        {/* Main content area */}
        <div className="mt-8">
          {/* Login form */}
          <LoginForm />

          {/* Social authentication options */}
          <SocialAuthSection />

          {/* Footer with signup link */}
          <AuthFooter />
        </div>
      </div>
    </div>
  );
};
