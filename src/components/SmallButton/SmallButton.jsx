import React from "react";
import styles from "./SmallButton.module.scss";

const SmallButton = ({ children, handleClick }) => {
  return (
      <div className={styles.smallButton} onClick={handleClick}>
        <button>
          {children}
        </button>
      </div>
  );
};

export default SmallButton;
