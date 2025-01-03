import React, { useRef, useState } from "react";
import styles from "./Task.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faPenToSquare,
  faRotateLeft,
  faSquareCheck,
  faSquareMinus,
  faTrash,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import Tooltip from "../Tooltip/Tooltip";
import { useTranslation } from "react-i18next";

const Task = ({ task, onToggle, onEdit, onDelete, index, error, setError }) => {
  const [editMode, setEditMode] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.task || "");
  const [deleted, setDeleted] = useState(false); // For animating the deletion
  const { t } = useTranslation();
  const taskRef = useRef(null);

  // Handle confirm edit
  const handleEditConfirm = (e) => {
    e.preventDefault();
    if (editedTitle.trim().length === 0) {
      setError({ show: true, message: t("task_cannot_be_empty") });
      return;
    }
    onEdit(editedTitle); // Trigger onEdit with the new title
    setEditMode(false);
    setError({ show: false, message: "" });
  };

  // Handle undo edit
  const handleUndoEdit = () => {
    setEditedTitle(task.task); // Revert back to original task name
    setError({ show: false, message: "" });
  };

  // Handle delete with animation
  const handleDelete = () => {
    setDeleted(true); // Trigger deletion animation
    setTimeout(() => {
      onDelete(); // Execute delete after animation
    }, 200); // Match the duration of the CSS animation
  };

  return (
    <li
      className={`${styles.task} ${task.state ? styles.taskDone : ""} ${
        deleted ? styles.taskDeleted : ""
      }`}
      ref={taskRef}
    >
      {!editMode ? (
        <>
          <div className={styles.title}>
            <span>{index}.</span>
            <p>{task.task}</p>
          </div>
          <div className={styles.actions}>
            <button onClick={onToggle}>
              {task.state === false ? (
                <FontAwesomeIcon icon={faSquareCheck} />
              ) : (
                <FontAwesomeIcon icon={faSquareMinus} />
              )}
              <Tooltip text={task.state ? t("undone") : t("done")} />
            </button>
            <button onClick={() => setEditMode(true)}>
              <FontAwesomeIcon icon={faPenToSquare} />
              <Tooltip text={t("edit")} />
            </button>
            <button onClick={handleDelete}>
              <FontAwesomeIcon icon={faTrash} />
              <Tooltip text={t("delete")} />
            </button>
          </div>
        </>
      ) : (
        <>
          <div className={styles.title}>
            <span>{index}.</span>
            <form onSubmit={handleEditConfirm} className={styles.editingForm}>
              <input
                type="text"
                value={editedTitle}
                onChange={(e) => setEditedTitle(e.target.value)}
              />
              {editedTitle !== task.task && (
                <button
                  type="button"
                  className={styles.undoButton}
                  onClick={handleUndoEdit}
                >
                  <FontAwesomeIcon icon={faRotateLeft} />
                </button>
              )}
            </form>
          </div>
          <div className={`${styles.actions} ${styles.editingButtons}`}>
            <button type="submit" onClick={handleEditConfirm}>
              <FontAwesomeIcon icon={faCheck} />
              <Tooltip text={t("confirm")} />
            </button>
            <button onClick={() => setEditMode(false)}>
              <FontAwesomeIcon icon={faXmark} />
              <Tooltip text={t("cancel")} />
            </button>
          </div>
        </>
      )}
    </li>
  );
};

export default Task;
