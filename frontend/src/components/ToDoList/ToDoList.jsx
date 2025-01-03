import React, { useEffect, useState } from "react";
import styles from "./ToDoList.module.scss";
import Task from "../Task/Task";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEraser,
  faListCheck,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import toFarsiNumber from "../../utils/toFarsiNumber";
import { useTranslation } from "react-i18next";
import Modal from "../Modal/Modal";
import SmallButton from "../SmallButton/SmallButton";
import Tooltip from "../Tooltip/Tooltip";
import axios from "axios";
import LogoutButton from "../LogoutButton/LogoutButton";

const ToDoList = ({ locale, setUser }) => {
  //states and other hooks
  const token = localStorage.getItem("user");
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [error, setError] = useState({
    show: false,
    message: "",
  });
  const Closed_Modals = { deleteAll: false, isEmpty: false };
  const [showModal, setShowModal] = useState(Closed_Modals);
  const [doneAll, setDoneAll] = useState(false);

  const { t } = useTranslation("");

  //functions
  const handleNewTaskAdd = (e) => {
    setNewTask(e.target.value);
    setError({ ...error, show: false });
  };

  const isValid = newTask.length >= 3 && newTask.length <= 255;
  const addTask = (e) => {
    e.preventDefault();
    if (isValid) {
      axios
        .post(
          "http://localhost:4500/api/tasks/add",
          { task: newTask },
          {
            headers: {
              "toDoList-Auth-Token": JSON.parse(token),
            },
          }
        )
        .then((response) => {
          setTasks(response.data.list); // Update tasks from the server
          setNewTask(""); // Clear the input field
        })
        .catch((error) => {
          console.error("Error adding task:", error);
        });
    } else {
      setError({
        show: true,
        message:
          newTask.length < 3
            ? "input_must_be_at_least_3_characters"
            : "input_cant_be_more_than_250_characters",
      });
    }
  };

  const handleDeleteAllTasks = () => {
    axios
      .delete("http://localhost:4500/api/tasks/delete", {
        headers: {
          "toDoList-Auth-Token": JSON.parse(token),
        },
      })
      .then(() => {
        setTasks([]);
        setShowModal({ ...Closed_Modals });
      })
      .catch((error) => console.error("Error deleting all tasks:", error));
  };

  const handleEditTask = (taskId, newTitle) => {
    axios
      .post(
        `http://localhost:4500/api/tasks/edit/${taskId}`,
        { task: newTitle },
        {
          headers: {
            "toDoList-Auth-Token": JSON.parse(token),
          },
        }
      )
      .then((response) => setTasks(response.data.list))
      .catch((error) => console.error("Error editing task:", error));
  };

  const handleDeleteTask = (taskId) => {
    axios
      .delete(`http://localhost:4500/api/tasks/delete/${taskId}`, {
        headers: {
          "toDoList-Auth-Token": JSON.parse(token),
        },
      })
      .then((response) => setTasks(response.data.list))
      .catch((error) => console.error("Error deleting task:", error));
  };

  useEffect(() => {
    axios
      .get("http://localhost:4500/api/tasks", {
        headers: {
          "toDoList-Auth-Token": JSON.parse(token),
        },
      })
      .then((response) => {
        setTasks(response.data.list);
      })
      .catch((error) => console.error("Error fetching tasks:", error));
  }, []);

  const handleModalClose = () => {
    setShowModal({ ...Closed_Modals });
  };

  const handleConfirmDelete = () => {
    setShowModal({ ...Closed_Modals, deleteAll: true });
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  const handleToggleTask = (taskId) => {
    console.log("tasks", taskId);
    axios
      .get(`http://localhost:4500/api/tasks/toggleState/${taskId}`, {
        headers: {
          "toDoList-Auth-Token": JSON.parse(token),
        },
      })
      .then((response) => setTasks(response.data.list)) // Update tasks from the server
      .catch((error) => console.error("Error toggling task:", error));
  };

  return (
    <>
      <div className={styles.topBarContainer}>
        <div>
          <SmallButton handleClick={handleConfirmDelete}>
            <FontAwesomeIcon icon={faEraser} />
            <Tooltip text={t("delete_all")} place="right" />
          </SmallButton>
          <SmallButton>
            <FontAwesomeIcon icon={faListCheck} />
            <Tooltip
              text={t(doneAll ? "uncheck_all" : "check_all")}
              place="right"
            />
          </SmallButton>
        </div>
        <div>
          <LogoutButton handleLogout={handleLogout} />
        </div>
      </div>
      <div
        className={styles.background}
        onClick={() => setError({ ...error, show: false })}
      ></div>
      <div
        className={
          styles.contentContainer +
          " " +
          (locale === "fa" ? styles.farsiToDoListContainer : "") +
          " " +
          (error.show ? styles.errorBox : "")
        }
        style={
          Object.values(showModal).find((modal) => modal === true)
            ? { zIndex: 5 }
            : {}
        }
      >
        <Modal
          show={showModal.deleteAll}
          text={t("delete_all_confiramation")}
          handleClose={() => handleModalClose()}
          handleConfirm={() => handleDeleteAllTasks()}
          actions
        />
        <Modal
          show={showModal.isEmpty}
          text={t("list_is_empty")}
          handleClose={() => handleModalClose()}
        />

        <form onSubmit={addTask}>
          <h1>{t("to_do_list")}</h1>
          <label>
            <input
              type="text"
              value={newTask}
              onChange={handleNewTaskAdd}
              placeholder={t("things_i_have_to_do")}
            />
            {isValid && (
              <button type="submit">
                <FontAwesomeIcon icon={faPlus} />
              </button>
            )}
          </label>
        </form>

        <p
          className={
            styles.errorMessage +
            " " +
            (error.show ? styles.showError : styles.hideError)
          }
        >
          {t(error.message)}
        </p>
        <ul className={styles.list}>
          {tasks
            ?.sort((x, y) => (x.done === y.done ? 0 : x.done ? 1 : -1))
            .map((task, index) => (
              <Task
                task={task}
                onToggle={() => handleToggleTask(task._id)}
                onEdit={(newTitle) => handleEditTask(task._id, newTitle)}
                onDelete={() => handleDeleteTask(task._id)}
                key={task._id}
                setError={setError}
                index={locale === "fa" ? toFarsiNumber(index + 1) : index + 1}
              />
            ))}
        </ul>
      </div>
    </>
  );
};

export default ToDoList;
