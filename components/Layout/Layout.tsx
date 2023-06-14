import { useSupabaseClient } from "@supabase/auth-helpers-react";
import React, { ReactNode } from "react";
import Navbar from "../Navbar/Navbar";

interface Props {
  children: ReactNode | ReactNode[];
}

const Layout: React.FC<Props> = ({ children }) => {
  return (
    <div className="md:flex mt-4 max-w-4xl mx-auto gap-6 mb-24 scroll-smooth">
      <div className="fixed md:static w-full bottom-0 md:w-3/12 -mb-5">
        <Navbar />
      </div>
      <div className="mx-4 md:mx-0 md:w-9/12">{children}</div>
    </div>
  );
};

export default Layout;
