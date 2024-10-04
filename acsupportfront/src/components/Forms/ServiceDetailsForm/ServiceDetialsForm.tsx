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
  handleFormClose?: () => void;
};

export default function ServiceDetailsForm({
  id,
  date,
  buildingId,
  description,
  mustCreate,
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
    !mustCreate,
  );
  const [buildingIdNumber, setBuildingIdNumber] = useState<number>(buildingId);
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
    [],
  );
  const [isRequestSent, setIsRequestSent] = useState<boolean>(false);

  const handleFindingAllRoomsAssignedToBuilding = async (
    buildingId: number,
  ) => {
    await BuildingService.getFindAllBuildingsRooms(buildingId).then(
      (response) => {
        setRoomPage(response.data.content);
      },
    );
  };

  const handleFindingServiceTypes = async () => {
    await ServiceTypeService.getFindAllServiceTypes().then((response) => {
      setServiceTypePage(response.data.content);
    });
  };

  const handleGettingServiceDetails = async (serviceId: number) => {
    return await ServiceService.getFindServiceType(serviceId).then(
      (response) => {
        setServiceTypeBody(response.data);
      },
    );
  };

  const handleGettingRoomDetails = async (serviceId: number) => {
    return await ServiceService.getFindServiceRoom(serviceId).then(
      (response) => {
        setRoomBody(response.data);
      },
    );
  };

  const handleGettingRoomAndTypeDetails = (id: number) => {
    handleGettingServiceDetails(id).then(() => {
      handleGettingRoomDetails(id);
    });
  };

  const handleAssigningServiceTypeToService = async (
    serviceId: number,
    serviceTypeId: number,
  ) => {
    return ServiceService.patchAssignTypeToService(serviceId, serviceTypeId);
  };

  const handleAssigningRoomToService = async (
    serviceId: number,
    roomId: number,
  ) => {
    return ServiceService.patchAssignServiceToRoom(serviceId, roomId);
  };

  const manageAssignigRoomAndServiceTypeToService = (
    serviceId: number,
    serviceTypeId: number,
    roomId: number,
  ) => {
    return handleAssigningServiceTypeToService(serviceId, serviceTypeId).then(
      () => {
        handleAssigningRoomToService(serviceId, roomId);
      },
    );
  };

  const handleCreatingServiceBody = async (
    serviceBody: ServiceType,
    serviceTypeId: number,
    roomId: number,
  ) => {
    ServiceService.postCreateService(serviceBody).then((response) => {
      manageAssignigRoomAndServiceTypeToService(
        response.data,
        serviceTypeId,
        roomId,
      ).then(() => {
        setIsRequestSent(true);
      });
    });
  };

  const handleUpdatingServiceBody = async (
    serviceBody: ServiceType,
    serviceTypeId: number,
    roomId: number,
  ) => {
    ServiceService.patchUpdateService(serviceBody).then(() => {
      manageAssignigRoomAndServiceTypeToService(
        serviceBody.id,
        serviceTypeId,
        roomId,
      );
    });
  };

  const handleServiceFormSubmiting = (
    serviceBody: ServiceType,
    serviceTypeId: number,
    roomId: number,
  ) => {
    mustCreate === true
      ? handleCreatingServiceBody(serviceBody, serviceTypeId, roomId)
      : handleUpdatingServiceBody(serviceBody, serviceTypeId, roomId);
  };

  const onChangeServiceType = (event: SelectChangeEvent<number>) => {
    setServiceTypeBody({ ...serviceTypeBody, id: Number(event.target.value) });
  };

  const onChangeRoom = (event: SelectChangeEvent<number>) => {
    setRoomBody({ ...roomBody, id: Number(event.target.value) });
  };

  useEffect(() => {
    handleFindingAllRoomsAssignedToBuilding(buildingIdNumber);
    handleFindingServiceTypes();
  }, []);

  useEffect(() => {
    setData({
      id: id,
      date: date === '' ? defaultDate : date,
      description: description,
    });
    setBuildingIdNumber(buildingId);
    handleFindingAllRoomsAssignedToBuilding(buildingId);
    handleFindingServiceTypes();
    handleGettingRoomAndTypeDetails(id);
  }, [id, date, description]);

  return isServiceFormEditable === true ? (
    <>
      <div className="service-details-form">
        {mustCreate === false ? (
          <div className="edit-service-button">
            <Icon
              className="return-icon"
              icon="mdi:file-document-edit-outline"
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
            value={serviceTypeBody.id}
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
            value={data.date}
            defaultValue={defaultDate}
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
              icon="mdi:file-document-edit-outline"
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
            value={serviceTypeBody.id}
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
            type="datetime-local"
            value={data.date}
            defaultValue={defaultDate}
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
              handleServiceFormSubmiting(data, serviceTypeBody.id, roomBody.id);
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
