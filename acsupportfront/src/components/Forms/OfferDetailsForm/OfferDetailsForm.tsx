import React, { useEffect, useState } from 'react';
import { Autocomplete, Button, Checkbox, TextField } from '@mui/material';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

import OfferService from 'services/OfferService';
import { UserType } from 'types/UserType';
import OfferType from 'types/OfferType';

import './OfferDetailsForm.scss';
import InstallerEquipmentType from 'types/InstallerEquipmentType';
import { OfferStatusType } from 'enums/OfferStatusType';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

export type OfferDetailsFormPropType = {
  serviceId: number;
  //refreshParentData?: (buildingId: number) => void;
  handleFormClose?: () => void;
};

export default function OfferDetailsForm({
  serviceId,
}: OfferDetailsFormPropType) {
  let today = new Date();

  let defaultDateBeginning =
    today.getFullYear() +
    '-' +
    String(today.getMonth() + 1).padStart(2, '0') +
    '-' +
    String(today.getDate()).padStart(2, '0') +
    'T' +
    String(today.getHours()).padStart(2, '0') +
    ':' +
    String(today.getMinutes()).padStart(2, '0');

  let defaultDateEnd =
    today.getFullYear() +
    '-' +
    String(today.getMonth() + 1).padStart(2, '0') +
    '-' +
    String(today.getDate()).padStart(2, '0') +
    'T' +
    String(today.getHours() + 1).padStart(2, '0') +
    ':' +
    String(today.getMinutes()).padStart(2, '0');

  const [serviceIdNumber] = useState<number>(serviceId);
  const [offerBody, setOfferBody] = useState<OfferType>({
    id: 0,
    cost: 0,
    datesBegining: defaultDateBeginning,
    datesEnd: defaultDateEnd,
    statusType: '',
  });
  const [userBody, setUserBody] = useState<UserType>({
    id: 0,
    login: '',
    password: '',
    firstName: '',
    lastName: '',
    email: '',
    telephone: '',
  });
  const [equipmentPage, setEquipmentPage] = useState<InstallerEquipmentType[]>(
    []
  );
  const [equipmentUnit, setEquipmentUnit] = React.useState<any>([]);
  const [didOfferStateChanged, setDidOfferStateChanged] =
    useState<boolean>(false);

  const handleGettingUserById = (offerId: number) => {
    return OfferService.getFindUserAssignedToOffer(offerId).then((response) => {
      setUserBody(response.data);
    });
  };

  const handleGettingOfferEquipment = (offerId: number) => {
    return OfferService.getFindAllEquipmentInOffer(offerId).then((response) => {
      console.log(response.data);
      console.log(response.data.content);
      setEquipmentPage(response.data.content);
    });
  };

  const handleGettingOfferData = (serviceId: number) => {
    OfferService.getFindOfferByServiceId(serviceId).then((response) => {
      console.log(response.data);
      setOfferBody(response.data);
      const offerId = response.data.id;
      handleGettingOfferEquipment(offerId).then(() => {
        handleGettingUserById(offerId);
      });
    });
  };

  const handleChangingOfferStatus = (
    serviceId: number,
    statusType: OfferStatusType
  ) => {
    OfferService.patchUpdateOfferStatus(serviceId, statusType).then(() => {
      setDidOfferStateChanged(!didOfferStateChanged);
    });
  };

  useEffect(() => {
    setOfferBody({
      id: 0,
      cost: 0,
      datesBegining: defaultDateBeginning,
      datesEnd: defaultDateEnd,
      statusType: '',
    });
    setUserBody({
      id: 0,
      login: '',
      password: '',
      firstName: '',
      lastName: '',
      email: '',
      telephone: '',
    });
    setEquipmentUnit([]);
    handleGettingOfferData(serviceId);
  }, [serviceId, didOfferStateChanged]); //serviceId

  useEffect(() => {
    if (equipmentPage.length > 0) {
      setEquipmentUnit([equipmentPage[0]]);
    }
  }, [equipmentPage]);

  console.log(offerBody);
  console.log(equipmentPage);

  return (
    <>
      <div className="offer-details-form">
        <div className="operator-data-form">
          <text className="offer-form-header">Operator</text>
          <TextField
            label="Operator:"
            variant="filled"
            fullWidth
            value={`${userBody.firstName} ${userBody.lastName}`}
            InputProps={{
              readOnly: true,
            }}
          />
        </div>
        <div className="components-required-form">
          <text className="offer-form-header">
            Komonenty potrzebne do instalacji
          </text>
          {/* <TextField
            label="Komponenty potrzebne do instalacji"
            variant="filled"
            fullWidth
            value={''}
            InputProps={{
              readOnly: true,
            }}
          /> */}
          {/* <Autocomplete
            value={equipmentUnit}
            onChange={(event, newValue) => {
              setEquipmentUnit(newValue);
            }}
            multiple
            id="tags-filled"
            options={equipmentPage.map((equipment) => equipment.name)}
            freeSolo
            renderTags={(value: string[], getTagProps) =>
              value.map((option: string, index: number) => (
                <Chip
                  variant="outlined"
                  label={option}
                  {...getTagProps({ index })}
                />
              ))
            }
            renderInput={(params) => (
              <TextField
                {...params}
                label="Komponenty potrzebne do instalacji"
                variant="filled"
                fullWidth
                InputProps={{
                  readOnly: true,
                }}
              />
            )}
          /> */}
          <Autocomplete
            autoComplete
            multiple
            fullWidth
            readOnly
            options={equipmentPage} //all
            value={equipmentUnit} //equipmentPage
            disableCloseOnSelect
            getOptionLabel={(option) => {
              if (option) {
                return option.name;
              }
            }}
            renderOption={(props, option, { selected }) => (
              <li {...props}>
                <Checkbox
                  icon={icon}
                  checkedIcon={checkedIcon}
                  style={{ marginRight: 8 }}
                  checked={selected}
                />
                {option.name}
              </li>
            )}
            //style={{ width: 500 }}
            renderInput={(params) => (
              <TextField {...params} label="Komponenty" />
            )}
          />
        </div>
        <div className="offer-cost-form">
          <text>Szacowany koszt wykonania usługi</text>
          <TextField
            label="Szacowany koszt wykonania usługi"
            variant="filled"
            fullWidth
            value={offerBody.cost}
            InputProps={{
              readOnly: true,
            }}
          />
        </div>
        <div className="offer-date-beginning-form">
          <text>Proponowane rozpoczęcie usługi</text>
          <TextField
            id="datetime-select"
            type="datetime-local"
            //defaultValue="2022-12-31T12:30"
            value={offerBody.datesBegining}
            //sx={{ width: 250 }}
            InputLabelProps={
              {
                //shrink: true,
              }
            }
            inputProps={{ readOnly: false }}
          />
        </div>
        <div className="offer-date-end-form">
          <text>Proponowane zakończenie usługi</text>
          <TextField
            id="datetime-select"
            type="datetime-local"
            //defaultValue="2022-12-31T12:30"
            value={offerBody.datesEnd}
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
            value={offerBody.statusType}
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
            onClick={() => {
              handleChangingOfferStatus(serviceId, OfferStatusType.ACCEPTED);
            }}
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
            onClick={() => {
              handleChangingOfferStatus(serviceId, OfferStatusType.REJECTED);
            }}
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
            onClick={() => {
              handleChangingOfferStatus(
                serviceId,
                OfferStatusType.CHANGES_REQUIRED
              );
            }}
          >
            Zaproponuj zmiany
          </Button>
        </div>
      </div>
    </>
  );
}
