import { useState } from "react";
import { FormField } from "./FormField";
import { CheckboxField } from "./CheckboxField";
import { SubmitButton } from "./SubmitButton";

/**
 * LoginForm Component
 *
 * Main login form with email, password, and remember me functionality
 * Handles form state and validation
 */
export const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Login attempt:", formData);
    // TODO: Implement actual login logic
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Email Field */}
      <FormField
        id="email"
        name="email"
        type="email"
        label="Email address"
        placeholder="you@example.com"
        value={formData.email}
        onChange={handleInputChange}
        autoComplete="email"
        required
      />

      {/* Password Field */}
      <FormField
        id="password"
        name="password"
        type="password"
        label="Password"
        placeholder="••••••••"
        value={formData.password}
        onChange={handleInputChange}
        autoComplete="current-password"
        required
      />

      {/* Remember Me and Forgot Password */}
      <div className="flex items-center justify-between">
        <CheckboxField
          id="remember-me"
          name="rememberMe"
          label="Remember me"
          checked={formData.rememberMe}
          onChange={handleInputChange}
        />

        <div className="text-sm">
          <a
            href="#"
            className="font-medium text-subtext-light dark:text-subtext-dark hover:text-primary/80 transition-colors "
          >
            Forgot password?
          </a>
        </div>
      </div>

      {/* Submit Button */}
      <SubmitButton>Login</SubmitButton>
    </form>
  );
};
