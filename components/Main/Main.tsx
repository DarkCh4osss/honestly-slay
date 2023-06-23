import React from "react";
import styles from "./Main.module.css";
import Sidenav from "../Sidenav/Sidenav";

interface Props {
  title: string;
  primaryCol: any;
}

const Main: React.FC<Props> = ({ title, primaryCol }) => {
  return (
    <main className={styles.container}>
      <div className={styles.row}>
        <div className={`text-center ${styles.primaryColumn}`}>
          {primaryCol}
        </div>
        <div className={`${styles.secondaryColumn}`}>
          <Sidenav />
        </div>
      </div>
    </main>
  );
};

export default Main;
