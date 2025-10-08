interface CheckboxFieldProps {
  id: string;
  name: string;
  label: string;
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

/**
 * CheckboxField Component
 *
 * Reusable checkbox field with label and consistent styling
 * Used for "Remember me" and similar boolean options
 */
export const CheckboxField = ({
  id,
  name,
  label,
  checked,
  onChange,
}: CheckboxFieldProps) => {
  return (
    <div className="flex items-center">
      <input
        id={id}
        name={name}
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="h-4 w-4 rounded border-border-light dark:border-border-dark text-primary focus:ring-primary bg-background-light dark:bg-background-dark"
      />
      <label
        htmlFor={id}
        className="ml-2 block text-sm text-text-light dark:text-text-dark"
      >
        {label}
      </label>
    </div>
  );
};
