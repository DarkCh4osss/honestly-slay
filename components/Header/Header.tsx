import React from "react";
import styles from "./Header.module.css";

interface Props {
  title: string;
}

const Header: React.FC<Props> = ({ title }) => {
  return (
    <header className={styles.headerSect}>
      <h3>{title}</h3>
    </header>
  );
};

export default Header;
