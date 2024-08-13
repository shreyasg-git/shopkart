"use client";

import { useState } from "react";
import CustomInput from "@/app/components/Input";

export default function ClientForm() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
  });

  const handleInputChange = (field: string) => (value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/submit-form", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const result = await response.json();
        console.log(result.message);
        // Handle successful submission (e.g., show success message, reset form)
      } else {
        // Handle errors
        console.error("Form submission failed");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <CustomInput
        label="Username"
        name="username"
        value={formData.username}
        onChange={handleInputChange("username")}
      />
      <CustomInput
        label="Email"
        type="email"
        name="email"
        value={formData.email}
        onChange={handleInputChange("email")}
      />
      <button
        type="submit"
        className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
      >
        Submit
      </button>
    </form>
  );
}
