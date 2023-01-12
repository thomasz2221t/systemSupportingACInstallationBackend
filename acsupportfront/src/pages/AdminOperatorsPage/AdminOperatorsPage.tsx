import React, { useEffect, useState } from 'react';
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TablePagination,
  TableContainer,
  Dialog,
  DialogContent,
  Button,
} from '@mui/material';
import { Icon } from '@iconify/react';
import { useNavigate } from 'react-router-dom';

import Navbar from 'components/Navbar/Navbar';
import UserAccount from 'components/UserAccount/UserAccount';
import Footer from 'components/Footer/Footer';
import UserService from 'services/UserService';
import { UserType } from 'types/UserType';
import { UserDetailsForm } from 'components/Forms/UserDetailsForm/UserDetailsForm';

import './AdminOperatorsPage.scss';

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
  const [openUserForm, setOpenUserForm] = useState<boolean>(false);
  const [refreshComponent, setRefreshComponent] = useState<boolean>(false);
  const navigate = useNavigate();

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

  const handleRedirectionToUser = (userId: number) => {
    navigate(`${userId}/dane`);
  };

  const handleClickOpen = () => {
    setOpenUserForm(true);
  };

  const handleClose = () => {
    setOpenUserForm(false);
    setRefreshComponent(!refreshComponent);
  };

  useEffect(() => {
    handleGettingAllOperators();
  }, [refreshComponent]);

  return (
    <>
      <Navbar />
      <UserAccount />
      <div className="add-user-button">
        <Icon
          className="return-icon"
          icon="mdi:user-check"
          color="#4e4e4e"
          height="21"
        />
        <Button
          sx={{
            color: '#ffffff',
          }}
          onClick={handleClickOpen}
        >
          Dodaj Operatora
        </Button>
      </div>
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
                            handleRedirectionToUser(row.id);
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
      <Dialog
        sx={{
          width: '981px',
          height: '770px',
          alignItems: 'center',
          marginLeft: '220px',
          marginTop: '-20px',
        }}
        open={openUserForm}
        onClose={handleClose}
        fullWidth
        maxWidth="lg"
      >
        <DialogContent
          sx={{
            padding: '0',
            backgroundColor: '#f5f5f5',
            alignItems: 'center',
          }}
        >
          <UserDetailsForm
            id={0}
            login={''}
            password={''}
            firstName={''}
            lastName={''}
            email={''}
            telephone={''}
            mustCreate={true}
            isClient={false}
            handleFormClose={handleClose}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}
