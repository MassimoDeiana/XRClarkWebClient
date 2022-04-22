import React from "react";
import "./App.css";
import Connector from "./Connector";
import Navbar from "./Navbar";
import Home from "./Home";
import MachineManagement from "./MachineManagement";
import MachineList from "./MachineList";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/Connector" element={<Connector />} />
          <Route path="/MachineManagement" element={<MachineManagement />} />
          <Route path="/MachineList" element={<MachineList />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
