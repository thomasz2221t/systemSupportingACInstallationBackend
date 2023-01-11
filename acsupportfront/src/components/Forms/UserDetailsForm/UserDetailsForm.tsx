import React, { useState } from 'react';
import { Button, TextField } from '@mui/material';
import { Icon } from '@iconify/react';

import { UserType } from 'types/UserType';

import './UserDetailsForm.scss';
import { UserRoles } from 'utils/UserRoles';
import UserService from 'services/UserService';

export type UserDetailsFormType = {
  id: number;
  login: string;
  password: string;
  firstName: string;
  lastName: string;
  email: string;
  telephone: string;
  mustCreate: boolean;
  isClient: boolean;
  handleFormClose?: () => void;
};

export function UserDetailsForm({
  id,
  login,
  password,
  firstName,
  lastName,
  email,
  telephone,
  mustCreate,
  isClient,
  handleFormClose,
}: UserDetailsFormType) {
  const [userBody, setUserBody] = useState<UserType>({
    id: id,
    login: login,
    password: password,
    firstName: firstName,
    lastName: lastName,
    email: email,
    telephone: telephone,
  });
  const [userPasswordCheck, setUserPasswordCheck] = useState<String>('');
  const [isUserFormEditable, setIsUserFormEditable] =
    useState<boolean>(mustCreate);

  const handleCreatingUserBody = async (
    userBody: UserType,
    userType: UserRoles
  ) => {
    await UserService.postCreateUserBody(userBody, userType);
  };

  const handleUpdatingUserBody = async (userBody: UserType) => {
    await UserService.patchUpdateUserBody(userBody);
  };

  const handleUserFormSubmiting = (userBody: UserType, userType: UserRoles) => {
    mustCreate === true
      ? handleCreatingUserBody(userBody, userType)
      : handleUpdatingUserBody(userBody);
  };

  return isUserFormEditable === false ? (
    <>
      <div id="user-form">
        <div className="edit-user-button">
          <Icon
            className="return-icon"
            icon="material-symbols:room-preferences-outline"
            color="#4e4e4e"
            height="21"
          />
          <Button
            sx={{
              color: '#ffffff',
            }}
            onClick={() => {
              setIsUserFormEditable(!isUserFormEditable);
            }}
          >
            Edytuj użytkownika
          </Button>
        </div>
        <div className="user-first-name-form">
          <text className="user-form-header">Imię</text>
          <TextField
            label="Imię"
            variant="filled"
            fullWidth
            value={userBody.firstName}
            InputProps={{
              readOnly: true,
            }}
          />
        </div>
        <div className="user-last-name-form">
          <text className="user-form-header">Nazwisko</text>
          <TextField
            label="Nazwisko"
            variant="filled"
            fullWidth
            value={userBody.lastName}
            InputProps={{
              readOnly: true,
            }}
          />
        </div>
        <div className="user-email-form">
          <text className="user-form-header">Adres email</text>
          <TextField
            label="Adres email"
            variant="filled"
            fullWidth
            value={userBody.email}
            InputProps={{
              readOnly: true,
            }}
          />
        </div>
        <div className="user-telephone-form">
          <text className="user-form-header">Numer telefonu</text>
          <TextField
            label="Numer telefonu"
            variant="filled"
            fullWidth
            value={userBody.telephone}
            InputProps={{
              readOnly: true,
            }}
          />
        </div>
        <div className="user-login-form">
          <text className="user-form-header">Login</text>
          <TextField
            label="Login"
            variant="filled"
            fullWidth
            value={userBody.login}
            InputProps={{
              readOnly: true,
            }}
          />
        </div>
        <div className="user-password-form">
          <text className="user-form-header">Hasło</text>
          <TextField
            label="Hasło"
            variant="filled"
            fullWidth
            value={userBody.password}
            InputProps={{
              readOnly: true,
            }}
          />
        </div>
        <div className="user-password-second-form">
          <text className="user-form-header">Powtórz hasło</text>
          <TextField
            label="Powtórz hasło"
            variant="filled"
            fullWidth
            value={userPasswordCheck}
            InputProps={{
              readOnly: true,
            }}
          />
        </div>
      </div>
    </>
  ) : (
    <>
      <div id="user-form">
        {mustCreate === false ? (
          <div className="edit-user-button">
            <Icon
              className="return-icon"
              icon="material-symbols:room-preferences-outline"
              color="#4e4e4e"
              height="21"
            />
            <Button
              sx={{
                color: '#ffffff',
              }}
              onClick={() => {
                setIsUserFormEditable(!isUserFormEditable);
              }}
            >
              Edytuj użytkownika
            </Button>
          </div>
        ) : null}
        <div className="user-first-name-form">
          <text className="user-form-header">Imię</text>
          <TextField
            label="Imię"
            variant="filled"
            fullWidth
            value={userBody.firstName}
            InputProps={{
              readOnly: false,
            }}
            onChange={(e) =>
              setUserBody({
                ...userBody,
                firstName: e.target.value,
              })
            }
          />
        </div>
        <div className="user-last-name-form">
          <text className="user-form-header">Nazwisko</text>
          <TextField
            label="Nazwisko"
            variant="filled"
            fullWidth
            value={userBody.lastName}
            InputProps={{
              readOnly: false,
            }}
            onChange={(e) =>
              setUserBody({
                ...userBody,
                lastName: e.target.value,
              })
            }
          />
        </div>
        <div className="user-email-form">
          <text className="user-form-header">Adres email</text>
          <TextField
            label="Adres email"
            variant="filled"
            fullWidth
            value={userBody.email}
            InputProps={{
              readOnly: false,
            }}
            onChange={(e) =>
              setUserBody({
                ...userBody,
                email: e.target.value,
              })
            }
          />
        </div>
        <div className="user-telephone-form">
          <text className="user-form-header">Numer telefonu</text>
          <TextField
            label="Numer telefonu"
            variant="filled"
            fullWidth
            value={userBody.telephone}
            InputProps={{
              readOnly: false,
            }}
            onChange={(e) =>
              setUserBody({
                ...userBody,
                telephone: e.target.value,
              })
            }
          />
        </div>
        <div className="user-login-form">
          <text className="user-form-header">Login</text>
          <TextField
            label="Login"
            variant="filled"
            fullWidth
            value={userBody.login}
            InputProps={{
              readOnly: false,
            }}
            onChange={(e) =>
              setUserBody({
                ...userBody,
                login: e.target.value,
              })
            }
          />
        </div>
        <div className="user-password-form">
          <text className="user-form-header">Hasło</text>
          <TextField
            label="Hasło"
            variant="filled"
            fullWidth
            value={userBody.password}
            InputProps={{
              readOnly: false,
            }}
            onChange={(e) =>
              setUserBody({
                ...userBody,
                password: e.target.value,
              })
            }
          />
        </div>
        <div className="user-password-second-form">
          <text className="user-form-header">Powtórz hasło</text>
          <TextField
            label="Powtórz hasło"
            variant="filled"
            fullWidth
            value={userPasswordCheck}
            InputProps={{
              readOnly: false,
            }}
            onChange={(e) => {
              setUserPasswordCheck(e.target.value);
            }}
          />
        </div>
        <div className="submit-user-button">
          <Icon
            className="return-icon"
            icon="ic:outline-save-as"
            color="#4e4e4e"
            height="21"
          />
          <Button
            sx={{
              color: '#ffffff',
            }}
            onClick={() => {
              if (userPasswordCheck.match(userBody.password)) {
                console.log('hasla sie zgadzaja');
                handleUserFormSubmiting(
                  userBody,
                  isClient ? UserRoles.CLIENT : UserRoles.OPERATOR
                );
              }
              if (handleFormClose) {
                handleFormClose();
              }
            }}
          >
            Zatwierdź
          </Button>
        </div>
      </div>
    </>
  );
}
