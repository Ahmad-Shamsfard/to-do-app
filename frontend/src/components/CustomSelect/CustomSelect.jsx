import React from "react";
import Select, { components } from "react-select";
import styles from "./CustomSelect.module.scss";

const CustomSelect = (props) => {
  const customStyles = {
    control: (baseStyles) => ({
      ...baseStyles,
      width: props.name === "theme" ? "86px" : "fit-content",
      padding: "4px",
      cursor: "pointer",
      boxShadow: "none",
      border: "0",
      backgroundColor: "var(--light_primary_color)",
    }),
    menu: (baseStyles) => ({
      ...baseStyles,
      cursor: "pointer",
      color: "#222222",
      backgroundColor: "var(--light_primary_color)",
      marginTop: "4px",
    }),
    valueContainer: (baseStyles) => ({
      ...baseStyles,
      padding: "4px 2px 0",
    }),
    indicatorsContainer: () => ({
      display: "none",
    }),
    singleValue: (baseStyles) => ({
      ...baseStyles,
      color: "var(--tertiary_color)",
      justifySelf: "center",
    }),
    option: (baseStyles, state) => ({
      ...baseStyles,
      cursor: "pointer",
      color: state.isSelected
        ? "var(--primary_color)"
        : "var(--tertiary_color) ",
      backgroundColor: state.isSelected
        ? "var(--secondary_color)"
        : "transparent",
      padding: "8px",
    }),
  };

  return (
    <form className={styles.CustomSelect}>
      <Select
        {...props}
        isSearchable={false}
        value={props.options.filter(
          (option) => option.value === localStorage.getItem(props.name)
        )}
        styles={customStyles}
        menuPlacement="top"
        components={{
          Menu: (props) => (
            <components.Menu {...props} className={styles.menu} />
          ),
        }}
      />
    </form>
  );
};

export default CustomSelect;
