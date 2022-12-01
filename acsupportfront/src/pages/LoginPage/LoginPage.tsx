import React from "react";
import LoginWindow from "components/LoginWindow/LoginWindow";
import "./LoginPage.scss";

export function LoginPage() {
  const logoImg = require("../../images/logoImg.png");

  return (
    <>
      <div className="login-background">
        <div className="white-polygon" />
        <div className="red-polygon" />
        <div className="company-symbols">
          <p className="logo-company">Silent Air Industries</p>
          <img src={logoImg} width="84" height="84" className="login-logo" />
        </div>
        {/*<div className="login-company"></div>*/}
        <div className="login-component">
          <LoginWindow />
        </div>
      </div>
    </>
  );
}
