import React from 'react';
import { Button, TextField } from '@mui/material';

import './OfferDetailsForm.scss';

export default function OfferDetailsForm() {
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

  return (
    <>
      <div className="offer-details-form">
        <div className="operator-data-form">
          <text className="offer-form-header">Operator</text>
          <TextField
            label="Operator:"
            variant="filled"
            fullWidth
            value={'mock'}
            InputProps={{
              readOnly: true,
            }}
          />
        </div>
        <div className="components-required-form">
          <text className="offer-form-header">
            Komonenty potrzebne do instalacji
          </text>
          <TextField
            label="Komponenty potrzebne do instalacji"
            variant="filled"
            fullWidth
            value={'mock'}
            InputProps={{
              readOnly: true,
            }}
          />
        </div>
        <div className="offer-cost-form">
          <text>Szacowany koszt wykonania usługi</text>
          <TextField
            label="Szacowany koszt wykonania usługi"
            variant="filled"
            fullWidth
            value={'mock'}
            InputProps={{
              readOnly: true,
            }}
          />
        </div>
        <div className="offer-date-form">
          <text>Proponowany termin wykonania usługi</text>
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
            inputProps={{ readOnly: false }}
          />
        </div>
        <div className="offer-status-form">
          <text>Status oferty</text>
          <TextField
            label="Status oferty"
            variant="filled"
            fullWidth
            value={'mock'}
            InputProps={{
              readOnly: true,
            }}
          />
        </div>
        <div className="offer-action-buttons">
          <Button
            sx={{
              width: '300px',
              marginLeft: '10px',
              color: '#ffffff',
              background: '#90FF38',
              borderRadius: 18,
            }}
            onClick={() => {}}
          >
            Przyjmij oferte
          </Button>
          <Button
            sx={{
              width: '300px',
              marginLeft: '20px',
              color: '#ffffff',
              background: '#FF0707',
              borderRadius: 18,
            }}
            onClick={() => {}}
          >
            Odrzuć oferte
          </Button>
          <Button
            sx={{
              width: '300px',
              marginLeft: '20px',
              color: '#ffffff',
              background: '#D6E900',
              borderRadius: 18,
            }}
            onClick={() => {}}
          >
            Zaproponuj zmiany
          </Button>
        </div>
      </div>
    </>
  );
}
