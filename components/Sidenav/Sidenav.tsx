import styles from "./Sidenav.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

const Sidenav = () => {
  const [focus, setFocus] = useState(false);

  return (
    <div className={styles.sidenav}>
      <div
        className={`${styles.searchBar} ${focus ? styles.searchActive : ""}`}
      >
        <FontAwesomeIcon
          className={focus ? styles.iconActive : ""}
          icon={faMagnifyingGlass}
        />
        <input
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          type="text"
          placeholder="Search"
          className={focus ? styles.inpActive : ""}
        />
      </div>
    </div>
  );
};

export default Sidenav;
