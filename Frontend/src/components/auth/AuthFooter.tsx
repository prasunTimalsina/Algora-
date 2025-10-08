/**
 * AuthFooter Component
 *
 * Footer section with link to sign up page
 * Maintains consistent styling for auth navigation
 */
export const AuthFooter = () => {
  return (
    <div className="mt-6 text-center text-sm">
      <p className="text-subtext-light dark:text-subtext-dark">
        Don't have an account?{" "}
        <a
          href="#"
          className="font-medium text-subtext-light dark:text-subtext-dark hover:text-primary/80 transition-colors"
        >
          Sign up
        </a>
      </p>
    </div>
  );
};
