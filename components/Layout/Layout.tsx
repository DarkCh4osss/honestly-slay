import { useSupabaseClient } from "@supabase/auth-helpers-react";
import React, { ReactNode } from "react";
import Navbar from "../Navbar/Navbar";

interface Props {
  children: ReactNode | ReactNode[];
}

const Layout: React.FC<Props> = ({ children }) => {
  return (
    <div className="flex h-full mt-4 max-w-4xl mx-auto mb-24 scroll-smooth">
      <div className="flex-auto w-1/4 justify-items-center">
        <Navbar />
      </div>
      <div className="flex-auto w-9/12 justify-items-center">{children}</div>
    </div>
  );
};

export default Layout;
