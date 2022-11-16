import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { LoginPage } from "./pages/LoginPage/LoginPage";
import { BuildingsPage } from "./pages/BuildingsPage/BuildingsPage";
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
          <Link to="/" />
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/obiekty" element={<BuildingsPage />} />
          </Routes>
        </Router>
      </div>
    </>
  );
}

export default App;
