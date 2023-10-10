import React from "react";
// import footer from "./css/footer.module.css";

export const Footer = () => {
  let footerStyle = {
    width: "100%",
  };
  return (
    <footer
      className="bg-dark text-light py-2 position-absolute bottom-0 "
      style={footerStyle}
    >
      <p className="text-center">Copyright &copy; MyTodoList.com</p>
    </footer>
  );
};
