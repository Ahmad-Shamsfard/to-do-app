import React from "react";
import styles from "./SmallButton.module.scss";

const SmallButton = ({ children, handleClick, customClass }) => {
  return (
    <div
      className={styles.smallButton + " " + customClass}
      onClick={handleClick}
    >
      <button>{children}</button>
    </div>
  );
};

export default SmallButton;
