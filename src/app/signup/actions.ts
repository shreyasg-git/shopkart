"use server";

import { redirect } from "next/navigation";

import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

// MongoDB connection
const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable");
}

mongoose.connect(MONGODB_URI);

// User model
const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
});

const User = mongoose.models.User || mongoose.model("User", UserSchema);

// JWT secret
const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
  throw new Error("Please define the JWT_SECRET environment variable");
}

export async function submitSignUp(formData: FormData) {
  const name = formData.get("name");
  const email = formData.get("email");
  const password = formData.get("password");

  // Here you would typically:
  // 1. Validate the input
  // 2. Check if the user already exists
  // 3. Hash the password
  // 4. Save the user to your database

  // For this example, we'll just log the data and redirect
  console.log("Registering user:", { name, email });

  // Redirect to login page after successful signup
  redirect("/login");
}
