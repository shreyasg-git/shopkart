import { Button, ButtonTypes } from "../Button";
import { useLogout } from "@/app/utils/useLogout";
import ProfileSVG from "../ProfileSVG";

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
      <Button
        onClick={toggleDropdown}
        className="flex text-sm rounded-full  "
        title={""}
      >
        <span className="sr-only">Open user menu</span>
        <ProfileSVG />
      </Button>
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
