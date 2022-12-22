import React, { useEffect, useState } from 'react';
import {
  Button,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from '@mui/material';
import { Icon } from '@iconify/react';

import RoomTypeType from 'types/RoomTypeType';
import RoomTypeService from 'services/RoomTypeService';
import RoomType from 'types/RoomType';
import RoomService from 'services/RoomService';

import './RoomDetailsForm.scss';
import BuildingService from 'services/BuildingService';

export type roomDetailsFormProp = {
  id: number;
  name: string;
  purpose: string;
  areaX: number;
  areaY: number;
  height: number;
  energyGiveOut: number;
  numberOfPeople: number;
  description: string;
  buildingId: number;
  mustCreate: boolean;
  //isEditable: () => boolean;
  refreshParentData?: (buildingId: number) => void;
  handleFormClose?: () => void;
};

export function RoomDetailsForm({
  id,
  name,
  purpose,
  areaX,
  areaY,
  height,
  energyGiveOut,
  numberOfPeople,
  description,
  buildingId,
  mustCreate,
  refreshParentData,
  handleFormClose,
}: //isEditable,
//refreshParentData,
roomDetailsFormProp) {
  const [data, setData] = useState<RoomType>({
    id: id,
    name: name,
    areaWidth: areaX,
    areaHeight: areaY,
    height: height,
    energyGivenOut: energyGiveOut,
    peopleNumber: numberOfPeople,
    description: description,
  });
  const [roomTypeId, setRoomTypeId] = useState<number>(0);
  const [roomTypePage, setRoomTypePage] = useState<RoomTypeType[]>([]);
  const [isRoomFormEditable, setIsRoomFormEditable] = useState<boolean>(
    !mustCreate
  );
  const [isRequestSent, setIsRequestSent] = useState<boolean>(false);
  let isError = false;

  const handleGettingAllRoomTypes = async () => {
    await RoomTypeService.getFindAllRooms().then((response) => {
      setRoomTypePage(response.data.content);
    });
  };

  const handleAssigningRoomTypeToBody = async (
    roomId: number,
    roomTypeId: number
  ) => {
    return await RoomService.patchAssignTypeToRoom(roomId, roomTypeId);
  };

  const handleAssigningBuildingToRoom = async (
    buildingId: number,
    roomId: number
  ) => {
    return await BuildingService.patchAssignRoomToBuilding(buildingId, roomId);
  };

  const handleCreatingRoomBody = async (
    roomBody: RoomType,
    roomTypeId: number,
    buildingId: number
  ) => {
    await RoomService.postCreateRoom(roomBody)
      .then((response) => {
        handleAssigningRoomTypeToBody(response.data, roomTypeId)
          .then(() => {
            console.log(response.data);
            handleAssigningBuildingToRoom(buildingId, response.data).then(
              () => {
                setIsRequestSent(true);
              }
            );
          })
          .catch((error) => console.log(error));
        return response.data;
      })
      .catch((error) => console.log(error));
    //handleAssigningRoomTypeToBody(roomId, roomTypeId);
    //handleAssigningBuildingToRoom(buildingId, roomId);
    //await BuildingService.patchAssignRoomToBuilding(buildingId, roomId);
    //return roomId;
  };

  const handleUpdatingRoomBody = async (
    roomBody: RoomType,
    roomTypeId: number
  ) => {
    await RoomService.patchUpdateRoom(roomBody.id, roomBody).then(() => {
      handleAssigningRoomTypeToBody(roomBody.id, roomTypeId);
    });
  };

  const handleRoomFormSubmiting = (
    roomBody: RoomType,
    roomTypeId: number,
    buildingId: number
  ) => {
    mustCreate === true
      ? handleCreatingRoomBody(roomBody, roomTypeId, buildingId)
      : handleUpdatingRoomBody(roomBody, roomTypeId);
  };

  const validate = () => {
    if (data.areaWidth === 0 || data.areaHeight === 0 || data.height === 0) {
      isError = true;
    } else {
      isError = false;
    }
  };

  useEffect(() => {
    handleGettingAllRoomTypes();
  }, []);

  useEffect(() => {
    if (refreshParentData) {
      refreshParentData(buildingId);
    }
  }, [isRequestSent]);

  const onChange = (event: SelectChangeEvent<number>) => {
    setRoomTypeId(Number(event.target.value));
  };

  return isRoomFormEditable === false ? (
    <>
      <div className="room-details-form">
        {mustCreate === false ? (
          <div className="edit-room-button">
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
                setIsRoomFormEditable(!isRoomFormEditable);
              }}
            >
              Edytuj pomieszczenie
            </Button>
          </div>
        ) : null}
        <div className="room-name">
          <text>Nazwa pomieszczenia</text>
          <TextField
            label="Nazwa pomieszczenia"
            variant="filled"
            size="small"
            fullWidth
            value={data.name}
            InputProps={{
              readOnly: false,
            }}
            onChange={(e) =>
              setData({
                ...data,
                name: e.target.value,
              })
            }
          />
        </div>
        <div className="room-purpose">
          <text>Przeznaczenie pomieszczenia</text>
          <Select
            label="Przeznaczenie pomieszczenia"
            size="small"
            displayEmpty
            value={roomTypeId}
            inputProps={{ readOnly: false }}
            onChange={onChange}
          >
            <MenuItem value={0}>{purpose}</MenuItem>
            {roomTypePage.map((data, id) => (
              <MenuItem key={data.id} value={data.id}>
                {data.name}
              </MenuItem>
            ))}
          </Select>
        </div>
        <div className="room-area-x">
          <text>Długość pomieszczenia *</text>
          <TextField
            label="Długość pomieszczenia"
            variant="filled"
            size="small"
            fullWidth
            value={data.areaWidth}
            InputProps={{
              readOnly: false,
            }}
            required
            error={data.areaWidth === 0 ? true : false}
            onChange={(e) =>
              setData({
                ...data,
                areaWidth: Number(e.target.value),
              })
            }
          />
        </div>
        <div className="room-area-y">
          <text>Szerokość pomieszczenia *</text>
          <TextField
            label="Szerokość pomieszczenia"
            variant="filled"
            size="small"
            fullWidth
            value={data.areaHeight}
            InputProps={{
              readOnly: false,
            }}
            required
            error={data.areaHeight === 0 ? true : false}
            onChange={(e) =>
              setData({
                ...data,
                areaHeight: Number(e.target.value),
              })
            }
          />
        </div>
        <div className="room-height">
          <text>Wysokość pomieszczenia *</text>
          <TextField
            label="Wysokość pomieszczenia"
            variant="filled"
            size="small"
            fullWidth
            value={data.height}
            InputProps={{
              readOnly: false,
            }}
            required
            error={data.height === 0 ? true : false}
            onChange={(e) =>
              setData({
                ...data,
                height: Number(e.target.value),
              })
            }
          />
        </div>
        <div className="room-power-giveout">
          <text>Moc wydzielana w pomieszczeniu</text>
          <TextField
            label="Moc wydzielana w pomieszczeniu"
            variant="filled"
            size="small"
            fullWidth
            value={data.energyGivenOut}
            InputProps={{
              readOnly: false,
            }}
            onChange={(e) =>
              setData({
                ...data,
                energyGivenOut: Number(e.target.value),
              })
            }
          />
        </div>
        <div className="room-people-number">
          <text>Ilość osób przebywająca w pomieszczeniu</text>
          <TextField
            label="Ilość osób przebywająca w pomieszczeniu"
            variant="filled"
            size="small"
            fullWidth
            value={data.peopleNumber}
            InputProps={{
              readOnly: false,
            }}
            onChange={(e) =>
              setData({
                ...data,
                peopleNumber: Number(e.target.value),
              })
            }
          />
        </div>
        <div className="room-additional-info">
          <text>Dodatkowe informacje</text>
          <TextField
            label="Dodatkowe informacje"
            variant="filled"
            size="small"
            fullWidth
            value={data.description}
            InputProps={{
              readOnly: false,
            }}
            onChange={(e) =>
              setData({
                ...data,
                description: e.target.value,
              })
            }
          />
        </div>
        <div className="submit-room-button">
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
              validate();
              if (isError === false) {
                handleRoomFormSubmiting(data, roomTypeId, buildingId);
                if (handleFormClose) {
                  handleFormClose();
                }
              } else {
                console.log('Validation error');
              }
            }}
          >
            Zatwierdź
          </Button>
        </div>
      </div>
    </>
  ) : (
    <>
      <div className="room-details-form">
        <div className="edit-room-button">
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
              setIsRoomFormEditable(!isRoomFormEditable);
            }}
          >
            Edytuj pomieszczenie
          </Button>
        </div>
        <div className="room-name">
          <text>Nazwa pomieszczenia</text>
          <TextField
            label="Nazwa pomieszczenia"
            variant="filled"
            size="small"
            fullWidth
            value={data.name}
            InputProps={{
              readOnly: true,
            }}
          />
        </div>
        <div className="room-purpose">
          <text>Przeznaczenie pomieszczenia</text>
          <Select
            label="Przeznaczenie pomieszczenia"
            size="small"
            displayEmpty
            value={roomTypeId}
            inputProps={{ readOnly: true }}
            onChange={onChange}
          >
            <MenuItem value={0}>{purpose}</MenuItem>
            {roomTypePage.map((data, id) => (
              <MenuItem key={data.id} value={data.id}>
                {data.name}
              </MenuItem>
            ))}
          </Select>
          {/*<TextField
            label="Przeznaczenie pomieszczenia"
            variant="filled"
            size="small"
            fullWidth
            value={purpose}
            InputProps={{
              readOnly: true,
            }}
          />*/}
        </div>
        <div className="room-area-x">
          <text>Długość pomieszczenia</text>
          <TextField
            label="Długość pomieszczenia"
            variant="filled"
            size="small"
            fullWidth
            value={data.areaWidth}
            InputProps={{
              readOnly: true,
            }}
          />
        </div>
        <div className="room-area-y">
          <text>Szerokość pomieszczenia</text>
          <TextField
            label="Szerokość pomieszczenia"
            variant="filled"
            size="small"
            fullWidth
            value={data.areaHeight}
            InputProps={{
              readOnly: true,
            }}
          />
        </div>
        <div className="room-height">
          <text>Wysokość pomieszczenia</text>
          <TextField
            label="Wysokość pomieszczenia"
            variant="filled"
            size="small"
            fullWidth
            value={data.height}
            InputProps={{
              readOnly: true,
            }}
          />
        </div>
        <div className="room-power-giveout">
          <text>Moc wydzielana w pomieszczeniu</text>
          <TextField
            label="Moc wydzielana w pomieszczeniu"
            variant="filled"
            size="small"
            fullWidth
            value={data.energyGivenOut}
            InputProps={{
              readOnly: true,
            }}
          />
        </div>
        <div className="room-people-number">
          <text>Ilość osób przebywająca w pomieszczeniu</text>
          <TextField
            label="Ilość osób przebywająca w pomieszczeniu"
            variant="filled"
            size="small"
            fullWidth
            value={data.peopleNumber}
            InputProps={{
              readOnly: true,
            }}
          />
        </div>
        <div className="room-additional-info">
          <text>Dodatkowe informacje</text>
          <TextField
            label="Dodatkowe informacje"
            variant="filled"
            size="small"
            fullWidth
            value={data.description}
            InputProps={{
              readOnly: true,
            }}
          />
        </div>
      </div>
    </>
  );
}
