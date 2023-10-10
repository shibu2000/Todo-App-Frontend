import React from "react";
import { Todo } from "./Todo";

export const Todos = (props) => {
  return (
    <div className="container-fluid">
      <h1 className="text-center bg-secondary text-warning py-2">Todos List</h1>
      {props.todos.length === 0 ? (
        <h5 className="text-center">No todos to display</h5>
      ) : (
        props.todos.map((todo) => {
          return (
            <Todo
              todo={todo}
              key={todo.id}
              onDelete={props.onDelete}
              setisView={props.setisView}
              setviewTitleDesc={props.setviewTitleDesc}
            />
          );
        })
      )}
    </div>
  );
};
