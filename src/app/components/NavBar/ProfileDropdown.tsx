import axios from "axios";
import { Button, ButtonTypes } from "../Button";
import { useLogout } from "./MobileMenu";

type ProfileDropdownProps = {
  isOpen: boolean;
  toggleDropdown: () => void;
};

export const ProfileDropdown: React.FC<ProfileDropdownProps> = ({
  isOpen,
  toggleDropdown,
}) => {
  const logout = useLogout();

  return (
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
              loading={logout.logOutMutation.isPending}
              disabled={logout.logOutMutation.isPending}
              type={ButtonTypes.SECONDARY}
              // className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              title="Logout"
              onClick={() => logout.logOutMutation.mutate()}
            />
          </div>
        </div>
      )}
    </div>
  );
};
