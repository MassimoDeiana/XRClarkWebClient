import React from "react";
import Logo from "./logo.svg";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div>
      <nav className="navbar navbar-light bg-light">
        <Link to="/Home" className="navbar-brand">
          <img
            src={Logo}
            width="30"
            height="30"
            className="d-inline-block align-top mr-4"
            alt=""
          />
          Trainning Solutions : Formation de cariste
        </Link>

        <Link to="/Connector"> Appareils connectés </Link>
        <Link to="/MachineManagement"> Ajouter machine </Link>
        <Link to="/MachineList"> Gérer machines </Link>
      </nav>
    </div>
  );
};

export default Navbar;
