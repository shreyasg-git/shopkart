import * as Yup from "yup";

export const signUpvalidationSchema = Yup.object({
  fullName: Yup.string().required("Please Enter Your Full Name"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string().required("Password is required"),
});
