import React from "react";
import "./PrinNavStyles.css";

export default function PrincipalNav() {
  return (
    <nav className="d-flex justify-content-between navPrin">
      <div className="logoDiv">
        <img className="logo" src="/public/logo.png" alt="" />
      </div>
      <button className="d-flex btn align-items-center OneButton">
        <div className="d-flex justify-content-around align-items-center w-100">
          <p className="mb-0 location">Location</p>
          <p className="mb-0 d-flex justify-content-center align-items-center add">
            Add guest
          </p>
          <span className="material-symbols-outlined search">search</span>
        </div>
      </button>
    </nav>
  );
}


