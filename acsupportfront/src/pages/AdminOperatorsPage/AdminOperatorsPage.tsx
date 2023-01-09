import React, { useEffect, useState } from 'react';
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TablePagination,
  TableContainer,
} from '@mui/material';

import Navbar from 'components/Navbar/Navbar';
import UserAccount from 'components/UserAccount/UserAccount';
import Footer from 'components/Footer/Footer';
import { UserType } from 'types/UserType';
import UserService from 'services/UserService';

interface Column {
  id: 'id' | 'login' | 'firstName' | 'lastName' | 'email' | 'telephone';
  label: string;
  minWidth?: number;
  align?: 'left' | 'center' | 'right';
  format?: (value: string) => string;
}

const columns: readonly Column[] = [
  { id: 'id', label: 'Id', minWidth: 5, align: 'center' },
  {
    id: 'login',
    label: 'Login',
    minWidth: 150,
    align: 'left',
  },
  {
    id: 'firstName',
    label: 'Imię',
    minWidth: 150,
    align: 'left',
  },
  {
    id: 'lastName',
    label: 'Nazwisko',
    minWidth: 150,
    align: 'left',
  },
  {
    id: 'email',
    label: 'Adres e-mail',
    minWidth: 100,
    align: 'center',
  },
  {
    id: 'telephone',
    label: 'Telefon',
    minWidth: 100,
    align: 'left',
  },
];

export function AdminOperatorsPage() {
  const [userPage, setUserPage] = useState<UserType[]>([]);
  const [pageNumber, setPageNumber] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);
  const [RowsPerPageOption] = useState([1, 2, 5, 10, 15]);

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPageNumber(0);
  };

  const handleGettingAllOperators = async () => {
    return await UserService.getFindAllOperators().then((response) => {
      setUserPage(response.data.content);
    });
  };

  useEffect(() => {
    handleGettingAllOperators();
  });

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
            {userPage
              .slice(
                pageNumber * rowsPerPage,
                pageNumber * rowsPerPage + rowsPerPage
              )
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
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
                            //handleRedirectionToService(row.buildingId);
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
        count={userPage.length}
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
