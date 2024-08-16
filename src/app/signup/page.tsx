import NavBar from "../components/NavBar/NavBar";
import Page from "../components/Page";
import { checkAuth } from "../utils/utils";
import SignInForm from "./SignUpForm";
export default function SignUp() {
  return (
    <Page>
      <div className="container mx-auto mt-10  flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold mb-5">Sign Up</h1>
        <SignInForm />
      </div>
    </Page>
  );
}
