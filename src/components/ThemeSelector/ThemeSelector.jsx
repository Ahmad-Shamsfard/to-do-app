import React from "react";
import styles from "../CustomSelect/CustomSelect.module.scss";
import CustomSelect from "../CustomSelect/CustomSelect";
import { useTranslation } from "react-i18next";

const ThemeSelector = ({ setTheme }) => {
  const [t] = useTranslation();
  const options = [
    {
      value: "default",
      label: (
        <div className={styles.options}>
          <span className={styles.themePreview + " " + styles.default}></span>
          {t("default")}
        </div>
      ),
    },
    {
      value: "dark",
      label: (
        <div className={styles.options}>
          <span className={styles.themePreview + " " + styles.dark}></span>
          {t("dark")}
        </div>
      ),
    },
    {
      value: "light",
      label: (
        <div className={styles.options}>
          <span className={styles.themePreview + " " + styles.light}></span>
          {t("light")}
        </div>
      ),
    },
  ];

  const handleThemeChange = (selected) => {
    setTheme(selected.value);
    localStorage.setItem("theme", selected.value);
  };

  return (
    <CustomSelect onChange={handleThemeChange} options={options} name="theme" />
  );
};

export default ThemeSelector;
