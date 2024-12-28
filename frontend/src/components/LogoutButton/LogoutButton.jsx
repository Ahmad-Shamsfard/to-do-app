import React from "react";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SmallButton from "../SmallButton/SmallButton";
import Tooltip from "../Tooltip/Tooltip";
import { useTranslation } from "react-i18next";

const LogoutButton = ({ handleLogout }) => {
  const { t } = useTranslation();

  return (
    <SmallButton title="logout">
      <button onClick={handleLogout} className="logoutButton">
        <FontAwesomeIcon icon={faSignOutAlt} />
        <Tooltip text={t("logout")} place="left" />
      </button>
    </SmallButton>
  );
};

export default LogoutButton;
