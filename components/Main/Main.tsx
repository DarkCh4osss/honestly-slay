import React from "react";
import styles from "./Main.module.css";

const Main = () => {
  return (
    <main className={styles.container}>
      <div className={styles.row}>
        <div className={`col-2 text-center ${styles.primaryColumn}`}>
          <h1>A</h1>
        </div>
        <div className="col-2 text-right">right nav</div>
      </div>
    </main>
  );
};

export default Main;
