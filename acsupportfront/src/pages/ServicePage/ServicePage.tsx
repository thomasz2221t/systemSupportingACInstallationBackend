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
import OfferDetailsForm from 'components/Forms/OfferDetailsForm/OfferDetailsForm';
import ServiceType from 'types/ServiceType';

import './ServicePage.scss';

export function ServicePage() {
  const [userId, setUserId] = useState<number>(0);
  const [userBuildings, setUserBuildings] = useState<BuildingType[]>([]);
  //const [servicePage, setServicePage] = useState<ServiceType[]>([]);
  const flatProps = {
    options: userBuildings.map((option) => ({
      label:
        option.name +
        ', ' +
        option.street +
        ' ' +
        option.city +
        ', ' +
        option.postCode +
        ', ' +
        option.region,
      id: option.id,
    })),
  };
  const [chosenBuilding, setChosenBuilding] = useState<any>('');
  const [chosenBuildingId, setChosenBuildingId] = useState<number>(0);

  const handleGetingUserBuildings = async (userId: number) => {
    await BuildingService.getUserBuildings(userId).then((response) => {
      console.log(response.data);
      console.log(response.data.content);
      setUserBuildings(response.data.content);
      setChosenBuilding({
        label:
          response.data.content[0].name +
          ', ' +
          response.data.content[0].street +
          ' ' +
          response.data.content[0].city +
          ', ' +
          response.data.content[0].postCode +
          ', ' +
          response.data.content[0].region,
        id: response.data.content[0].id,
      });
      setChosenBuildingId(response.data.content[0].id);
      console.log(chosenBuildingId);
    });
  };

  //const handleGettingServices = async ()

  useEffect(() => {
    setUserId(AuthService.getCurrentUserId());
  }, []);

  useEffect(() => {
    handleGetingUserBuildings(userId);
  }, [userId]);

  console.log(chosenBuilding);
  return (
    <>
      <Navbar />
      <UserAccount />
      <div id="building-autocomplete">
        <text id="choose-building-header">Wybierz budynek:</text>
        <Autocomplete
          {...flatProps}
          autoComplete
          disablePortal
          autoHighlight
          id="combo-box-demo"
          sx={{ width: 1000 }}
          value={chosenBuilding}
          onChange={(event, newValue) => {
            setChosenBuilding(newValue);
            setChosenBuildingId(newValue.id);
            console.log(newValue);
            console.log(newValue.id);
          }}
          renderInput={(params) => <TextField {...params} label="Buildings" />}
        />
      </div>
      <text id="service-details-header">Dane dotyczące usługi:</text>
      <div id="service-details-component">
        <ServiceDetailsForm
          id={0}
          date={new Date()}
          serviceId={0}
          serviceTypeName={''}
          buildingId={0}
          roomId={0}
          roomName={''}
          description={''}
          mustCreate={false}
          handleFormClose={() => {
            return false;
          }}
        />
      </div>
      <div id="chat-component">
        <Chat buildingId={chosenBuildingId} userId={userId} />
      </div>
      <div id="offer-details-component">
        <OfferDetailsForm />
      </div>
      <Footer />
    </>
  );
}
