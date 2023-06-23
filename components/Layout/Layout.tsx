import { useSupabaseClient } from "@supabase/auth-helpers-react";
import React, { ReactNode } from "react";
import Navbar from "../Navbar/Navbar";
import styles from "./Layout.module.css";

interface Props {
  main: any;
}

const Layout: React.FC<Props> = ({ main }) => {
  return (
    <div className={styles.container}>
      <div className={styles.row}>
        <div className={`text-left ${styles.nav}`}>
          <Navbar />
        </div>
        <div className={`${styles.main} text-center`}>{main}</div>
      </div>
    </div>
  );
};

export default Layout;
