"use client";
import React, { useState } from "react";
import FormInput from "../FormInput";
import Button from "../Button";
import { AtSign, Lock, Eye, EyeOff } from "lucide-react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email is invalid";
    }

    if (!password) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        console.log("Login form submitted", { email, password, rememberMe });
        const response = await axios.post(
          "http://localhost:8080/api/login",
          {
            email: email,
            password: password,
          },
          { withCredentials: true }
        );
        console.log("response : ", response);
        toast.success(response.data.message || " user login sucessfully");
        setEmail("");
        setPassword("");
      } catch (error) {
        console.error("Signup failed:", error);
        toast.error(
          error.response?.data?.message ||
            "An unexpected error occurred. Please try again."
        );
      }
    } else {
      toast.error("Please fix the form errors.");
    }
  };

  return (
    <div>
      <Toaster position="top-right" />
      <form onSubmit={handleSubmit} className="space-y-6">
        <FormInput
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={errors.email}
          icon={<AtSign className="h-5 w-5 text-gray-400" />}
          placeholder="your.email@example.com"
        />

        <FormInput
          label="Password"
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={errors.password}
          icon={<Lock className="h-5 w-5 text-gray-400" />}
          placeholder="••••••••"
          endIcon={
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="text-gray-400 hover:text-gray-600 focus:outline-none"
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </button>
          }
        />

        <div className="flex items-center justify-between">
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={() => setRememberMe(!rememberMe)}
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded transition-colors"
            />
            <span className="text-sm text-gray-600">Remember me</span>
          </label>

          <button
            type="button"
            className="text-sm text-indigo-600 hover:text-indigo-800 font-medium transition-colors"
          >
            Forgot password?
          </button>
        </div>

        <Button type="submit" fullWidth>
          Sign in
        </Button>
      </form>
    </div>
  );
};

export default LoginForm;
