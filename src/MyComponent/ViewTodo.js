import axios from "axios";
import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";

const ViewTodo = ({
  setisView,
  isView,
  viewTitleDesc,
  setisLoading,
  setexecutingMsg,
  setisWarning,
  setisWarningMsg,
  todos,
  setTodos,
}) => {
  const [title, settitle] = useState("");
  const [desc, setdesc] = useState("");

  const todoUpdate = async (e) => {
    e.preventDefault();
    setisView(false);
    setexecutingMsg("");
    setisLoading(true);
    await axios
      .put(`${process.env.REACT_APP_API_URL}/update`, {
        id: viewTitleDesc.id,
        title: title,
        desc: desc,
      })
      .then((result) => {
        if (result.data === true) {
          setexecutingMsg("Update Success");

          setTodos(
            todos.map((todo) => {
              if (todo.id === viewTitleDesc.id) {
                return {
                  id: todo.id,
                  title: title,
                  description: desc,
                  userid: todo.userid,
                };
              } else {
                return todo;
              }
            })
          );

          setTimeout(() => {
            setisLoading(false);
          }, 2000);
        } else {
          setisLoading(false);
          setisWarningMsg("Todo Updation Failed, try again!!");
          setisWarning(true);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    settitle(viewTitleDesc.title);
    setdesc(viewTitleDesc.desc);
  }, [viewTitleDesc]);

  return (
    <div
      className={`position-absolute top-0 ${isView === false ? "d-none" : ""}`}
      style={{
        backgroundColor: "rgba(0, 0, 0, 0.6)",
        height: "100vh",
        width: "100%",
        display: "grid",
        placeContent: "center",
        zIndex: "999",
      }}
    >
      <div
        className="bg-success p-3 rounded position-relative"
        style={{
          maxHeight: "500px",
          width: "600px",
        }}
      >
        <button
          className="btn btn-sm btn-warning position-absolute top-0 end-0 mt-2 me-3"
          onClick={() => {
            setisView(false);
          }}
        >
          X
        </button>
        <Form onSubmit={todoUpdate}>
          <Form.Group>
            <Form.Label className="fw-bold">Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Add your todo here"
              value={title}
              onChange={(e) => settitle(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label className="fw-bold">Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={7}
              placeholder="Description"
              value={desc}
              onChange={(e) => setdesc(e.target.value)}
            />
          </Form.Group>
          <div className="text-center">
            <Button type="submit" variant="danger">
              Update
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default ViewTodo;
