import React from "react";
import "./Loader.css";

const Loader = () => {
  return (
    <div
      className="fixed h-screen w-screen z-50"
      style={{ background: "rgba(0, 0, 0, 0.5)" }}
    >
      <div className="flex justify-center items-center h-screen ">
        <div className="loader ease-linear rounded-full border-4 border-t-4 border-blue-900 h-20 w-20 mb-4"></div>
      </div>
    </div>
  );
};

export default Loader;
