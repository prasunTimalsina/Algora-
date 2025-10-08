import React, { useState } from "react";
import { FormField } from "./FormField";
import { SubmitButton } from "./SubmitButton";

interface SignupFormData {
  username: string;
  email: string;
  password: string;
}

export const SignupForm: React.FC = () => {
  const [formData, setFormData] = useState<SignupFormData>({
    username: "",
    email: "",
    password: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Signup attempt:", formData);
    // Handle signup logic here
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <FormField
        id="username"
        name="username"
        type="text"
        label="Username"
        placeholder="Enter your username"
        value={formData.username}
        onChange={handleInputChange}
        autoComplete="username"
        required
      />

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

      <FormField
        id="password"
        name="password"
        type="password"
        label="Password"
        placeholder="••••••••"
        value={formData.password}
        onChange={handleInputChange}
        autoComplete="new-password"
        required
      />

      <SubmitButton>Sign up</SubmitButton>
    </form>
  );
};
