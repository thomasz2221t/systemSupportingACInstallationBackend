import React, { useEffect, useState } from 'react';
import { MenuItem, Select, SelectChangeEvent, TextField } from '@mui/material';
import { makeStyles } from '@mui/styles';

import BuildingTypeType from 'types/BuildingTypeType';
import BuildingTypeService from 'services/BuildingTypeService';

import './BuildingDetailsForm.scss';

export type buildingDetailsFormProp = {
  id: number;
  name: string;
  typeId: number;
  typeName: string;
  street: string;
  postCode: string;
  city: string;
  region: string;
  additionalInfo: string;
};

const styles = makeStyles({
  notchedOutline: { borderColor: '#f0f !important' },
});

export function BuildingDetailsForm({
  id,
  name,
  typeId,
  typeName,
  street,
  postCode,
  city,
  region,
  additionalInfo,
}: buildingDetailsFormProp) {
  const [buildingTypePage, setBuildingTypePage] = useState<BuildingTypeType[]>(
    []
  );
  const [typeIdNumber, setTypeIdNumber] = useState<number>(0);
  const exampleBuilding = require('../../../images/exampleBuilding.jpg');
  const style = styles();

  const handleGettingAllBuildingTypes = async () => {
    await BuildingTypeService.getFindAllBuildingType().then((response) => {
      setBuildingTypePage(response.data.content);
      return buildingTypePage;
    });
  };

  useEffect(() => {
    handleGettingAllBuildingTypes();
  }, []);

  const onChange = (event: SelectChangeEvent<number>) => {
    setTypeIdNumber(Number(event.target.value));
  };

  console.log(name);
  console.log(street);
  console.log(postCode);
  console.log(typeId);
  return (
    <>
      <div className="building-details-form">
        <div className="building-name-form">
          <text className="building-form-header">Nazwa budynku</text>
          <TextField
            label="Nazwa budynku"
            variant="filled"
            fullWidth
            value={name}
            InputProps={{
              readOnly: true,
            }}
          />
        </div>
        <div className="building-type">
          <text className="building-form-header">Typ budynku</text>
          <Select
            id="building-type-text"
            label="Typ budynku"
            size="small"
            displayEmpty
            value={typeIdNumber}
            inputProps={{ readOnly: true }}
            onChange={onChange}
          >
            <MenuItem value={0}>{typeName}</MenuItem>
            {buildingTypePage.map((data, id) => (
              <MenuItem key={data.id} value={data.id}>
                {data.name}
              </MenuItem>
            ))}
          </Select>
        </div>
        <div className="building-street">
          <text className="building-form-header">Ulica</text>
          <TextField
            className="building-form-header"
            label="Ulica"
            variant="filled"
            fullWidth
            value={street}
            InputProps={{
              readOnly: true,
            }}
          />
        </div>
        <div className="building-post-code">
          <text className="building-form-header">Kod pocztowy</text>
          <TextField
            className="building-form-header"
            label="Kod pocztowy"
            variant="filled"
            fullWidth
            value={postCode}
            InputProps={{
              readOnly: true,
            }}
          />
        </div>
        <div className="building-city">
          <text className="building-form-header">Miasto</text>
          <TextField
            className="building-form-header"
            label="Miasto"
            variant="filled"
            fullWidth
            value={city}
            InputProps={{
              readOnly: true,
            }}
          />
        </div>
        <div className="building-region">
          <text className="building-form-header">Województwo</text>
          <TextField
            id="building-region-text"
            label="Województwo"
            variant="filled"
            fullWidth
            value={region}
            InputProps={{
              readOnly: true,
            }}
          />
        </div>
        <div className="building-form-img">
          <img
            src={exampleBuilding}
            width="280"
            height="170"
            className="building-form-image"
          />
        </div>
        <div className="building-additional-info">
          <text className="building-form-header">
            Dodatkowe informacje o budynku
          </text>
          <TextField
            className="building-form-header"
            label="Dodatkowe informacje o budynku"
            variant="filled"
            fullWidth
            multiline
            value={additionalInfo}
            inputProps={{
              readOnly: true,
              style: {
                height: '122px',
              },
            }}
          />
        </div>
      </div>
    </>
  );
}
