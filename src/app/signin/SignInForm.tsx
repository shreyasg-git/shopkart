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

const TOP_LEVEL_MSGS = {
  WRONG_EMAIL_PASS: "Wrong Email Or Password",
  WENT_WRONG: "Something Went Wrong",
};

export default function SignInForm() {
  const nav = useRouter();
  const [topLevelMessage, settopLevelMessage] = useState<
    keyof typeof TOP_LEVEL_MSGS | null
  >(null);

  const { mutate, isPending } = useMutation({
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
      nav.refresh();
    },
    onError: (error) => {
      if (error.response.status === 401) {
        settopLevelMessage("WRONG_EMAIL_PASS");
      } else {
        settopLevelMessage("WENT_WRONG");
      }
    },
  });

  return (
    <div>
      <div className="w-96 p-6">
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
              {topLevelMessage ? (
                <div className="text-red-500 text-md mt-1 w-full  text-center">
                  {TOP_LEVEL_MSGS[topLevelMessage]}
                </div>
              ) : null}
              <div className="w-full flex justify-center ">
                <Button
                  flat
                  // disabled={isSubmitting || isPending}
                  // loading={isSubmitting || isPending}
                  disabled={isSubmitting || isPending}
                  loading={isSubmitting || isPending}
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
