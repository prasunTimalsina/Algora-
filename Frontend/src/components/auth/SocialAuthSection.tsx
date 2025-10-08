import { SocialButton } from "./SocialButton";

/**
 * SocialAuthSection Component
 *
 * Contains the divider and social authentication options
 * Handles GitHub and Google login buttons
 */
export const SocialAuthSection = () => {
  return (
    <div className="mt-6">
      {/* Divider */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border-light dark:border-border-dark" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="bg-background-light dark:bg-background-dark px-2 text-subtext-light dark:text-subtext-dark">
            Or continue with
          </span>
        </div>
      </div>

      {/* Social Buttons */}
      <div className="mt-6 grid grid-cols-2 gap-3">
        <SocialButton
          provider="GitHub"
          iconSrc="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"
          variant="secondary"
        />
        <SocialButton
          provider="Google"
          iconSrc="https://developers.google.com/identity/images/g-logo.png"
          variant="primary"
        />
      </div>
    </div>
  );
};
