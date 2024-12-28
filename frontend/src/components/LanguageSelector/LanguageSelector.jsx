import React from "react";
import Farsi from "../../assets/icons/iran.png";
import English from "../../assets/icons/united-kingdom.png";
import i18n from "../../i18n";
import CustomSelect from "../CustomSelect/CustomSelect";
import styles from "../CustomSelect/CustomSelect.module.scss";

const LanguageSelector = ({ setLocale }) => {
  const handleLanguageChange = (selected) => {
    setLocale(selected.value);
    i18n.changeLanguage(selected.value);
    localStorage.setItem("locale", selected.value);
  };
  const options = [
    {
      value: "en",
      label: (
        <div className={styles.options}>
          <img src={English} height="15px" width="15px" alt="en" />
          En
        </div>
      ),
    },
    {
      value: "fa",
      label: (
        <div className={styles.options}>
          <img src={Farsi} height="15px" width="15px" alt="fa" />
          Fa
        </div>
      ),
    },
  ];

  return (
    <CustomSelect
      onChange={handleLanguageChange}
      options={options}
      name="locale"
    />
  );
};

export default LanguageSelector;
