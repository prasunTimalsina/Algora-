interface FormFieldProps {
  id: string;
  name: string;
  type: string;
  label: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  autoComplete?: string;
  required?: boolean;
}

/**
 * FormField Component
 *
 * Reusable form field with label, input, and consistent styling
 * Handles both light and dark mode theming
 */
export const FormField = ({
  id,
  name,
  type,
  label,
  placeholder,
  value,
  onChange,
  autoComplete,
  required = false,
}: FormFieldProps) => {
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-sm font-medium text-text-light dark:text-text-dark"
      >
        {label}
      </label>
      <div className="mt-1">
        <input
          id={id}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          autoComplete={autoComplete}
          required={required}
          placeholder={placeholder}
          className="block w-full appearance-none rounded-md border border-border-light dark:border-border-dark px-3 py-2 placeholder-subtext-light dark:placeholder-subtext-dark shadow-sm focus:border-primary focus:outline-none focus:ring-primary sm:text-sm bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark transition-colors"
        />
      </div>
    </div>
  );
};
