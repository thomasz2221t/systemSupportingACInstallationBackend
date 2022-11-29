import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { LoginPage } from "./pages/LoginPage/LoginPage";
import { BuildingsPage } from "./pages/BuildingsPage/BuildingsPage";
import { BuildingPage } from "pages/BuildingPage/BuildingPage";
import { RoomPage } from "pages/RoomPage/RoomPage";
import { ServicePage } from "pages/ServicePage/ServicePage";

import "./App.css";
//import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <>
      <div className="App">
        {/*<header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>*/}
        <Router>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/obiekty" element={<BuildingsPage />} />
            <Route path="/obiekty/obiekt/:id" element={<BuildingPage />} />
            <Route
              path="/obiekty/obiekt/:id/pomieszczenia"
              element={<RoomPage />}
            />
            <Route path="/uslugi" element={<ServicePage />} />
          </Routes>
        </Router>
      </div>
    </>
  );
}

export default App;
