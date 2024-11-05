import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function TransactionsTable({ transactions }) {
  const columns = [
    { title: "Name", key: "name" },
    { title: "Type", key: "type" },
    { title: "Date", key: "date" },
    { title: "Amount", key: "amount" },
    { title: "Tag", key: "tag" },
  ];

  return (
    <TableContainer component={Paper}>
      <Table>
        {/* Tablo Başlıkları */}
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableCell key={column.key}>{column.title}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        
        {/* Tablo Verileri */}
        <TableBody>
          {transactions.map((transaction, index) => (
            <TableRow key={index}>
              <TableCell>{transaction.name}</TableCell>
              <TableCell>{transaction.type}</TableCell>
              <TableCell>{transaction.date}</TableCell>
              <TableCell>{transaction.amount}</TableCell>
              <TableCell>{transaction.tag}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default TransactionsTable;
