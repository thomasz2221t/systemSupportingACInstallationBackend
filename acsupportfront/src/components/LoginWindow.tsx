import React from "react";
import { Icon } from "@iconify/react";
import "./LoginWindow.scss";
const LoginWindow = () => {
  return (
    <>
      <div className="login-panel">
        <div className="log-in-label">
          <p>Zaloguj się</p>
        </div>
        <form>
          <div>
            <Icon
              className="login-icon"
              icon="mdi:user-circle-outline"
              color="#4e4e4e"
              height="32"
              //onClick={() => setOpenParameterTypeForm(true)
            />
            <input className="login-input" type="text" placeholder="login" />
          </div>
          <div>
            <Icon
              className="password-icon"
              icon="material-symbols:key-outline-rounded"
              color="#4e4e4e"
              height="32"
              //onClick={() => setOpenParameterTypeForm(true)
            />
            <input
              className="password-input"
              type="password"
              placeholder="hasło"
            />
          </div>
          <div>
            <button className="log-in-button" type="submit">
              Zaloguj
            </button>
          </div>
          <div className="create-account-link">
            <p>Nie masz konta? Zarejestruj się</p>
          </div>
        </form>
      </div>
    </>
  );
};

export default LoginWindow;
