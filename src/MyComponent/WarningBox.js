import React from "react";
import warnbox from "./css/Warnbox.module.css";

const WarningBox = ({ isWarning, setisWarning, isWarningMsg }) => {
  return (
    <div
      className={`card bg-warning rounded-0 position-absolute top-0 ${
        warnbox.outerBox
      } ${isWarning === false ? "d-none" : ""}`}
    >
      <div className="card-body p-3 m-0">
        <h5 className="card-title">{isWarningMsg}</h5>
      </div>
    </div>
  );
};

export default WarningBox;
