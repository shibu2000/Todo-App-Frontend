import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";

export const AddTodo = (props) => {
  const userid = props.userid;
  const [isSubmit, setisSubmit] = useState(false);
  const [title, setTitle] = useState(" ");
  const [desc, setDesc] = useState(" ");

  const submit = async (e) => {
    e.preventDefault();
    if (!title || !desc) {
      alert("Title or Description can't be BLANK");
    } else {
      console.log(title.trimStart());
      props.setexecutingMsg("");
      props.setisLoading(true);
      setisSubmit(true);
      await axios
        .post(`${process.env.REACT_APP_API_URL}/savetodo`, {
          title: title,
          desc: desc,
          userid: userid,
        })
        .then((res) => {
          if (res.data === true) {
            props.addTodo(title, desc);
            setTitle("");
            setDesc("");
            props.setexecutingMsg("Added Successfully");
          } else {
            props.setexecutingMsg("Server issue try again!!");
          }
          setisSubmit(false);
          setTimeout(() => {
            props.setisLoading(false);
          }, 2000);
        })
        .catch((err) => {
          console.log(err);
          props.setisLoading(false);
          setisSubmit(false);
          props.setisWarningMsg("Todo Added Failed, try again!!");
          props.setisWarning(true);
        });
    }
  };

  return (
    <div className="container-fluid">
      <h4 className="text-center bg-secondary py-2 text-light">Add You Todo</h4>
      <Form onSubmit={submit}>
        <Form.Group className="mb-3" controlId="title">
          <Form.Label>Todo Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Add your todo here"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={5}
            placeholder="Description"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />
        </Form.Group>
        <Button
          variant="success"
          type="submit"
          className={`${isSubmit === true ? "disabled" : ""}`}
        >
          Submit
        </Button>
      </Form>
    </div>
  );
};
