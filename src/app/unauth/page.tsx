// app/unauthorized/page.tsx
import Link from "next/link";
import NavBar from "../components/NavBar/NavBar";
import Page from "../components/Page";

export default function UnauthorizedPage() {
  return (
    <Page>
      <main className="container mx-auto px-4 py-4 text-center">
        <h1 className="text-2xl font-bold mb-4 text-red-500">Unauthorized</h1>
        <p className="mb-4">You don't have permission to access this page.</p>
        <Link href="/signin" className="text-blue-500 hover:underline">
          Sign In
        </Link>
        {" or "}
        <Link href="/" className="text-blue-500 hover:underline">
          Go to Home
        </Link>
      </main>
    </Page>
  );
}
