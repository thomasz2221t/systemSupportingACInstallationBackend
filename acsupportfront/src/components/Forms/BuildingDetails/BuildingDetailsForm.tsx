import React, { useEffect, useState } from 'react';
import {
  Button,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
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
  userId: number;
  mustCreate: boolean;
  isEditable: () => boolean;
  refreshParentData?: (buildingId: number) => void;
  handleFormClose?: () => void;

  //isEditable: boolean;
};

/*const styles = makeStyles({
  notchedOutline: { borderColor: '#f0f !important' },
});*/

export function BuildingDetailsForm({
  id,
  name,
  typeName,
  street,
  postCode,
  city,
  region,
  description,
  userId,
  mustCreate,
  isEditable,
  refreshParentData,
  handleFormClose,
}: buildingDetailsFormProp) {
  /*const defaultvalue = {
    id: id,
    name: name,
    imagePath: '',
    street: street,
    postCode: postCode,
    city: city,
    region: region,
    descirpiton: additionalInfo,
  };*/
  const [data, setData] = useState<BuildingType>({
    id: id,
    name: name,
    imagePath: '',
    street: street,
    postCode: postCode,
    city: city,
    region: region,
    description: description,
  });
  const [buildingTypePage, setBuildingTypePage] = useState<BuildingTypeType[]>(
    []
  );
  const [typeIdNumber, setTypeIdNumber] = useState<number>(0);
  //const [buildingRefreshedBody, setBuildingRefreshedBody] =
  useState<BuildingType>();
  const editableState = isEditable();
  const exampleBuilding = require('../../../images/exampleBuilding.jpg');
  //const style = styles();

  const handleGettingAllBuildingTypes = async () => {
    await BuildingTypeService.getFindAllBuildingType().then((response) => {
      setBuildingTypePage(response.data.content);
      return buildingTypePage;
    });
  };

  const handleUpdatingBuildingType = async (
    buildingId: number,
    buildingTypeId: number
  ) => {
    return await BuildingService.patchAssignTypeToBuilding(
      buildingId,
      buildingTypeId
    );
  };

  const handleUpdatingBuildingBody = async (
    buildingBody: BuildingType,
    buildingTypeId: number
  ) => {
    await BuildingService.patchUpdateBuilding(
      buildingBody.id,
      buildingBody
    ).then(() => {
      handleUpdatingBuildingType(buildingBody.id, buildingTypeId);
    });
  };

  const handleAssigningUserIdToBuilding = async (
    buildingId: number,
    userId: number
  ) => {
    return await BuildingService.patchAssignUserToBuilding(buildingId, userId);
  };

  const handleCreatingBuildingBody = async (
    buildingBody: BuildingType,
    buildingTypeId: number,
    userId: number
  ) => {
    await BuildingService.postCreateBuilding(buildingBody)
      .then((response) => {
        //const buildingId = response.data;
        //buildingId = response.data;
        console.log(response.data);
        handleUpdatingBuildingType(response.data, buildingTypeId)
          .then(() => {
            handleAssigningUserIdToBuilding(response.data, userId);
          })
          .catch((error) => console.log(error));

        //handleAssigningUserIdToBuilding(Number(buildingId), userId);
        return response.data;
      })
      .catch((error) => console.log(error));

    //handleUpdatingBuildingType(buildingId, buildingTypeId);
    //handleAssigningUserIdToBuilding(buildingId, userId);
    //await BuildingService.patchAssignTypeToBuilding(buildingId, buildingTypeId);
    //await BuildingService.patchAssignUserToBuilding(buildingId, userId);
  };

  /*const createBuilding = (
    buildingBody: BuildingType,
    buildingTypeId: number,
    userId: number
  ) => {
    handleCreatingBuildingBody(buildingBody, buildingTypeId);
    if (newBuildingId > 0) {
      console.log('jest');
      console.log(newBuildingId);
    }
    handleUpdatingBuildingType(newBuildingId, buildingTypeId);
    handleAssigningUserIdToBuilding(newBuildingId, userId);
  };*/

  const handleBuildingFormSubmit = (
    buildingBody: BuildingType,
    buildingTypeId: number,
    userId: number
  ) => {
    console.log('update');
    mustCreate === true
      ? handleCreatingBuildingBody(buildingBody, buildingTypeId, userId)
      : handleUpdatingBuildingBody(buildingBody, buildingTypeId);
  };

  useEffect(() => {
    handleGettingAllBuildingTypes();
  }, []);

  useEffect(() => {
    //odśwież dane u rodzica !!!! !!!!!
    if (refreshParentData !== undefined) {
      refreshParentData(data.id);
      //console.log(buildingRefreshedBody);
      setData({
        id: id,
        name: name,
        imagePath: '',
        street: street,
        postCode: postCode,
        city: city,
        region: region,
        description: description,
      });
    }
  }, [editableState]);

  const onChange = (event: SelectChangeEvent<number>) => {
    setTypeIdNumber(Number(event.target.value));
  };

  return editableState === false ? (
    <>
      {/*<div className="building-form-close">
        <Icon />
        <Button
          // style={{
          //   position: 'relative',
          //   marginTop: 32,
          //   left: -82,
          //   width: 1064,
          //   height: 53,
          //   backgroundColor: '#D6E900',
          //   color: '#ffffff',
          //   borderRadius: 18,
          //   padding: '18px 36px',
          //   fontSize: '18px',
          //   fontFamily: 'Segoe UI',
          //   fontStyle: 'normal',
          //   fontWeight: 500,
          //   lineHeight: 24,
          // }}
          variant="contained"
          onClick={() => {
            isEditable();
          }}
        >
          Edytuj budynek
        </Button>
      </div>*/}
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
          <text className="building-form-header">Ulica</text>
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
            onChange={(e) =>
              setData({
                ...data,
                street: e.target.value,
              })
            }
          />
        </div>
        <div className="building-post-code">
          <text className="building-form-header">Kod pocztowy</text>
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
            onChange={(e) =>
              setData({
                ...data,
                postCode: e.target.value,
              })
            }
          />
        </div>
        <div className="building-city">
          <text className="building-form-header">Miasto</text>
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
            onChange={(e) =>
              setData({
                ...data,
                city: e.target.value,
              })
            }
          />
        </div>
        <div className="building-region">
          <text className="building-form-header">Województwo</text>
          <TextField
            id="building-region-text"
            label="Województwo"
            variant="filled"
            fullWidth
            value={data.region}
            InputProps={{
              readOnly: false,
            }}
            onChange={(e) =>
              setData({
                ...data,
                region: e.target.value,
              })
            }
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
              //left: 500,
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
              handleBuildingFormSubmit(data, typeIdNumber, userId);
              if (handleFormClose) {
                handleFormClose();
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
