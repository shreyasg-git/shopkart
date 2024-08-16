import React from "react";
import NavBar from "./NavBar/NavBar";
import { checkAuth } from "../utils/utils";

type PageProps = {
  children: any;
};

const Page: React.FC<PageProps> = ({ children }) => {
  const isAuthed = checkAuth();
  return (
    <div>
      <NavBar isAuthed={isAuthed} />
      {children}
    </div>
  );
};

export default Page;
