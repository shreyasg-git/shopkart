import Link from "next/link";
import { NavLink } from "./NavLink";
import { Button, ButtonTypes } from "../Button";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export const useLogout = () => {
  const navrouter = useRouter();
  const logOutMutation = useMutation({
    mutationFn: async () => {
      await axios.post("/api/signout", {
        headers: {
          "Content-Type": "application/json",
        },
      });
    },
    onSuccess: () => {
      navrouter.replace("/signin");
    },
  });

  return { logOutMutation };
};

type MobileMenuProps = {
  isOpen: boolean;
  isAuthed: boolean;
};

type MobileMenuButtonProps = {
  isOpen: boolean;
  toggleMenu: () => void;
};

export const MobileMenuButton: React.FC<MobileMenuButtonProps> = ({
  isOpen,
  toggleMenu,
}) => {
  return (
    <div className="sm:hidden flex items-center">
      <button
        onClick={toggleMenu}
        className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
        aria-expanded="false"
      >
        <span className="sr-only">Open main menu</span>
        <svg
          className={`${isOpen ? "hidden" : "block"} h-6 w-6`}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
        <svg
          className={`${isOpen ? "block" : "hidden"} h-6 w-6`}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>
  );
};

export const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, isAuthed }) => {
  const logout = useLogout();

  return (
    <div className={`${isOpen ? "block" : "hidden"} sm:hidden`}>
      <div className="px-2 pt-2 pb-3 space-y-1">
        <NavLink href="/products" text="Products" mobile />
        <NavLink href="/cart" text="Cart" mobile />
        {isAuthed ? (
          <div className="flex">
            <Button
              // flat
              type={ButtonTypes.SECONDARY}
              // className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              title="Logout"
              onClick={() => logout.logOutMutation.mutate()}
            />
          </div>
        ) : (
          <>
            <NavLink href="/signin" text="Login" mobile />
            <Link
              href="/signup"
              className="block px-3 py-2 rounded-md text-base font-medium text-white bg-blue-600 hover:bg-blue-700"
            >
              Sign Up
            </Link>
          </>
        )}
      </div>
    </div>
  );
};
