"use client";

import { useState } from "react";
import { Formik, Form } from "formik";
import InputField from "../components/InputField";
import * as Yup from "yup";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

import React from "react";
import Link from "next/link";
import { PRODUCTS } from "../consts/data";
import { Button } from "../components/Button";
import { signUpvalidationSchema } from "../schemas";

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
    <div>
      <div className="w-96">
        <Formik
          initialValues={{ fullName: "", email: "", password: "" }}
          validationSchema={signUpvalidationSchema}
          onSubmit={(values, { setSubmitting }) => {
            // Handle form submission
            console.log(values);
            setSubmitting(false);

            mutate(values);
          }}
        >
          {({ isSubmitting, handleSubmit }) => (
            <Form className="space-y-4">
              <InputField name="fullName" label="Full Name" />
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
              <>{topLevelError ? TopLevelErrors[`${topLevelError}`] : null}</>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
