import React, { useEffect, useState } from 'react';
import { Button, Dialog, DialogContent, TablePagination } from '@mui/material';
import { Icon } from '@iconify/react';

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
  const [userId, setUserId] = useState<number>(0);
  const [openBuildingForm, setOpenBuildingForm] = useState<boolean>(false);
  const [pageNumber, setPageNumber] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);
  const [RowsPerPageOption] = useState([1, 2, 5, 10, 15]);

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPageNumber(0);
  };

  const handleGetingUserBuildings = async (userId: number) => {
    await BuildingService.getUserBuildings(userId).then((response) => {
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
  }, [userId]);

  const buildingsTable = userBuildings
    .sort((a, b) => a.id - b.id)
    .slice(pageNumber * rowsPerPage, pageNumber * rowsPerPage + rowsPerPage)
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
        <Icon
          className="return-icon"
          icon="material-symbols:add-home"
          color="#4e4e4e"
          height="21"
        />
        <Button
          sx={{
            color: '#ffffff',
          }}
          onClick={handleClickOpen}
        >
          Dodaj Budynek
        </Button>
      </div>
      <div className="buildings">
        {buildingsTable}
        <TablePagination
          component="div"
          count={userBuildings.length}
          page={pageNumber}
          rowsPerPageOptions={RowsPerPageOption}
          onPageChange={(_, newPage) => setPageNumber(newPage)}
          onRowsPerPageChange={handleChangeRowsPerPage}
          rowsPerPage={rowsPerPage}
          labelRowsPerPage={'Liczba elementów na stronie:'}
        />
      </div>
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
            typeName={''}
            street={''}
            postCode={''}
            city={''}
            region={''}
            description={''}
            chatId={0}
            userId={userId}
            mustCreate={true}
            isEditable={() => {
              return false;
            }}
            handleFormClose={handleClose}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}
