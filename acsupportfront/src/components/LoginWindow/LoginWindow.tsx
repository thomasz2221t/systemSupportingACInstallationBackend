import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import { Link, useNavigate } from 'react-router-dom';

import AuthService from 'services/auth/AuthService';
import { UserRoles } from 'utils/UserRoles';

import './LoginWindow.scss';

export const defaultTypeData = {
  login: '',
  password: '',
  loading: false,
  message: '',
};

function LoginWindow() {
  const [data, setData] = useState(defaultTypeData);
  const [, setIsTypeRequestSent] = useState<boolean>(false);
  const navigate = useNavigate();

  async function handleUpdateData(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsTypeRequestSent(true);

    AuthService.login(data.login, data.password).then(() => {
      if (AuthService.getCurrentUserRoles()) {
        switch (AuthService.getCurrentUserRoles()[0]) {
          case UserRoles.ADMIN:
            navigate('/admin/operator');
            break;
          case UserRoles.OPERATOR:
            navigate('/operator/uslugi');
            break;
          case UserRoles.CLIENT:
            navigate('/obiekty');
            break;
        }
      } else {
        console.log('no permission to log');
      }
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
            <Link to="/rejestracja" id="account-link">
              Nie masz konta? Zarejestruj się
            </Link>
          </div>
        </form>
      </div>
    </>
  );
}

export default LoginWindow;
