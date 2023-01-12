import React from 'react';

import { UserDetailsForm } from 'components/Forms/UserDetailsForm/UserDetailsForm';

import './ClientCreateAccountPage.scss';

export function ClientCreateAccountPage() {
  const logoImg = require('../../images/logoImg.png');

  return (
    <>
      <div className="login-background">
        <div className="white-polygon" />
        <div className="red-polygon" />
        <div className="company-symbols">
          <p className="logo-company">Silent Air Industries</p>
          <img src={logoImg} width="84" height="84" className="login-logo" />
        </div>
        <div className="register-component">
          <UserDetailsForm
            id={0}
            login={''}
            password={''}
            firstName={''}
            lastName={''}
            email={''}
            telephone={''}
            mustCreate={true}
            isClient={true}
          />
        </div>
      </div>
    </>
  );
}
