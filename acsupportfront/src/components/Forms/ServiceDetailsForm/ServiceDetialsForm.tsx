import React, { useEffect, useState } from 'react';
import {
  Button,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from '@mui/material';
import { Icon } from '@iconify/react';

import BuildingService from 'services/BuildingService';
import ServiceTypeService from 'services/ServiceTypeService';
import ServiceService from 'services/ServiceService';
import RoomType from 'types/RoomType';
import ServiceType from 'types/ServiceType';
import ServiceTypeType from 'types/ServiceTypeType';

import './ServiceDetailsForm.scss';

export type ServiceDetailsFormPropType = {
  id: number;
  date: string;
  buildingId: number;
  description: string;
  mustCreate: boolean;
  refreshParentData?: (buildingId: number) => void;
  handleFormClose?: () => void;
};

export default function ServiceDetailsForm({
  id,
  date,
  buildingId,
  description,
  mustCreate,
  refreshParentData,
  handleFormClose,
}: ServiceDetailsFormPropType) {
  let today = new Date();
  let defaultDate =
    today.getFullYear() +
    '-' +
    String(today.getMonth() + 1).padStart(2, '0') +
    '-' +
    String(today.getDate()).padStart(2, '0') +
    'T' +
    String(today.getHours()).padStart(2, '0') +
    ':' +
    String(today.getMinutes()).padStart(2, '0');
  const [data, setData] = useState<ServiceType>({
    id: id,
    date: date === '' ? defaultDate : date,
    description: description,
  });
  const [isServiceFormEditable, setIsServiceFormEditable] = useState<boolean>(
    !mustCreate
  );
  const [buildingIdNumber] = useState<number>(buildingId);
  const [serviceTypeId, setServiceTypeId] = useState<number>(id);
  const [serviceTypeBody, setServiceTypeBody] = useState<ServiceTypeType>({
    id: 0,
    name: '',
  });
  const [roomBody, setRoomBody] = useState<RoomType>({
    id: 0,
    name: '',
    areaWidth: 0,
    areaHeight: 0,
    height: 0,
    energyGivenOut: 0,
    peopleNumber: 0,
    description: '',
  });
  const [roomPage, setRoomPage] = useState<RoomType[]>([]);
  const [serviceTypesPage, setServiceTypePage] = useState<ServiceTypeType[]>(
    []
  );

  const handleFindingAllRoomsAssignedToBuilding = async (
    buildingId: number
  ) => {
    await BuildingService.getFindAllBuildingsRooms(buildingId).then(
      (response) => {
        console.log(response.data.content);
        setRoomPage(response.data.content);
      }
    );
  };

  const handleFindingServiceTypes = async () => {
    await ServiceTypeService.getFindAllServiceTypes().then((response) => {
      console.log(response.data.content);
      setServiceTypePage(response.data.content);
    });
  };

  const handleGettingServiceDetails = async (serviceId: number) => {
    await ServiceService.getFindServiceType(serviceId).then((response) => {
      console.log(response.data);
      setServiceTypeBody(response.data);
      handleGettingRoomDetails(serviceId);
    });
  };

  const handleGettingRoomDetails = async (serviceId: number) => {
    await ServiceService.getFindServiceRoom(serviceId).then((response) => {
      console.log(response.data);
      setRoomBody(response.data);
    });
  };

  const handleAssigningServiceTypeToService = async () => {};

  const handleAssigningRoomToService = async () => {};

  const handleCreatingServiceBody = async () => {};

  const handleUpdatingServiceBody = async () => {};

  const handleServiceFormSubmiting = (
    serviceBody: ServiceType,
    serviceTypeId: number,
    roomId: number
  ) => {
    //mustCreate === true
    //  ? handleCreatingServiceBody(roomBody, roomTypeId, buildingId)
    //  : handleUpdatingServiceBody(roomBody, roomTypeId);
  };

  const onChangeServiceType = (event: SelectChangeEvent<number>) => {
    setServiceTypeId(Number(event.target.value));
  };

  const onChangeRoom = (event: SelectChangeEvent<number>) => {
    setRoomBody({ ...roomBody, id: Number(event.target.value) });
  };

  useEffect(() => {
    handleFindingAllRoomsAssignedToBuilding(buildingIdNumber);
    handleFindingServiceTypes();
  }, []);

  useEffect(() => {
    handleGettingServiceDetails(id);
    handleGettingRoomDetails(id);
  }, [serviceTypeId]); //serviceTypeId

  console.log(data.date);

  return isServiceFormEditable === true ? (
    <>
      <div className="service-details-form">
        {mustCreate === false ? (
          <div className="edit-service-button">
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
                setIsServiceFormEditable(!isServiceFormEditable);
              }}
            >
              Edytuj zamówienie
            </Button>
          </div>
        ) : null}
        <div className="service-pick-form">
          <text className="service-form-header">Wybierz usługę</text>
          <Select
            id="pick-service-select"
            label="Wybierz Usługę"
            size="small"
            displayEmpty
            value={serviceTypeId}
            inputProps={{ readOnly: true }}
            onChange={onChangeServiceType}
          >
            <MenuItem value={0}>{serviceTypeBody.name}</MenuItem>
            {serviceTypesPage.map((data, id) => (
              <MenuItem key={data.id} value={data.id}>
                {data.name}
              </MenuItem>
            ))}
          </Select>
        </div>
        <div className="room-pick-form">
          <text className="service-form-header">Wybierz pomieszczenie</text>
          <Select
            id="pick-room-select"
            label="Wybierz pomieszczenie"
            size="small"
            displayEmpty
            value={roomBody.id}
            inputProps={{ readOnly: true }}
            onChange={onChangeRoom}
          >
            <MenuItem value={0}>{roomBody.name}</MenuItem>
            {roomPage.map((data, id) => (
              <MenuItem key={data.id} value={data.id}>
                {data.name}
              </MenuItem>
            ))}
          </Select>
        </div>
        <div className="date-pick-form">
          <text className="service-form-header">Wybierz termin instalacji</text>
          <TextField
            id="datetime-select"
            label="Wybierz termin instalacji"
            type="datetime-local"
            //defaultValue="2022-12-31T12:30"
            value={data.date}
            defaultValue={defaultDate}
            //sx={{ width: 250 }}
            InputLabelProps={
              {
                //shrink: true,
              }
            }
            inputProps={{ readOnly: true }}
          />
        </div>
        <div className="description-service-form">
          <text className="service-form-header">Opis usługi</text>
          <TextField
            label="Opis usługi"
            variant="filled"
            fullWidth
            value={data.description}
            InputProps={{
              readOnly: true,
            }}
          />
        </div>
      </div>
    </>
  ) : (
    <>
      <div className="service-details-form">
        {mustCreate === false ? (
          <div className="edit-service-button">
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
                setIsServiceFormEditable(!isServiceFormEditable);
              }}
            >
              Edytuj zamówienie
            </Button>
          </div>
        ) : null}
        <div className="service-pick-form">
          <text className="service-form-header">Wybierz usługę</text>
          <Select
            id="pick-service-select"
            label="Wybierz Usługę"
            size="small"
            displayEmpty
            value={serviceTypeId}
            inputProps={{ readOnly: false }}
            onChange={onChangeServiceType}
          >
            <MenuItem value={0}>{serviceTypeBody.name}</MenuItem>
            {serviceTypesPage.map((data, id) => (
              <MenuItem key={data.id} value={data.id}>
                {data.name}
              </MenuItem>
            ))}
          </Select>
        </div>
        <div className="room-pick-form">
          <text className="service-form-header">Wybierz pomieszczenie</text>
          <Select
            id="pick-room-select"
            label="Wybierz pomieszczenie"
            size="small"
            displayEmpty
            value={roomBody.id}
            inputProps={{ readOnly: false }}
            onChange={onChangeRoom}
          >
            <MenuItem value={0}>{roomBody.name}</MenuItem>
            {roomPage.map((data, id) => (
              <MenuItem key={data.id} value={data.id}>
                {data.name}
              </MenuItem>
            ))}
          </Select>
        </div>
        <div className="date-pick-form">
          <text className="service-form-header">Wybierz termin instalacji</text>
          <TextField
            id="datetime-select"
            //label="Wybierz termin instalacji"
            type="datetime-local"
            //defaultValue="2022-12-31T12:30"
            value={data.date}
            defaultValue={defaultDate}
            //sx={{ width: 250 }}
            InputLabelProps={
              {
                //shrink: true,
              }
            }
            inputProps={{ readOnly: false }}
            onChange={(e) =>
              setData({
                ...data,
                date: e.target.value,
              })
            }
          />
        </div>
        <div className="description-service-form">
          <text className="service-form-header">Opis usługi</text>
          <TextField
            label="Opis usługi"
            variant="filled"
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

        <div id="submit-service-button">
          <Button
            sx={{
              color: '#ffffff',
            }}
            onClick={() => {
              if (handleFormClose) {
                handleFormClose();
              }
            }}
          >
            Zatwierdź
          </Button>
        </div>
      </div>
    </>
  );
}
