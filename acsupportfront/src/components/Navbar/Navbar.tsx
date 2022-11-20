import React from "react";
import { Link, useMatch, useNavigate, useResolvedPath } from "react-router-dom";
import CustomLinkFirst from "./CustomLinkFirst";
import CustomLinkSingle from "./CustomLinkSingle";

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
            <CustomLinkFirst linky={"/obiekty"}>
              Informacje o budynkach
            </CustomLinkFirst>
            <CustomLinkSingle linky={"/uslugi"}>
              Usługa i oferta
            </CustomLinkSingle>
            <CustomLinkSingle linky={"/szczegoly"}>
              Szczegóły zamówienia
            </CustomLinkSingle>
          </ul>
        </div>
      </div>
    </>
  );
}
