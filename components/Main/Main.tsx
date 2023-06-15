import React from "react";
import styles from "./Main.module.css";
import Sidenav from "../Sidenav/Sidenav";
import PrimaryFeed from "../PrimaryFeed/PrimaryFeed";

const Main = () => {
  return (
    <main className={styles.container}>
      <div className={styles.row}>
        <div className={`text-center ${styles.primaryColumn}`}>
          <PrimaryFeed />
        </div>
        <div className={`${styles.secondaryColumn}`}>
          <Sidenav />
        </div>
      </div>
    </main>
  );
};

export default Main;
