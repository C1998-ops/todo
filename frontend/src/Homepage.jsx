import { Alert, Box, Modal, Snackbar, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  FETCH_TASKS,
  POST_TASK,
} from "./Components/Services/Api_Routes_Helper";
import TodoContainer from "./Components/Todos/TodoContainer";
const Homepage = () => {
  const [showModal, setShowModal] = useState(false);

  const [tasks, setTasks] = useState([]); // Array to store all tasks
  const [taskData, setTaskData] = useState({
    title: "",
    description: "",
    is_completed: false,
  });
  const [successMsg, setSuccessMsg] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [showErr, setshowErr] = React.useState(false);

  //state to fetch stored todos
  const [todos, setTodos] = useState([]);
  useEffect(() => {
    async function fetchdata() {
      const { data } = await axios.get(FETCH_TASKS);
      if (data !== null) {
        setTodos(data.tasks);
      }
    }
    fetchdata();
  }, [tasks]);

  const handleOpen = (e) => {
    e.preventDefault();
    setTaskData({ title: "", description: "" });
    setShowModal(true);
  };
  const handleClosePopUpErr = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setshowErr(false);
  };
  function handleClose(event, reason) {
    event.preventDefault();
    if (reason !== "backdropClick") {
      setShowModal(false);
    }
  }
  //function to edit todo
  async function editTodo(todoId) {
    let taskToEdit = todos?.find((data) => data._id === todoId);
    if (taskToEdit) {
      console.log(taskToEdit);
      setTaskData({
        title: taskToEdit.title,
        description: taskToEdit.description,
      });
      setShowModal(true);
    } else {
      console.error("Task not found");
      setShowModal(false);
    }
  }
  //function to delete todo
  async function deleteTodo(id) {
    let newTodos = todos?.filter((data) => data._id !== id);
    setTodos(newTodos);
    console.log(todos);
  }
  async function handleTaskCreation(event) {
    event.preventDefault();
    setTasks((prevTasks) => [...prevTasks, taskData]);
    setTaskData({ title: "", description: "", is_completed: false });
    const { data, status } = await axios.post(POST_TASK, taskData, {
      headers: {
        "Content-Type": "Application/json",
      },
    });
    console.log(data);
    setSuccessMsg("task has been created !");
    setshowErr(true);
  }
  function handleChange(event) {
    const { name, value } = event.target;
    setTaskData((prevData) => ({ ...prevData, [name]: value }));
  }
  const styleModal = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 2,
  };
  return (
    <div className="container-main">
      <div className="add-task">
        <span>
          Add your New task here :{" "}
          <button
            type="button"
            className="button_style"
            onClick={(e) => handleOpen(e)}
          >
            Add Task
          </button>
        </span>
        <Snackbar></Snackbar>
        <Modal
          open={showModal}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={styleModal}>
            <span style={{ float: "right", padding: 1 }}>
              <button type="button">
                <i
                  className="fa fa-times "
                  aria-hidden={true}
                  onClick={handleClose}
                  style={{ color: "red", cursor: "pointer" }}
                ></i>
              </button>
            </span>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Add Task
            </Typography>
            <form onSubmit={(e) => handleTaskCreation(e)}>
              <div className="form">
                <label htmlFor="task-title">
                  Title :{" "}
                  <input
                    type="text"
                    id="task-title"
                    name="title"
                    onChange={handleChange}
                    className="form-input"
                    required
                    autoComplete="none"
                    value={taskData.title}
                  />
                </label>
              </div>
              <div className="form">
                <label htmlFor="task-title">
                  Description :
                  <textarea
                    id="task-decription"
                    className="form-input"
                    onChange={handleChange}
                    required
                    autoComplete="none"
                    rows={3}
                    name="description"
                    value={taskData.description}
                  />
                </label>
              </div>
              <div className="task-Container-btns">
                <button
                  type="submit"
                  className="task-save-btn"
                  style={{ backgroundColor: "#3d49fff0" }}
                >
                  save
                </button>
                {/* <button
                  type="button"
                  className="task-complete-btn"
                  style={{ backgroundColor: "#3be73b" }}
                >
                  Mark as Complete
                </button> */}
                <button
                  type="reset"
                  className="task-reset-btn"
                  style={{ backgroundColor: "#f93636" }}
                >
                  reset
                </button>
              </div>
            </form>
          </Box>
        </Modal>
      </div>
      <Box padding={1} overflow={"auto"}>
        <TodoContainer
          todos={todos}
          editTodo={editTodo}
          removeItem={deleteTodo}
        />
      </Box>
      {CustomAlertBar()}
    </div>
  );
  function CustomAlertBar() {
    return (
      <Snackbar
        open={showErr}
        autoHideDuration={250}
        onClose={handleClosePopUpErr}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleClosePopUpErr}
          severity={errMsg ? "error" : "success"}
          sx={{ width: "100%", fontSize: 15 }}
        >
          {errMsg || successMsg}
        </Alert>
      </Snackbar>
    );
  }
};
export default Homepage;
