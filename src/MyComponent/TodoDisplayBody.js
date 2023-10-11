import React, { useState, useEffect, useRef } from "react";
// import { Navigate } from "react-router-dom";
import "./css/todo_displayBody.css";
import { AddTodo } from "./AddTodo";
import { Todos } from "./Todos";
import axios from "axios";
import Excecuting from "./Excecuting";
import WarningBox from "./WarningBox";
import ViewTodo from "./ViewTodo";

export const TodoDisplayBody = (props) => {
  const keyid = useRef(0);

  const [todos, setTodos] = useState([]);

  const [isWarning, setisWarning] = useState(false);
  const [isWarningMsg, setisWarningMsg] = useState("");
  const [isView, setisView] = useState(false);
  const [viewTitleDesc, setviewTitleDesc] = useState({
    id: "",
    title: "",
    desc: "",
  });

  useEffect(() => {
    axios
      .post(`${process.env.REACT_APP_API_URL}/fetchtodo`, {
        userid: props.userid,
      })
      .then((res) => {
        if (res.data.length !== 0) {
          keyid.current = res.data[res.data.length - 1].id;
          setTodos(res.data);
        }
      })
      .catch((err) => {
        throw err;
      });
  }, [props.userid]);

  const onDelete = async (todo) => {
    props.setexecutingMsg("");
    props.setisLoading(true);
    await axios
      .delete(`${process.env.REACT_APP_API_URL}/delete/${todo.id}`)
      .then((res) => {
        if (res.data === true) {
          setTodos(
            todos.filter((e) => {
              return e !== todo;
            })
          );
          props.setexecutingMsg("Successfully Deleted");
        } else {
          alert("Server issue!!");
        }
        setTimeout(() => {
          props.setisLoading(false);
        }, 2000);
      })
      .catch((err) => {
        console.log(err);
        setisWarningMsg("Deletion Failed, Try Again!!");
        setisWarning(true);
        props.setisLoading(false);
      });
  };

  const addTodo = (title, desc) => {
    setTodos([
      ...todos,
      {
        id: (keyid.current += 1),
        title: title,
        description: desc,
      },
    ]);
  };
  return (
    <>
      <Excecuting
        isLoading={props.isLoading}
        executingMsg={props.executingMsg}
      />
      <ViewTodo
        setisView={setisView}
        isView={isView}
        viewTitleDesc={viewTitleDesc}
        setisLoading={props.setisLoading}
        setexecutingMsg={props.setexecutingMsg}
        setisWarning={setisWarning}
        setisWarningMsg={setisWarningMsg}
        todos={todos}
        setTodos={setTodos}
      />
      <WarningBox isWarning={isWarning} isWarningMsg={isWarningMsg} />
      <div className="container py-2">
        <div className="row">
          <div className="col-md-4 mb-2">
            <AddTodo
              userid={props.userid}
              addTodo={addTodo}
              setisLoading={props.setisLoading}
              setexecutingMsg={props.setexecutingMsg}
              setisWarning={setisWarning}
              setisWarningMsg={setisWarningMsg}
            />
          </div>
          <div className="col-md-8 overflow-scroll" style={{ height: "90vh" }}>
            <Todos
              todos={todos}
              onDelete={onDelete}
              setisView={setisView}
              setviewTitleDesc={setviewTitleDesc}
            />
          </div>
        </div>
      </div>
    </>
  );
};
