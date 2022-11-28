import React from "react";
import { Select, TextField } from "@mui/material";

import "./BuildingDetailsForm.scss";

export type buildingDetailsFormProp = {
  id: number;
  name: string;
  type: string;
  street: string;
  postCode: string;
  city: string;
  region: string;
  additionalInfo: string;
};

export function BuildingDetailsForm({ id }: buildingDetailsFormProp) {
  const exampleBuilding = require("../../../images/exampleBuilding.jpg");

  return (
    <>
      <div className="building-details-form">
        <div className="building-name">
          <text id="building-name-header">Nazwa budynku</text>
          <TextField
            id={"building-name-text"}
            label="Nazwa budynku"
            variant="outlined"
          />
        </div>
        <div className="building-type">
          <text id="building-type-header">Typ budynku</text>
          <Select id="building-type-text" />
        </div>
        <div className="building-street">
          <text id="building-street-header">Ulica</text>
          <TextField
            id={"building-street-text"}
            label="Ulica"
            variant="outlined"
          />
        </div>
        <div className="building-post-code">
          <text id="building-post-code-header">Kod pocztowy</text>
          <TextField
            id="building-post-code-text"
            label="Kod pocztowy"
            variant="outlined"
          />
        </div>
        <div className="building-city">
          <text id="building-city-header">Miasto</text>
          <TextField
            id="building-city-text"
            label="Miasto"
            variant="outlined"
          />
        </div>
        <div className="building-region">
          <text id="building-region-header-text">Województwo</text>
          <TextField
            id="building-region-text"
            label="Województwo"
            variant="outlined"
          />
        </div>
        <div className="building-img">
          <img
            src={exampleBuilding}
            width="184"
            height="115"
            //className="building-img"
          />
        </div>
        <div className="building-additional-info">
          <text id="building-additional-info-header">
            Dodatkowe informacje o budynku
          </text>
          <TextField
            id="building-additional-info-text"
            label="Dodatkowe informacje o budynku"
            variant="outlined"
          />
        </div>
      </div>
    </>
  );
}
