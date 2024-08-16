import Link from "next/link";
import { useState } from "react";
import { NavLink } from "./NavLink";
import { ProfileDropdown } from "./ProfileDropdown";

type DesktopMenuProps = {
  isAuthed: boolean;
};

export const DesktopMenu: React.FC<DesktopMenuProps> = ({ isAuthed }) => {
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
