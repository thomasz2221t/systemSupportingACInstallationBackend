import React from "react";
import { TextField } from "@mui/material";

import "./RoomDetailsForm.scss";

export type roomDetailsFormProp = {
  id: number;
  name: string;
  purpose: string;
  areaX: number;
  areaY: number;
  height: number;
  powerGiveOut: number;
  numberOfPeople: number;
  additionalInfo: string;
};

export function RoomDetailsForm({ id, name, purpose, areaX, areaY, height, powerGiveOut, numberOfPeople, additionalInfo }: roomDetailsFormProp) {
  return (
    <>
      <div className="room-details-form">
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
          <TextField
            label="Przeznaczenie pomieszczenia"
            variant="filled"
            size="small"
            fullWidth
            value={purpose}
            InputProps={{
              readOnly: true,
            }}
          />
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
            value={powerGiveOut}
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
            value={additionalInfo}
            InputProps={{
              readOnly: true,
            }}
          />
        </div>
      </div>
    </>
  );
}
