import React from "react";
import Logo from "./logo.svg";

const Navbar = () => {
  return (
    <div>
      <nav className="navbar navbar-light bg-light">
        <a className="navbar-brand" href="#">
          <img
            src={Logo}
            width="30"
            height="30"
            className="d-inline-block align-top mr-4"
            alt=""
          />
          Trainning Solutions : Formation de cariste
        </a>
      </nav>
    </div>
  );
};

export default Navbar;
