interface SubmitButtonProps {
  children: React.ReactNode;
  isLoading?: boolean;
  disabled?: boolean;
}

/**
 * SubmitButton Component
 *
 * Styled submit button with loading and disabled states
 * Maintains consistent styling across forms
 */
export const SubmitButton = ({
  children,
  isLoading = false,
  disabled = false,
}: SubmitButtonProps) => {
  return (
    <div>
      <button
        type="submit"
        disabled={disabled || isLoading}
        className="flex w-full justify-center rounded-md border border-transparent bg-primary py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed transition-all"
      >
        {isLoading ? "Loading..." : children}
      </button>
    </div>
  );
};
