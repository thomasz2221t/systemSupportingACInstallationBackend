import React, { useEffect, useState } from 'react';
import {
  Button,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from '@mui/material';
import { Icon } from '@iconify/react';

import BuildingTypeType from 'types/BuildingTypeType';
import BuildingTypeService from 'services/BuildingTypeService';
import BuildingType from 'types/BuildingType';
import BuildingService from 'services/BuildingService';

import './BuildingDetailsForm.scss';

export type buildingDetailsFormProp = {
  id: number;
  name: string;
  typeName: string;
  street: string;
  postCode: string;
  city: string;
  region: string;
  description: string;
  chatId: number;
  userId: number;
  mustCreate: boolean;
  isEditable: () => boolean;
  refreshParentData?: (buildingId: number) => void;
  handleFormClose?: () => void;
};

export function BuildingDetailsForm({
  id,
  name,
  typeName,
  street,
  postCode,
  city,
  region,
  description,
  chatId,
  userId,
  mustCreate,
  isEditable,
  refreshParentData,
  handleFormClose,
}: buildingDetailsFormProp) {
  const [data, setData] = useState<BuildingType>({
    id: id,
    name: name,
    imagePath: '',
    street: street,
    postCode: postCode,
    city: city,
    region: region,
    description: description,
    chatId: chatId,
  });
  const [buildingTypePage, setBuildingTypePage] = useState<BuildingTypeType[]>(
    [],
  );
  const [typeIdNumber, setTypeIdNumber] = useState<number>(0);
  const editableState = isEditable();
  let isError = false;

  const handleGettingAllBuildingTypes = async () => {
    await BuildingTypeService.getFindAllBuildingType().then((response) => {
      setBuildingTypePage(response.data.content);
      return buildingTypePage;
    });
  };

  const handleUpdatingBuildingType = async (
    buildingId: number,
    buildingTypeId: number,
  ) => {
    return await BuildingService.patchAssignTypeToBuilding(
      buildingId,
      buildingTypeId,
    );
  };

  const handleUpdatingBuildingBody = async (
    buildingBody: BuildingType,
    buildingTypeId: number,
  ) => {
    await BuildingService.patchUpdateBuilding(
      buildingBody.id,
      buildingBody,
    ).then(() => {
      handleUpdatingBuildingType(buildingBody.id, buildingTypeId);
    });
  };

  const handleAssigningUserIdToBuilding = async (
    buildingId: number,
    userId: number,
  ) => {
    return await BuildingService.patchAssignUserToBuilding(buildingId, userId);
  };

  const handleCreatingBuildingBody = async (
    buildingBody: BuildingType,
    buildingTypeId: number,
    userId: number,
  ) => {
    await BuildingService.postCreateBuilding(buildingBody)
      .then((response) => {
        handleUpdatingBuildingType(response.data, buildingTypeId)
          .then(() => {
            handleAssigningUserIdToBuilding(response.data, userId);
          })
          .catch((error) => console.log(error));

        return response.data;
      })
      .catch((error) => console.log(error));
  };

  const handleBuildingFormSubmit = (
    buildingBody: BuildingType,
    buildingTypeId: number,
    userId: number,
  ) => {
    mustCreate === true
      ? handleCreatingBuildingBody(buildingBody, buildingTypeId, userId)
      : handleUpdatingBuildingBody(buildingBody, buildingTypeId);
  };

  const validate = () => {
    if (
      data.street === '' ||
      data.city === '' ||
      data.postCode === '' ||
      data.region === ''
    ) {
      isError = true;
    } else {
      isError = false;
    }
  };

  useEffect(() => {
    handleGettingAllBuildingTypes();
  }, []);

  useEffect(() => {
    if (refreshParentData !== undefined) {
      refreshParentData(data.id);
      setData({
        id: id,
        name: name,
        imagePath: '',
        street: street,
        postCode: postCode,
        city: city,
        region: region,
        description: description,
        chatId: chatId,
      });
    }
  }, [editableState]);

  const onChange = (event: SelectChangeEvent<number>) => {
    setTypeIdNumber(Number(event.target.value));
  };

  return editableState === false ? (
    <>
      <div className="building-details-form">
        <div className="building-name-form">
          <text className="building-form-header">Nazwa budynku</text>
          <TextField
            id="name-input"
            label="Nazwa budynku"
            variant="filled"
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
        <div className="building-type">
          <text className="building-form-header">Typ budynku</text>
          <Select
            id="building-type-text"
            label="Typ budynku"
            size="small"
            displayEmpty
            value={typeIdNumber}
            inputProps={{ readOnly: editableState }}
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
          <text className="building-form-header">Ulica *</text>
          <TextField
            id="street-input"
            className="building-form-header"
            label="Ulica"
            variant="filled"
            fullWidth
            value={data.street}
            InputProps={{
              readOnly: false,
            }}
            required
            error={data.street === '' ? true : false}
            helperText="Brak ulicy."
            onChange={(e) =>
              setData({
                ...data,
                street: e.target.value,
              })
            }
          />
        </div>
        <div className="building-post-code">
          <text className="building-form-header">Kod pocztowy *</text>
          <TextField
            id="code-input"
            className="building-form-header"
            label="Kod pocztowy"
            variant="filled"
            fullWidth
            value={data.postCode}
            InputProps={{
              readOnly: false,
            }}
            required
            error={data.postCode === '' ? true : false}
            helperText="Brak kodu pocztowego."
            onChange={(e) =>
              setData({
                ...data,
                postCode: e.target.value,
              })
            }
          />
        </div>
        <div className="building-city">
          <text className="building-form-header">Miasto *</text>
          <TextField
            id="city-input"
            className="building-form-header"
            label="Miasto"
            variant="filled"
            fullWidth
            value={data.city}
            InputProps={{
              readOnly: false,
            }}
            required
            error={data.city === '' ? true : false}
            helperText="Brak miasta."
            onChange={(e) =>
              setData({
                ...data,
                city: e.target.value,
              })
            }
          />
        </div>
        <div className="building-region">
          <text className="building-form-header">Województwo *</text>
          <TextField
            id="building-region-text"
            label="Województwo"
            variant="filled"
            fullWidth
            value={data.region}
            InputProps={{
              readOnly: false,
            }}
            required
            error={data.region === '' ? true : false}
            helperText="Brak województwa."
            onChange={(e) =>
              setData({
                ...data,
                region: e.target.value,
              })
            }
          />
        </div>
        <div className="building-additional-info">
          <text className="building-form-header">
            Dodatkowe informacje o budynku
          </text>
          <TextField
            id="additional-input"
            className="building-form-header"
            label="Dodatkowe informacje o budynku"
            variant="filled"
            fullWidth
            multiline
            value={data.description}
            inputProps={{
              readOnly: false,
              style: {
                height: '122px',
              },
            }}
            onChange={(e) =>
              setData({
                ...data,
                description: e.target.value,
              })
            }
          />
        </div>
        <div className="building-form-submit">
          <Button
            style={{
              position: 'relative',
              top: 20,
              width: 300,
              height: 50,
              backgroundColor: '#D6E900',
              color: '#ffffff',
              borderRadius: 18,
              padding: '18px 36px',
              fontSize: '18px',
              fontFamily: 'Segoe UI',
              fontStyle: 'normal',
              alignItems: 'right',
            }}
            variant="contained"
            onClick={() => {
              validate();
              if (isError === false) {
                handleBuildingFormSubmit(data, typeIdNumber, userId);
                if (handleFormClose) {
                  handleFormClose();
                }
              } else {
                console.log('Validation error');
              }
            }}
          >
            <Icon
              className="building-form-submit-icon"
              icon="ic:outline-save-as"
              color="#4e4e4e"
              height="36"
            />
            Zatwierdź
          </Button>
        </div>
      </div>
    </>
  ) : (
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
            inputProps={{ readOnly: editableState }}
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
            value={description}
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
