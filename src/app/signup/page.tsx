import SignUpForm from "./SignUpForm";
import Input from "@/app/components/Input";
export default function SignUp() {
  return (
    <div className="container mx-auto mt-10 bg-yellow-50">
      <h1 className="text-3xl font-bold mb-5">Sign Up</h1>
      <SignUpForm />
    </div>
  );
}
