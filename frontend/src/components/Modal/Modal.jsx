import React from "react";
import styles from "./Modal.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";

const Modal = ({ show, handleClose, text, handleConfirm, actions }) => {
  const { t } = useTranslation();
  return (
    <div className={show ? styles.showModal : styles.hideModal}>
      <div className={styles.modalContainer}>
        <div className={styles.modal}>
          <span className={styles.closeIcon} onClick={handleClose}>
            <FontAwesomeIcon icon={faClose} />
          </span>
          <div className={styles.content}>
            <p>{text}</p>
            {actions ? (
              <div className={styles.actions}>
                <button
                  className={styles.confirmButton}
                  onClick={handleConfirm}
                >
                  {t("confirm")}
                </button>
                <button className={styles.cancelButton} onClick={handleClose}>
                  {t("cancel")}
                </button>
              </div>
            ) : (
              <div className={styles.actions}>
                <button className={styles.confirmButton} onClick={handleClose}>
                  {t("ok")}
                </button>
              </div>
            )}
          </div>
        </div>
        <div className={styles.backdrop} onClick={handleClose}></div>
      </div>
    </div>
  );
};

export default Modal;
