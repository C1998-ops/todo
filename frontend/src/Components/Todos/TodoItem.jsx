import { Button } from "@mui/material";
import React from "react";

const TodoItem = ({
  index,
  title,
  description,
  createdAt,
  id,
  edit,
  removeItem,
  disableDelete,
}) => {
  const buttonStyle = {
    maxWidth: "70px",
    fontSize: "12px",
    filter: "contrast(1)",
    fontWeight: "300",
    fontFamily: "sans-serif",
  };
  return (
    <div className="container_body">
      <div className="container_body_left">
        <div className="todo-title">
          <h4>{title}</h4>
        </div>
        <div className="todo-descp">
          <span>{description}</span>
        </div>
        <span className="todo-time">
          created at:{" "}
          {createdAt
            ? new Date(createdAt).toLocaleTimeString()
            : new Date(Date.now()).toLocaleTimeString()}
        </span>
      </div>
      <div className="container_body_bottom">
        <Button
          sx={buttonStyle}
          variant="contained"
          color="error"
          onClick={() => removeItem(id)}
          disabled={disableDelete}
        >
          Delete
        </Button>

        <Button
          sx={buttonStyle}
          color="secondary"
          variant="contained"
          onClick={() => edit(id)}
        >
          Edit
        </Button>
      </div>
    </div>
  );
};

export default TodoItem;
