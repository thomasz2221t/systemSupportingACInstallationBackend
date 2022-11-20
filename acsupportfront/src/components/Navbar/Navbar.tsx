import React from "react";
import { useNavigate } from "react-router-dom";

import "./Navbar.scss";

export default function Navbar() {
  const logoImg = require("../../images/logoImg.png");
  const navigate = useNavigate();

  function handleLogoAction() {
    return navigate("/");
  }

  return (
    <>
      <div className="navbar-body">
        <div className="company-logo">
          <img
            src={logoImg}
            width="84"
            height="84"
            className="navbar-logo"
            onClick={handleLogoAction}
          />
        </div>
        <div className="navbar-elements">
          <ul>
            <li>Informacje o budynkach</li>
            <li>Usługa i oferta</li>
            <li>Szczegóły zamówienia</li>
          </ul>
        </div>
      </div>
    </>
  );
}
