"use client";
import { useEffect, useState } from "react";
import { Button, ButtonTypes } from "../Button";
import { MobileMenu, MobileMenuButton } from "./MobileMenu";
import { Logo } from "./Logo";
import { DesktopMenu } from "./DesktopMenu";
import { useRouter } from "next/navigation";

type NavBarProps = {
  isAuthed?: boolean;
};

const NavBar: React.FC<NavBarProps> = ({ isAuthed = false }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="bg-white shadow-sm sticky top-0 right-0 left-0 z-50">
      <div className="mx-4">
        <div className="flex sm:justify-between h-16 justify-between ">
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
