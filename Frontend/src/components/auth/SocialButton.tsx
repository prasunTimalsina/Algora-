interface SocialButtonProps {
  provider: string;
  iconSrc: string;
  variant: "primary" | "secondary";
  onClick?: () => void;
}

/**
 * SocialButton Component
 *
 * Reusable button for social authentication providers
 * Supports different variants for styling consistency
 */
export const SocialButton = ({
  provider,
  iconSrc,
  variant,
  onClick,
}: SocialButtonProps) => {
  const baseClasses =
    "inline-flex w-full justify-center rounded-md py-2 px-4 text-sm font-medium shadow-sm transition-all";

  const variantClasses = {
    secondary:
      "border border-border-light dark:border-border-dark bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark hover:bg-border-light dark:hover:bg-border-dark",
    primary:
      "border border-transparent bg-primary text-white hover:bg-primary/90",
  };

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      console.log(`Login with ${provider}`);
      // TODO: Implement actual social auth
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`${baseClasses} ${variantClasses[variant]}`}
    >
      <img alt={`${provider} logo`} className="h-5 w-5" src={iconSrc} />
      <span className="ml-2">{provider}</span>
    </button>
  );
};
