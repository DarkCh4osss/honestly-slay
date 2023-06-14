import { useSupabaseClient } from "@supabase/auth-helpers-react";
import React, { ReactNode } from "react";
import Navbar from "../Navbar/Navbar";
import Main from "../Main/Main";
import styles from "./Layout.module.css";

const Layout = () => {
  return (
    <div className={styles.container}>
      <div className={styles.row}>
        <div className={`text-left ${styles.nav}`}>
          <Navbar />
        </div>
        <div className={`${styles.main} text-center`}>
          <Main />
        </div>
      </div>
    </div>
  );
};

export default Layout;
