import React from "react";
import Logo from "./home.png";

const Home = () => {
  return (
    <div>
      <img
        src={Logo}
        width="30%"
        height="30%"
        className="d-inline-block align-top mr-4"
        alt=""
      />
    </div>
  );
};

export default Home;
