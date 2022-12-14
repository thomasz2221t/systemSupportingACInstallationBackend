import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Dialog, DialogContent } from '@mui/material';
import { Icon } from '@iconify/react';

import { RoomDetailsForm } from 'components/Forms/RoomDetailsForm/RoomDetailsForm';
import Footer from 'components/Footer/Footer';
import Navbar from 'components/Navbar/Navbar';
import UserAccount from 'components/UserAccount/UserAccount';
import BuildingService from 'services/BuildingService';
import RoomType from 'types/RoomType';
import RoomService from 'services/RoomService';
import RoomTypeType from 'types/RoomTypeType';

import './RoomPage.scss';

const ROOM_TYPE_DEFAULT = {
  id: 0,
  name: '',
};

export type RoomTypeWithName = {
  id: number;
  name: string;
  areaWidth: number;
  areaHeight: number;
  height: number;
  energyGivenOut: number;
  peopleNumber: number;
  description: string;
  roomTypeName: string;
};

export function RoomPage() {
  const [roomBuildingId, setRoomBuildingId] = useState<number>(0);
  const [roomPage, setRoomPage] = useState<RoomTypeWithName[]>([]);
  const [roomType, setRoomType] = useState<RoomTypeType>(ROOM_TYPE_DEFAULT);
  const [roomFormOpen, setRoomFormOpen] = useState<boolean>(false);
  //const [isRoomFormEditable, setIsRoomFormEditable] = useState<boolean>(true);
  const { id } = useParams();
  const navigate = useNavigate();

  const handleReturnButtonClick = () => {
    navigate(`/obiekty/obiekt/${Number(id)}`);
  };

  useEffect(() => {
    setRoomBuildingId(Number(id));
  }, []);

  const handleGettingAllBuildingsRoomsData = async (buildingId: number) => {
    await BuildingService.getFindAllBuildingsRooms(buildingId).then(
      (response) => {
        console.log(response.data.content);
        /*for (const parameter of getData.data) {
          const parameterType = await parameterService.parameterTypeGet(parameter);
          parameter.title = parameterType.data.title;
        }*/
        for (const room of response.data.content) {
          handleGettingRoomTypeData(room.id, room);
        }
        console.log(response.data.content);
        setRoomPage(response.data.content);
        return response.data.content;
      }
    );
  };

  const handleGettingRoomTypeData = async (
    roomId: number,
    room: RoomTypeWithName
  ) => {
    await RoomService.getFindRoomType(roomId).then((response) => {
      console.log(response.data);
      setRoomType(response.data);
      room.roomTypeName = response.data.name;
      return response.data;
    });
  };

  const handleClickOpen = () => {
    setRoomFormOpen(true);
  };

  const handleClose = () => {
    setRoomFormOpen(false);
  };

  useEffect(() => {
    handleGettingAllBuildingsRoomsData(Number(id));
  }, [id]);

  return (
    <>
      <Navbar />
      <UserAccount />
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
      <div className="add-room-button">
        <Icon
          className="return-icon"
          icon="material-symbols:meeting-room-outline"
          color="#4e4e4e"
          height="21"
        />
        <Button
          sx={{
            color: '#ffffff',
          }}
          onClick={handleClickOpen}
        >
          Dodaj pomieszczenie
        </Button>
      </div>
      {roomPage.map((data) => (
        <div id={`${data.id}`} className="room-details">
          <RoomDetailsForm
            id={data.id}
            name={data.name}
            purpose={data.roomTypeName}
            areaX={data.areaWidth}
            areaY={data.areaHeight}
            height={data.height}
            energyGiveOut={data.energyGivenOut}
            numberOfPeople={data.peopleNumber}
            description={data.description}
            buildingId={0}
            mustCreate={false}
            //isEditable={() => {
            //return isRoomFormEditable;
            //  return false;
            //}}
            //refreshParentData={()}
          />
        </div>
      ))}
      <Footer />
      <Dialog
        sx={{
          width: '1200px',
          height: '612px',
          alignItems: 'center',
          marginLeft: '193px',
          marginTop: '20px',
        }}
        open={roomFormOpen}
        onClose={handleClose}
        fullWidth
        maxWidth="lg"
      >
        <DialogContent
          sx={{
            padding: '0',
            backgroundColor: '#d6e900',
            alignItems: 'center',
          }}
        >
          <RoomDetailsForm
            id={0}
            name={''}
            purpose={''}
            areaX={0}
            areaY={0}
            height={0}
            energyGiveOut={0}
            numberOfPeople={0}
            description={''}
            buildingId={roomBuildingId}
            mustCreate={true}
            //isEditable={() => {
            //  return true;
            //}}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}
