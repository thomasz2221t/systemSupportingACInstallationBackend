import React, { useEffect, useState } from 'react';
import { Button } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { Icon } from '@iconify/react';

import { BuildingDetailsForm } from 'components/Forms/BuildingDetails/BuildingDetailsForm';
import Navbar from 'components/Navbar/Navbar';
import Footer from 'components/Footer/Footer';
import UserAccount from 'components/UserAccount/UserAccount';
import BuildingType from 'types/BuildingType';
import BuildingTypeType from 'types/BuildingTypeType';
import BuildingService from 'services/BuildingService';

import './BuildingPage.scss';

const DEFAULT_BUILDING_OBJECT = {
  id: 0,
  name: '',
  imagePath: '',
  street: '',
  postCode: '',
  city: '',
  region: '',
  description: '',
  chatId: 0,
};

const DEFAULT_TYPE_OBJECT = {
  id: 0,
  name: '',
};

export function BuildingPage() {
  const [buildingId, setBuildingId] = useState<number>(0);
  const [buildingBody, setBuildingBody] = useState<BuildingType>(
    DEFAULT_BUILDING_OBJECT
  );
  const [buildingTypeBody, setBuildingTypeBody] =
    useState<BuildingTypeType>(DEFAULT_TYPE_OBJECT);
  const [buildingFormEditState, setBuildingFormEditState] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();

  const handleGettingBuildingsData = async (buildingId: number) => {
    await BuildingService.getBuilding(buildingId).then((response) => {
      console.log(response.data);
      console.log(response.data.content);
      setBuildingBody(response.data);
    });
  };

  const handleGettingBuildingTypeData = async (buildingId: number) => {
    await BuildingService.getFindBuildingType(buildingId).then((response) => {
      console.log(response.data);
      setBuildingTypeBody(response.data);
      return response.data;
    });
  };

  useEffect(() => {
    console.log(id);
    setBuildingId(Number(id));
  }, []); //[id]

  useEffect(() => {
    if (buildingId > 0) {
      handleGettingBuildingsData(buildingId);
      handleGettingBuildingTypeData(buildingId);
    }
  }, [buildingId]);

  const handleRoomButtonClick = () => {
    navigate(`pomieszczenia`);
  };

  const handleEditFormState = () => {
    setBuildingFormEditState(!buildingFormEditState);
    console.log(buildingFormEditState);
    //return buildingFormEditState;
  };

  const getFormState = () => {
    return buildingFormEditState;
  };

  return (
    <>
      <Navbar />
      <UserAccount />
      <div className="building-details">
        <div className="edit-building-button">
          <Icon
            className="return-icon"
            icon="tabler:home-edit"
            color="#4e4e4e"
            height="21"
          />
          <Button
            style={{
              color: '#ffffff',
              /*position: 'relative',
              marginTop: 5,
              marginBottom: 5,
              left: 330,
              width: 200,
              height: 30,
              backgroundColor: '#3298d1',
              color: '#ffffff',
              borderRadius: 18,
              padding: '18px 36px',
              fontSize: '16px',
              fontFamily: 'Segoe UI',
              fontStyle: 'normal',
              borderStyle: 'solid',
              borderWidth: 1,
              borderColor: '#000000',*/
            }}
            onClick={() => {
              handleEditFormState();
            }}
          >
            Edytuj obiekt
          </Button>
        </div>
        <BuildingDetailsForm
          id={buildingBody.id}
          name={buildingBody.name}
          typeName={buildingTypeBody.name}
          street={buildingBody.street}
          postCode={buildingBody.postCode}
          city={buildingBody.city}
          region={buildingBody.region}
          description={buildingBody.description}
          chatId={buildingBody.chatId}
          //isEditable={handleEditFormState}
          mustCreate={false}
          userId={0}
          isEditable={getFormState}
          refreshParentData={handleGettingBuildingsData}
          //isEditable={buildingFormEditState}
        />
        <Button
          style={{
            position: 'relative',
            marginTop: 32,
            left: -82,
            width: 1064,
            height: 53,
            backgroundColor: '#D6E900',
            color: '#ffffff',
            borderRadius: 18,
            padding: '18px 36px',
            fontSize: '18px',
            fontFamily: 'Segoe UI',
            fontStyle: 'normal',
            fontWeight: 500,
            lineHeight: 24,
          }}
          variant="contained"
          onClick={handleRoomButtonClick}
        >
          Zarządzaj pomieszczeniami
        </Button>
      </div>
      <Footer />
    </>
  );
}
