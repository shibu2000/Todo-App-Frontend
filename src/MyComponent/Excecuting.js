import React from "react";
import { HashLoader } from "react-spinners";

const Excecuting = (props) => {
  return (
    <div
      className={`text-light ${props.isLoading === true ? "" : "d-none"}`}
      style={{
        position: "absolute",
        top: "0",
        width: "100%",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.6)",
      }}
    >
      <div style={{ display: "inline-block" }}>
        <HashLoader color="#d63652" size={79} speedMultiplier={1} />
      </div>
      <div>
        <h3 className="mt-5">{props.executingMsg}</h3>
      </div>
    </div>
  );
};

export default Excecuting;
