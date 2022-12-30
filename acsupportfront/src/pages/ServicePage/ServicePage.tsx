import React, { useEffect, useState } from 'react';
import { Autocomplete, TextField } from '@mui/material';

import Navbar from 'components/Navbar/Navbar';
import Footer from 'components/Footer/Footer';
import Chat from 'components/Chat/Chat';
import ServiceDetailsForm from 'components/Forms/ServiceDetailsForm/ServiceDetialsForm';
import UserAccount from 'components/UserAccount/UserAccount';
import BuildingService from 'services/BuildingService';
import BuildingType from 'types/BuildingType';
import AuthService from 'services/auth/AuthService';
import { buildIcon } from '@iconify/react';

export function ServicePage() {
  const [userId, setUserId] = useState<number>(0);
  const [userBuildings, setUserBuildings] = useState<BuildingType[]>([]);

  const handleGetingUserBuildings = async (userId: number) => {
    await BuildingService.getUserBuildings(userId).then((response) => {
      console.log(response.data);
      console.log(response.data.content);
      setUserBuildings(response.data.content);
    });
  };

  const flatProps = {
    options: userBuildings.map(
      (option) => option.name + ' ' + option.street + ' ' + option.city
    ),
  };

  useEffect(() => {
    setUserId(AuthService.getCurrentUserId());
  }, []);

  useEffect(() => {
    handleGetingUserBuildings(userId);
  }, [userId]);

  return (
    <>
      <Navbar />
      <UserAccount />
      <div id="building-autocomplete">
        <text choose-building-header>Wybierz budynek:</text>
        <Autocomplete
          {...flatProps}
          disablePortal
          autoHighlight
          id="combo-box-demo"
          sx={{ width: 300 }}
          renderInput={(params) => <TextField {...params} label="Buildings" />}
        />
      </div>
      <ServiceDetailsForm
        id={0}
        date={[]}
        serviceId={0}
        buildingId={0}
        roomId={0}
        description={''}
        isEditable={() => {
          return false;
        }}
      />
      <Chat chatIdentifiaction={1} />
      <Footer />
    </>
  );
}
