"use client";

import { useState } from "react";
import { Formik, Form } from "formik";
import InputField from "../components/InputField";
import * as Yup from "yup";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { Button } from "../components/Button";
import { useRouter } from "next/navigation";

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string().required("Password is required"),
});

export default function SignInForm() {
  const nav = useRouter();
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
      nav.push("/products");
    },
    onError: () => {
      console.log("YEEEEEEEEe");
    },
  });

  return (
    <div>
      <div className="w-96">
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
          {({ isSubmitting, handleSubmit }) => (
            <Form className="space-y-4">
              <InputField name="email" label="Email" type="email" />
              <InputField name="password" label="Password" type="password" />
              <div className="w-full flex justify-center ">
                <Button
                  flat
                  disabled={isSubmitting}
                  loading={isSubmitting}
                  title={"Submit"}
                  onClick={() => {
                    handleSubmit();
                  }}
                />
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
