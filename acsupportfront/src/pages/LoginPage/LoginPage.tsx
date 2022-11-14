import React from "react";
import LoginWindow from "../../components/LoginWindow";
import "./LoginPage.scss";

export function LoginPage() {
  return (
    <>
      <div className="login-background">
        <div className="white-polygon" />
        <div className="red-polygon" />
        <div className="login-logo">
          <img />
        </div>
        <div className="login-company"></div>
        <div className="login-component">
          <LoginWindow />
        </div>
      </div>
    </>
  );
}
