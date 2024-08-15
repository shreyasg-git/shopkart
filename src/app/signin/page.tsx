import Spinner from "../components/Spinner";
import SignInForm from "./SignInForm";
export default function SignIn() {
  return (
    <div className="container mx-auto mt-10  flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-5">Sign In</h1>
      {/* <Spinner size="sm" /> */}

      <SignInForm />
    </div>
  );
}
