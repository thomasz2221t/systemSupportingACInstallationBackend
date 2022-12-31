import { Button, Select, SelectChangeEvent, TextField } from '@mui/material';
import React from 'react';

import './ServiceDetailsForm.scss';

export type ServiceDetailsFormPropType = {
  id: number;
  date: number[];
  serviceId: number;
  buildingId: number;
  roomId: number;
  description: String;
  isEditable: () => boolean;
};

export default function ServiceDetailsForm({
  isEditable,
}: ServiceDetailsFormPropType) {
  const editableState = isEditable();
  let today = new Date();
  let defaultDate =
    today.getFullYear() +
    '-' +
    (today.getMonth() + 1) +
    '-' +
    today.getDate() +
    'T' +
    String(today.getHours()).padStart(2, '0') +
    ':' +
    String(today.getMinutes()).padStart(2, '0');

  const onChangeService = (event: SelectChangeEvent<number>) => {
    //setTypeIdNumber(Number(event.target.value));
  };

  const onChangeRoom = (event: SelectChangeEvent<number>) => {
    //setTypeIdNumber(Number(event.target.value));
  };

  return (
    <>
      <div className="service-details-form">
        <div className="service-pick-form">
          <text className="service-form-header">Wybierz usługę</text>
          <Select
            id="pick-service-select"
            label="Wybierz Usługę"
            size="small"
            displayEmpty
            value={0} //typeIdNumber
            inputProps={{ readOnly: editableState }}
            onChange={onChangeService}
          >
            {/*<MenuItem value={0}>{typeName}</MenuItem>
            {buildingTypePage.map((data, id) => (
              <MenuItem key={data.id} value={data.id}>
                {data.name}
              </MenuItem>
            ))}*/}
          </Select>
        </div>
        <div className="room-pick-form">
          <text className="service-form-header">Wybierz pomieszczenie</text>
          <Select
            id="pick-room-select"
            label="Wybierz pomieszczenie"
            size="small"
            displayEmpty
            value={0} //roomIdNumber
            inputProps={{ readOnly: editableState }}
            onChange={onChangeRoom}
          >
            {/*<MenuItem value={0}>{typeName}</MenuItem>
            {buildingTypePage.map((data, id) => (
              <MenuItem key={data.id} value={data.id}>
                {data.name}
              </MenuItem>
            ))}*/}
          </Select>
        </div>
        <div className="date-pick-form">
          <text className="service-form-header">Wybierz termin instalacji</text>
          <TextField
            id="datetime-select"
            label="Wybierz termin instalacji"
            type="datetime-local"
            //defaultValue="2022-12-31T12:30"
            defaultValue={defaultDate}
            //sx={{ width: 250 }}
            InputLabelProps={
              {
                //shrink: true,
              }
            }
            inputProps={{ readOnly: editableState }}
          />
        </div>
        <div className="description-service-form">
          <text className="service-form-header">Opis usługi</text>
          <TextField
            label="Opis usługi"
            variant="filled"
            fullWidth
            value={'mock'}
            InputProps={{
              readOnly: true,
            }}
          />
        </div>

        <div id="submit-service-button">
          <Button
            sx={{
              color: '#ffffff',
            }}
            onClick={() => {}}
          >
            Zatwierdź
          </Button>
        </div>
      </div>
    </>
  );
}
