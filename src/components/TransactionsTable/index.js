import React, { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import SearchIcon from '@mui/icons-material/Search';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';


const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginBottom: 20,
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
   
    width: '50%',
  },
}));
const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

function TransactionsTable({ transactions }) {
  const [search, setSearch] = useState('');


  const columns = [
    { title: "Name", key: "name" },
    { title: "Type", key: "type" },
    { title: "Date", key: "date" },
    { title: "Amount", key: "amount" },
    { title: "Tag", key: "tag" },
  ];

  let filteredTransactions = transactions.filter((item)=> 
    item.name.toLowerCase().includes(search.toLocaleLowerCase()))
  return (
    <>
      <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search by name"
              inputProps={{ 'aria-label': 'search' }}
              value={search} onChange={(e) => setSearch(e.target.value)} 
            />
          </Search>


          <TableContainer component={Paper}>
     
     <Table>
       <TableHead>
         <TableRow>
           {columns.map((column) => (
             <TableCell key={column.key}>{column.title}</TableCell>
           ))}
         </TableRow>
       </TableHead>
     
       <TableBody>
         {filteredTransactions.map((transaction, index) => (
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
    </>
  
  );
}

export default TransactionsTable;
