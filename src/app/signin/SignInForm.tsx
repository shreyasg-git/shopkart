"use client";

import { useState } from "react";
import { Formik, Form } from "formik";
import InputField from "../components/InputField";
import * as Yup from "yup";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string().required("Password is required"),
});

export default function SignInForm() {
  const { mutate } = useMutation({
    mutationFn: async (data: any) => {
      const response = await axios.post("/api/signin", data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.data;
    },
    onSuccess: () => {
      console.log("WOOOOOOOOOOoo");
    },
    onError: () => {
      console.log("YEEEEEEEEe");
    },
  });

  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting }) => {
        // Handle form submission
        console.log(values);
        setSubmitting(false);

        mutate(values);
      }}
    >
      {({ isSubmitting }) => (
        <Form className="space-y-4">
          {/* <InputField name="fullName" label="Full Name" /> */}
          <InputField name="email" label="Email" type="email" />
          <InputField name="password" label="Password" type="password" />
          <button
            type="submit"
            disabled={isSubmitting}
            // onClick={}
            className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:bg-blue-300"
          >
            Submit
          </button>
        </Form>
      )}
    </Formik>
  );
}
