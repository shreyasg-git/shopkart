"use client";
import axios from "axios";
import Link from "next/link";
import { useState } from "react";
import { Button, ButtonTypes } from "./Button";

type NavLinkProps = {
  href: string;
  text: string;
  mobile?: boolean;
};

const NavLink: React.FC<NavLinkProps> = ({ href, text, mobile = false }) => (
  <Link
    href={href}
    className={`${
      mobile ? "block" : ""
    } px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50`}
  >
    {text}
  </Link>
);

type ProfileDropdownProps = {
  isOpen: boolean;
  toggleDropdown: () => void;
};

const ProfileDropdown: React.FC<ProfileDropdownProps> = ({
  isOpen,
  toggleDropdown,
}) => (
  <div className="relative ml-3">
    <button
      onClick={toggleDropdown}
      className="flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
    >
      <span className="sr-only">Open user menu</span>
      <svg
        className="h-8 w-8 rounded-full text-gray-400"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    </button>
    {isOpen && (
      <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
        <div className="w-full  flex">
          <Button
            flat
            type={ButtonTypes.SECONDARY}
            // className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            title="Logout"
            onClick={async () => {
              await axios.post("/api/signout", {
                headers: {
                  "Content-Type": "application/json",
                },
              });
            }}
          />
        </div>
      </div>
    )}
  </div>
);
type MobileMenuButtonProps = {
  isOpen: boolean;
  toggleMenu: () => void;
};

const MobileMenuButton: React.FC<MobileMenuButtonProps> = ({
  isOpen,
  toggleMenu,
}) => (
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

type MobileMenuProps = {
  isOpen: boolean;
  isAuthed: boolean;
};

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, isAuthed }) => (
  <div className={`${isOpen ? "block" : "hidden"} sm:hidden`}>
    <div className="px-2 pt-2 pb-3 space-y-1">
      <NavLink href="/products" text="Products" mobile />
      <NavLink href="/cart" text="Cart" mobile />
      {isAuthed ? (
        <NavLink href="/logout" text="Logout" mobile />
      ) : (
        <>
          <NavLink href="/login" text="Login" mobile />
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

type DesktopMenuProps = {
  isAuthed: boolean;
};

const DesktopMenu: React.FC<DesktopMenuProps> = ({ isAuthed }) => {
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

  const toggleProfileDropdown = () =>
    setIsProfileDropdownOpen(!isProfileDropdownOpen);

  return (
    <div className="hidden sm:ml-6 sm:flex sm:items-center">
      <NavLink href="/products" text="Products" />
      <NavLink href="/cart" text="Cart" />
      {isAuthed ? (
        <ProfileDropdown
          isOpen={isProfileDropdownOpen}
          toggleDropdown={toggleProfileDropdown}
        />
      ) : (
        <>
          <NavLink href="/signin" text="Login" />
          <Link
            href="/signup"
            className="ml-2 px-3 py-2 rounded-md text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
          >
            Sign Up
          </Link>
        </>
      )}
    </div>
  );
};

const Logo = () => (
  <div className="flex items-center">
    <Link href="/" className="flex-shrink-0 flex items-center">
      <span className="text-2xl font-bold text-blue-600">ShopKart</span>
    </Link>
  </div>
);

type NavBarProps = {
  isAuthed?: boolean;
};

const NavBar: React.FC<NavBarProps> = ({ isAuthed = false }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="bg-white shadow-sm sticky top-0 right-0 left-0">
      <div className="mx-16">
        <div className="flex justify-between h-16">
          <Logo />
          <DesktopMenu isAuthed={isAuthed} />
          <MobileMenuButton isOpen={isOpen} toggleMenu={toggleMenu} />
        </div>
      </div>
      <MobileMenu isOpen={isOpen} isAuthed={isAuthed} />
    </nav>
  );
};

export default NavBar;
