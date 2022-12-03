import React, { useEffect, useState } from 'react';
import { Button, Dialog, DialogContent, DialogActions } from '@mui/material';

import { BuildingDetailsForm } from 'components/Forms/BuildingDetails/BuildingDetailsForm';
import Navbar from 'components/Navbar/Navbar';
import Footer from 'components/Footer/Footer';
import BuildingTile from 'components/BuildingTile/BuildingTile';
import UserAccount from 'components/UserAccount/UserAccount';
import AuthService from 'services/auth/AuthService';
import BuildingType from 'types/BuildingType';
import BuildingService from 'services/BuildingService';

import './BuildingsPage.scss';

export function BuildingsPage() {
  const [userBuildings, setUserBuildings] = useState<BuildingType[]>([]);
  const [userId, setUserId] = useState<number>();
  const [openBuildingForm, setOpenBuildingForm] = useState<boolean>(false);

  const handleGetingUserBuildings = async (userId: number) => {
    await BuildingService.getUserBuildings(userId).then((response) => {
      console.log(response.data);
      console.log(response.data.content);
      setUserBuildings(response.data.content);
    });
  };

  const handleClickOpen = () => {
    setOpenBuildingForm(true);
  };

  const handleClose = () => {
    setOpenBuildingForm(false);
  };

  useEffect(() => {
    setUserId(AuthService.getCurrentUserId());
  }, []);

  useEffect(() => {
    handleGetingUserBuildings(userId!);
    const interval = setInterval(() => {
      handleGetingUserBuildings(userId!);
    }, 10000);
    return () => clearInterval(interval);
  }, [userId]);

  const buildingsTable = userBuildings
    .sort((a, b) => a.id - b.id)
    //.slice(page * elementsPerPage, page * elementsPerPage + elementsPerPage)
    .map((data) => {
      return (
        <BuildingTile
          id={data.id}
          name={data.name}
          city={data.city}
          street={data.street}
        />
      );
    });

  return (
    <>
      <Navbar />
      <UserAccount />
      <div className="add-building-button">
        <Button
          sx={{
            color: '#ffffff',
          }}
          onClick={handleClickOpen}
        >
          Dodaj Budynek
        </Button>
      </div>
      <div className="buildings">{buildingsTable}</div>
      <Footer />
      <Dialog
        sx={{
          width: '1117px',
          height: '612px',
          alignItems: 'center',
          marginLeft: '193px',
          marginTop: '20px',
        }}
        open={openBuildingForm}
        onClose={handleClose}
        fullWidth
        maxWidth="lg"
      >
        <DialogContent
          sx={{
            padding: '0',
            backgroundColor: '#3298d1',
            alignItems: 'center',
          }}
        >
          <BuildingDetailsForm
            id={0}
            name={''}
            typeId={0}
            typeName={''}
            street={''}
            postCode={''}
            city={''}
            region={''}
            additionalInfo={''}
          />
        </DialogContent>
        {/*<DialogActions>
          <Button onClick={handleClose}>Zapisz</Button>
        </DialogActions>*/}
      </Dialog>
    </>
  );
}
