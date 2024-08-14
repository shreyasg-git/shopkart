"use client";

import { useState } from "react";
import { Formik, Form } from "formik";
import InputField from "../components/InputField";
import * as Yup from "yup";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const validationSchema = Yup.object({
  fullName: Yup.string().required("Please Enter Your Full Name"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string().required("Password is required"),
});

import React from "react";
import Link from "next/link";
import { PRODUCTS } from "../consts/data";

type ProceedToLoginProps = {};

const ProceedToLogin: React.FC<ProceedToLoginProps> = ({}) => {
  return (
    <div>
      Seems like you already have an account. Please proceed to
      <Link href="/signin"> Login</Link>.
    </div>
  );
};

const TopLevelErrors = {
  ACC_ALREADY_EXISTS: <ProceedToLogin />,
};

export default function SignUpForm() {
  const [topLevelError, setTopLevelError] = useState<
    keyof typeof TopLevelErrors | null
  >(null);
  const { mutate } = useMutation({
    mutationFn: async (data: any) => {
      const response = await axios.post("/api/signup", data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.data;
    },
    onError: (e) => {
      console.log(e?.response?.status === 409);
      if (e?.response?.status === 409) {
        setTopLevelError("ACC_ALREADY_EXISTS");
      }
    },
    onSuccess: () => {
      console.log("yo success success");
    },
  });

  return (
    <>
      <button
        onClick={() => {
          console.log("AAAAAAa");

          PRODUCTS.map(async (product: Product) => {
            await axios.post(
              "/api/addproduct",
              { product },
              {
                headers: {
                  "Content-Type": "application/json",
                },
              }
            );
          });
        }}
      >
        SEND IT
      </button>
      <Formik
        initialValues={{ fullName: "", email: "", password: "" }}
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
            <InputField name="fullName" label="Full Name" />
            <InputField name="email" label="Email" type="email" />
            <InputField name="password" label="Password" type="password" />
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:bg-blue-300"
            >
              Submit
            </button>
            <>{topLevelError ? TopLevelErrors[`${topLevelError}`] : null}</>
          </Form>
        )}
      </Formik>
    </>
  );
}
