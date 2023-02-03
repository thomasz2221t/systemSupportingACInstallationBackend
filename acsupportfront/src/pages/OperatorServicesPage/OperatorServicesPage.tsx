import React, { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

import Navbar from 'components/Navbar/Navbar';
import Footer from 'components/Footer/Footer';
import BuildingService from 'services/BuildingService';
import UserAccount from 'components/UserAccount/UserAccount';

interface Column {
  id:
    | 'buildingId'
    | 'buildingName'
    | 'buildingType'
    | 'buildingStreet'
    | 'buildingPostCode'
    | 'buildingCity'
    | 'buildingRegion'
    | 'userData';
  label: string;
  minWidth?: number;
  align?: 'left' | 'center' | 'right';
  format?: (value: string) => string;
}

const columns: readonly Column[] = [
  { id: 'buildingId', label: 'Id', minWidth: 5, align: 'center' },
  {
    id: 'buildingName',
    label: 'Nazwa budynku',
    minWidth: 150,
    align: 'left',
  },
  {
    id: 'buildingType',
    label: 'Typ',
    minWidth: 150,
    align: 'left',
  },
  {
    id: 'buildingStreet',
    label: 'Adres',
    minWidth: 150,
    align: 'left',
  },
  {
    id: 'buildingPostCode',
    label: 'Adres',
    minWidth: 100,
    align: 'center',
  },
  {
    id: 'buildingCity',
    label: 'Miasto',
    minWidth: 100,
    align: 'left',
  },
  {
    id: 'buildingRegion',
    label: 'Województwo',
    minWidth: 100,
    align: 'left',
  },
  {
    id: 'userData',
    label: 'Właściciel',
    minWidth: 130,
    align: 'left',
  },
];

export type TableOperatorBuildingType = {
  buildingId: number;
  buildingName: string;
  buildingType: string;
  buildingStreet: string;
  buildingPostCode: string;
  buildingCity: string;
  buildingRegion: string;
  userData: string;
};

export function OperatorServicesPage() {
  const [buildingPage, setBuildingPage] = useState<TableOperatorBuildingType[]>(
    [],
  );
  const [pageNumber, setPageNumber] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);
  const [RowsPerPageOption] = useState([1, 2, 5, 10, 15]);
  const navigate = useNavigate();

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPageNumber(0);
  };

  const handleRedirectionToService = (buildingId: number) => {
    navigate(`budynki/${buildingId}/serwisy`);
  };

  const handleFindingAllBuildings = () => {
    BuildingService.getFindBuildingTableData().then((response) => {
      setBuildingPage(response.data.content);
    });
  };

  useEffect(() => {
    handleFindingAllBuildings();
  }, []);

  return (
    <>
      <Navbar />
      <UserAccount />
      <TableContainer
        sx={{
          display: 'flex',
          width: '1230px',
          marginTop: '120px',
          marginLeft: '250px',
        }}
      >
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{
                    minWidth: column.minWidth,
                    backgroundColor: '#3298d1',
                    borderStyle: 'groove',
                  }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {buildingPage
              .slice(
                pageNumber * rowsPerPage,
                pageNumber * rowsPerPage + rowsPerPage,
              )
              .map((row) => {
                return (
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={row.buildingId}
                  >
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell
                          key={column.id}
                          align={column.align}
                          style={{
                            borderStyle: 'groove',
                          }}
                          onClick={() => {
                            handleRedirectionToService(row.buildingId);
                          }}
                        >
                          {value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        sx={{
          marginRight: '20px',
        }}
        component="div"
        count={buildingPage.length}
        page={pageNumber}
        rowsPerPageOptions={RowsPerPageOption}
        onPageChange={(_, newPage) => setPageNumber(newPage)}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPage={rowsPerPage}
        labelRowsPerPage={'Liczba elementów na stronie:'}
      />
      <Footer />
    </>
  );
}
