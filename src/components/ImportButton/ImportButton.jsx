import React from "react";
import { faFileImport } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SmallButton from "../SmallButton/SmallButton";
import Tooltip from "../Tooltip/Tooltip";
import { useTranslation } from "react-i18next";

const ImportButton = ({ handleChange, importFileRef }) => {
  const {t}=useTranslation();
  
  return (
    <SmallButton title="import">
      <label htmlFor="file-input">
        <FontAwesomeIcon icon={faFileImport} />
        <Tooltip text={t("import")} place="left"/>
      </label>
      <input
        ref={importFileRef}
        id="file-input"
        type="file"
        accept=".txt"
        onChange={handleChange}
      />
    </SmallButton>
  );
};

export default ImportButton;
