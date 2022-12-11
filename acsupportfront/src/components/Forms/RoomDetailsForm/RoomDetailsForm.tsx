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

import './RoomDetailsForm.scss';

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
  //refreshParentData?: (buildingId: number) => void;
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
}: //isEditable,
//refreshParentData,
roomDetailsFormProp) {
  const [roomTypeId, setRoomTypeId] = useState<number>(0);
  const [roomTypePage, setRoomTypePage] = useState<RoomTypeType[]>([]);
  const [isRoomFormEditable, setIsRoomFormEditable] = useState<boolean>(true);

  const handleGettingAllRoomTypes = async () => {
    await RoomTypeService.getFindAllRooms().then((response) => {
      setRoomTypePage(response.data.content);
    });
  };

  useEffect(() => {
    handleGettingAllRoomTypes();
  }, []);

  const onChange = (event: SelectChangeEvent<number>) => {
    setRoomTypeId(Number(event.target.value));
  };

  return isRoomFormEditable === false ? (
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
            value={name}
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
            value={areaX}
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
            value={areaY}
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
            value={height}
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
            value={energyGiveOut}
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
            value={numberOfPeople}
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
            value={description}
            InputProps={{
              readOnly: true,
            }}
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
              //zapis
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
            value={name}
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
            value={areaX}
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
            value={areaY}
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
            value={height}
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
            value={energyGiveOut}
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
            value={numberOfPeople}
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
            value={description}
            InputProps={{
              readOnly: true,
            }}
          />
        </div>
      </div>
    </>
  );
}
