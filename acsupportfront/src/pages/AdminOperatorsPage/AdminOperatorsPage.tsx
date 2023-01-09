import React, { useState } from 'react';
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TablePagination,
} from '@mui/material';

import Navbar from 'components/Navbar/Navbar';
import UserAccount from 'components/UserAccount/UserAccount';
import Footer from 'components/Footer/Footer';
import { UserType } from 'types/UserType';

/*interface Column {
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
];*/

export function AdminOperatorsPage() {
  /*const [userPage, setUserPage] = useState<UserType[]>(
    []
  );
  const [pageNumber, setPageNumber] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);
  const [RowsPerPageOption] = useState([1, 2, 5, 10, 15]);
*/
  return (
    <>
      <UserAccount />
      <Navbar />

      <Footer />
    </>
  );
}
