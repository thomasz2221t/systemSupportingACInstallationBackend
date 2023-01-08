import React, { useEffect, useState } from 'react';
import { TextField } from '@mui/material';

import ServiceTypeType from 'types/ServiceTypeType';
import BuildingTypeType from 'types/BuildingTypeType';
import RoomTypeType from 'types/RoomTypeType';
import OperatorServiceType from 'types/OperatorServiceType';

import './ServiceOperatorForm.scss';
import ServiceService from 'services/ServiceService';
import BuildingService from 'services/BuildingService';
import RoomService from 'services/RoomService';

//dane klienta  //termin instalacji
//typ budynku   //typ pomieszczenia
//kubatura pomieszczenia //moc klimatyzatora
//wybrane usługi
//opis usługi

export type OperatorServiceDetailsFormPropType = {
  id: number;
  instalationDate: string;
  clientsData: string;
  roomId: number;
  buildingId: number;
  roomQubature: number;
  requiredACPower: number;
  description: string;
};

export default function ServiceOperatorForm({
  id,
  instalationDate,
  clientsData,
  roomId,
  buildingId,
  roomQubature,
  requiredACPower,
  description,
}: OperatorServiceDetailsFormPropType) {
  const [data, setData] = useState<OperatorServiceType>({
    id: id,
    instalationDate: instalationDate,
    clientsData: clientsData,
    roomId: roomId,
    buildingId: buildingId,
    roomQubature: roomQubature,
    requiredACPower: requiredACPower,
    description: description,
  });
  const [serviceTypeBody, setServiceTypeBody] = useState<ServiceTypeType>({
    id: 0,
    name: '',
  });
  const [buildingTypeBody, setBuildingTypeBody] = useState<BuildingTypeType>({
    id: 0,
    name: '',
  });
  const [roomTypeBody, setRoomTypeBody] = useState<RoomTypeType>({
    id: 0,
    name: '',
  });

  const handleGettingServiceData = (serviceId: number) => {
    return ServiceService.getFindServiceType(serviceId).then((response) => {
      setServiceTypeBody(response.data);
    });
  };

  const handleGettingBuildingTypeData = (buildingId: number) => {
    return BuildingService.getFindBuildingType(buildingId).then((response) => {
      setBuildingTypeBody(response.data);
    });
  };

  const handleGettingRoomTypeData = (roomId: number) => {
    return RoomService.getFindRoomType(roomId).then((response) => {
      setRoomTypeBody(response.data);
    });
  };

  useEffect(() => {
    setData({
      id: id,
      instalationDate: instalationDate,
      clientsData: clientsData,
      roomId: roomId,
      buildingId: buildingId,
      roomQubature: roomQubature,
      requiredACPower: requiredACPower,
      description: description,
    });
    handleGettingServiceData(id);
    handleGettingBuildingTypeData(buildingId);
    handleGettingRoomTypeData(roomId);
  }, [
    buildingId,
    clientsData,
    description,
    id,
    instalationDate,
    requiredACPower,
    roomId,
    roomQubature,
  ]);

  return (
    <>
      <div id="operator-service-form">
        <div id="operator-service-client">
          <text className="operator-service-form-header">Dane klienta</text>
          <TextField
            label="Dane klienta"
            variant="filled"
            fullWidth
            value={data.clientsData}
            InputProps={{
              readOnly: true,
            }}
          />
        </div>
        <div id="operator-installation-date">
          <text className="operator-service-form-header">
            Termin instalacji
          </text>
          <TextField
            id="datetime-select"
            label="Termin instalacji"
            type="datetime-local"
            value={data.instalationDate}
            //defaultValue={defaultDate}
            inputProps={{ readOnly: true }}
          />
        </div>
        <div id="operator-service-building-type">
          <text className="operator-service-form-header">Typ budynku</text>
          <TextField
            label="Typ budynku"
            variant="filled"
            fullWidth
            value={buildingTypeBody.name}
            InputProps={{
              readOnly: true,
            }}
          />
        </div>
        <div id="operator-service-room-type">
          <text className="operator-service-form-header">
            Typ pomieszczenia
          </text>
          <TextField
            label="Typ pomieszczenia"
            variant="filled"
            fullWidth
            value={roomTypeBody.name}
            InputProps={{
              readOnly: true,
            }}
          />
        </div>
        <div id="operator-service-room-area">
          <text className="operator-service-form-header">
            Kubatura pomieszczenia [m^3]
          </text>
          <TextField
            label="Kubatura pomieszczenia"
            variant="filled"
            fullWidth
            value={data.roomQubature}
            InputProps={{
              readOnly: true,
            }}
          />
        </div>
        <div id="operator-service-required-power">
          <text className="operator-service-form-header">
            Szacunkowa moc klimatyzacji [W]
          </text>
          <TextField
            label="Szacunkowa moc klimatyzacji"
            variant="filled"
            fullWidth
            value={data.requiredACPower}
            InputProps={{
              readOnly: true,
            }}
          />
        </div>
        <div id="operator-service-type">
          <text className="operator-service-form-header">Wybrana usługa</text>
          <TextField
            label="Wybrane usługi"
            variant="filled"
            fullWidth
            value={serviceTypeBody.name}
            InputProps={{
              readOnly: true,
            }}
          />
        </div>
        <div id="operator-service-description">
          <text className="operator-service-form-header">Opis usługi</text>
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
  );
}
