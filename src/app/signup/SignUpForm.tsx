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
import { redirect, useRouter } from "next/navigation";
import { Product } from "../types";

type ProceedToLoginProps = {};

const ProceedToLogin: React.FC<ProceedToLoginProps> = ({}) => {
  return (
    <div>
      Seems like you already have an account. Please proceed to
      <Link href="/signin" className="hover:text-blue-500 text-blue-300">
        Login
      </Link>
      .
    </div>
  );
};

const TopLevelErrors = {
  ACC_ALREADY_EXISTS: <ProceedToLogin />,
};

export default function SignUpForm() {
  const navRouter = useRouter();
  const [topLevelError, setTopLevelError] = useState<
    keyof typeof TopLevelErrors | null
  >(null);
  const { mutate, isPending } = useMutation({
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
      console.log("SIGN UP SUCCESS :: nav to /signin");
      navRouter.push("/signin");
    },
  });

  return (
    <div>
      {/* <button
        onClick={() => {
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
      </button>{" "} */}
      <div className="w-96 p-10">
        <Formik
          initialValues={{
            fullName: "",
            email: "",
            password: "",
            confirmPassword: "",
          }}
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
              <InputField
                name="confirmPassword"
                label="Confirm Password"
                type="password"
              />
              <div className="w-full flex justify-center ">
                <Button
                  flat
                  disabled={isSubmitting || isPending}
                  loading={isSubmitting || isPending}
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
