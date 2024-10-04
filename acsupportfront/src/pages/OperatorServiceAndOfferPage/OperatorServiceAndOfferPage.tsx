import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { TablePagination } from '@mui/material';

import Navbar from 'components/Navbar/Navbar';
import Footer from 'components/Footer/Footer';
import UserAccount from 'components/UserAccount/UserAccount';
import Chat from 'components/Chat/Chat';
import AuthService from 'services/auth/AuthService';
import OfferDetailsForm from 'components/Forms/OfferDetailsForm/OfferDetailsForm';
import ServiceService from 'services/ServiceService';
import OperatorServiceType from 'types/OperatorServiceType';

import './OperatorServiceAndOfferPage.scss';
import ServiceOperatorForm from 'components/Forms/ServiceOperatorForm/ServiceOperatorForm';

export function OperatorServiceAndOfferPage() {
  const [userId, setUserId] = useState<number>(0);
  const [servicePage, setServicePage] = useState<OperatorServiceType[]>([]);
  const [servicePageNumber, setServicePageNumber] = useState(0);
  const [serviceRowsPerPage, setServiceRowsPerPage] = useState<number>(1);
  const [serviceRowsPerPageOption] = useState([1]);
  const [servicePageAllElements, setServicePageAllElements] =
    useState<number>(0);
  const { buildingId } = useParams();

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setServiceRowsPerPage(parseInt(event.target.value, 10));
    setServicePageNumber(0);
  };

  const handleGettingBuildingServices = async (
    buildingId: number,
    servicePageNumber: number,
    serviceRowsPerPage: number,
  ) => {
    await ServiceService.getFindAllOperatorServices(
      buildingId,
      servicePageNumber,
      serviceRowsPerPage,
    ).then((response) => {
      setServicePage(response.data.content);
      setServicePageAllElements(response.data.totalElements);
    });
  };

  useEffect(() => {
    setUserId(AuthService.getCurrentUserId());
  }, []);

  useEffect(() => {
    if (buildingId) {
      handleGettingBuildingServices(
        Number(buildingId),
        servicePageNumber,
        serviceRowsPerPage,
      );
    }
  }, [buildingId, servicePageNumber, serviceRowsPerPage]);

  return (
    <>
      <UserAccount />
      <Navbar />
      <div id="pagination-operator-service">
        <TablePagination
          component="div"
          count={servicePageAllElements}
          page={servicePageNumber}
          rowsPerPageOptions={serviceRowsPerPageOption}
          onPageChange={(_, newPage) => setServicePageNumber(newPage)}
          onRowsPerPageChange={handleChangeRowsPerPage}
          rowsPerPage={serviceRowsPerPage}
          labelRowsPerPage={'Liczba elementów na stronie:'}
        />
      </div>
      {servicePage.map((data) => {
        return (
          <div id={`${data.id}`} className="service-details-component">
            <ServiceOperatorForm
              id={data.id}
              instalationDate={data.instalationDate}
              clientsData={data.clientsData}
              roomId={data.roomId}
              buildingId={data.buildingId}
              roomQubature={data.roomQubature}
              requiredACPower={data.requiredACPower}
              description={data.description}
            />
          </div>
        );
      })}
      {buildingId ? (
        <div id="chat-operator">
          <Chat userId={userId} buildingId={Number(buildingId)} />
        </div>
      ) : null}
      {servicePage.map((data) => {
        return (
          <div id={`${data.id}`} className="offer-details-component">
            <OfferDetailsForm serviceId={data.id} isEditable={true} />
          </div>
        );
      })}
      <Footer />
    </>
  );
}
