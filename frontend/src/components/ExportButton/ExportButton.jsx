import { faFileExport } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import SmallButton from "../SmallButton/SmallButton";
import { useTranslation } from "react-i18next";
import Tooltip from "../Tooltip/Tooltip";

const ExportButton = ({ handleClick }) => {
  const {t}=useTranslation();
  return (
    <SmallButton title="export" handleClick={handleClick}>
      <FontAwesomeIcon icon={faFileExport} />
      <Tooltip text={t("export")} place="left"/>
    </SmallButton>
  );
};

export default ExportButton;
