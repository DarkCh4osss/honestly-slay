import React from "react";
import styles from "./Main.module.css";
import Sidenav from "../Sidenav/Sidenav";
import PrimaryFeed from "../PrimaryFeed/PrimaryFeed";

interface Props {
  title: string;
}

const Main: React.FC<Props> = ({ title }) => {
  return (
    <main className={styles.container}>
      <div className={styles.row}>
        <div className={`text-center ${styles.primaryColumn}`}>
          <PrimaryFeed title={title} />
        </div>
        <div className={`${styles.secondaryColumn}`}>
          <Sidenav />
        </div>
      </div>
    </main>
  );
};

export default Main;
