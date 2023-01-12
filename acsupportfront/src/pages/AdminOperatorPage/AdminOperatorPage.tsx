import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@mui/material';
import { Icon } from '@iconify/react';

import { UserDetailsForm } from 'components/Forms/UserDetailsForm/UserDetailsForm';
import { UserType } from 'types/UserType';
import UserService from 'services/UserService';
import Footer from 'components/Footer/Footer';
import UserAccount from 'components/UserAccount/UserAccount';
import Navbar from 'components/Navbar/Navbar';

import './AdminOperatorPage.scss';

export function AdminOperatorPage() {
  const [userData, setUserData] = useState<UserType>({
    id: 0,
    login: '',
    password: '',
    firstName: '',
    lastName: '',
    email: '',
    telephone: '',
  });
  const { id } = useParams();
  const navigate = useNavigate();

  const handleReturnButtonClick = () => {
    navigate(`/admin/operator/`);
  };

  const handleGettingUserData = async (userId: number) => {
    return await UserService.getUserBody(userId).then((response) => {
      setUserData(response.data);
    });
  };

  useEffect(() => {
    handleGettingUserData(Number(id));
  }, [id]);

  console.log(userData);

  return (
    <>
      <UserAccount />
      <Navbar />
      <div className="return-link-wrapper">
        <Icon
          className="return-icon"
          icon="mdi:close-circle-outline"
          color="#4e4e4e"
          height="21"
        />
        <Button
          sx={{
            color: '#ffffff',
          }}
          onClick={handleReturnButtonClick}
        >
          Powrót
        </Button>
      </div>
      <div id="user-formula">
        <UserDetailsForm
          id={userData.id}
          login={userData.login}
          password={userData.password}
          firstName={userData.firstName}
          lastName={userData.lastName}
          email={userData.email}
          telephone={userData.telephone}
          mustCreate={false}
          isClient={false}
        />
      </div>
      <Footer />
    </>
  );
}
