import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@mui/material';
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

export function RoomPage() {
  const [roomPage, setRoomPage] = useState<RoomType[]>([]);
  const [roomType, setRoomType] = useState<RoomTypeType>(ROOM_TYPE_DEFAULT);
  const { id } = useParams();
  const navigate = useNavigate();

  const handleReturnButtonClick = () => {
    navigate(`/obiekty/obiekt/${Number(id)}`);
  };

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

  const handleGettingRoomTypeData = async (roomId: number, room: RoomType) => {
    await RoomService.getFindRoomType(roomId).then((response) => {
      console.log(response.data);
      setRoomType(response.data);
      room.roomTypeName = response.data.name;
      return response.data;
    });
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
      {roomPage.map((data) => (
        <div className="room-details">
          <RoomDetailsForm
            id={data.id}
            name={data.name}
            purpose={data.roomTypeName}
            areaX={data.areaWidth}
            areaY={data.areaHeight}
            height={data.height}
            energyGiveOut={data.energyGivenOut}
            numberOfPeople={data.peopleNumber}
            additionalInfo={data.description}
          />
        </div>
      ))}
      <Footer />
    </>
  );
}
