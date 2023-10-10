import React from "react";
import { Button } from "react-bootstrap";
export const Todo = ({ todo, onDelete, setisView, setviewTitleDesc }) => {
  const onView = () => {
    setisView(true);
    setviewTitleDesc({
      id: todo.id,
      title: todo.title,
      desc: todo.description,
    });
  };
  return (
    <div className="bg-light d-flex mb-2 rounded">
      <div className="left flex-grow-1 p-1 overflow-hidden">
        <h6 className="text-justify fw-bold">{todo.title}</h6>
        <p
          className="text-justify font-monospace overflow-hidden"
          style={{
            maxHeight: "12rem",
          }}
        >
          {todo.description}
        </p>
      </div>
      <div className="right d-flex justify-content-center align-item-center">
        <Button
          className=" btn btn-primary btn-sm my-auto me-2"
          onClick={onView}
        >
          V
        </Button>
        <Button
          className=" btn btn-danger btn-sm my-auto me-2"
          onClick={() => {
            onDelete(todo);
          }}
        >
          D
        </Button>
      </div>
    </div>
  );
};
