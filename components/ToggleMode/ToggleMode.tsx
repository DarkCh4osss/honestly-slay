import React from "react";
import styles from "./ToggleMode.module.css";

const ToggleMode = () => {
  function setDarkMode() {
    document.querySelector("body")?.setAttribute("data-theme", "dark");
  }
  function setLightMode() {
    document.querySelector("body")?.setAttribute("data-theme", "light");
  }
  function toggleTheme(e: any) {
    if (e.target.checked) setDarkMode();
    else setLightMode();
  }

  return (
    <div className={styles.dark_mode}>
      <input
        className={styles.dark_mode_input}
        type="checkbox"
        id="darkmode-toggle"
        onChange={toggleTheme}
      />
      <label
        className={styles.dark_mode_label}
        htmlFor="darkmode-toggle"
      ></label>
    </div>
  );
};

export default ToggleMode;
