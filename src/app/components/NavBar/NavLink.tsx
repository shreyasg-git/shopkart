import Link from "next/link";

type NavLinkProps = {
  href: string;
  text: string;
  mobile?: boolean;
};

export const NavLink: React.FC<NavLinkProps> = ({
  href,
  text,
  mobile = false,
}) => (
  <Link
    href={href}
    className={`${
      mobile ? "block" : ""
    } px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50`}
  >
    {text}
  </Link>
);
