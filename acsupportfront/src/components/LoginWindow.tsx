import React, { useState } from "react";
import { Icon } from "@iconify/react";
import { Link, Navigate, useLocation } from "react-router-dom";
import AuthService from "services/auth/AuthService";
import "./LoginWindow.scss";
import { BuildingsPage } from "pages/BuildingsPage/BuildingsPage";

export const defaultTypeData = {
  login: "",
  password: "",
};

function LoginWindow() {
  const [data, setData] = useState(defaultTypeData);
  const [, setIsTypeRequestSent] = useState<boolean>(false);
  let location = useLocation();

  async function handleUpdateData(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log(data.login);
    console.log(data.password);
    setIsTypeRequestSent(true);

    AuthService.login(data.login, data.password).then(() => {
      console.log("link");
      console.log(AuthService.getCurrentUser());
      //<Link to="/obiekty" />;
      //<Redirect to="/obiekty" />;
      //props.history.push("/obiekty");
      <Navigate to="/obiekty" state={{ from: location }} />;
    });
  }

  return (
    <>
      <div className="login-panel">
        <div className="log-in-label">
          <p>Zaloguj się</p>
        </div>
        <form
          id="login-form"
          className="login-form-class"
          onSubmit={handleUpdateData}
        >
          <div>
            <Icon
              className="login-icon"
              icon="mdi:user-circle-outline"
              color="#4e4e4e"
              height="32"
              //onClick={() => setOpenParameterTypeForm(true)
            />
            <input
              className="login-input"
              type="text"
              placeholder="login"
              onChange={(e) =>
                setData({
                  ...data,
                  login: e.target.value,
                })
              }
            />
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
              onChange={(e) =>
                setData({
                  ...data,
                  password: e.target.value,
                })
              }
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
}

export default LoginWindow;
