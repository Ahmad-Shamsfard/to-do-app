import React from "react";
import styles from "./Tooltip.module.scss";

const Tooltip = ({ text, place }) => {
  return (
    <div
      className={
        styles.tooltipContainer
        
      }
    >
      <div className={styles.tooltip + " " +
        (place ? (place==="left" ? styles.left : styles.right) : styles.default)}>
        <p>{text}</p>
      </div>
    </div>
  );
};

export default Tooltip;
