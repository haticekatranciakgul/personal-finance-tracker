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
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Grid from '@mui/material/Grid';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Button from '@mui/material/Button';
import { Typography } from '@mui/material';
import Stack from '@mui/material/Stack';
import { parse } from "papaparse";
import { toast } from "react-toastify";


const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginBottom: 20,
  width: '100%',
  height: '40px',  // Sabit yükseklik ekliyoruz
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
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    width: '100%',
    height: '100%', // Input alanının tüm yüksekliği kaplamasını sağlıyoruz
  },
}));

function TransactionsTable({  transactions,
  exportToCsv,
  addTransaction,
  fetchTransactions,}) {
  const [search, setSearch] = useState('');
  const [typeFilter, seTypeFilter] = React.useState('');
  const [sortKey, setSortKey] = useState('');




  const handleChange = (event) => {
    seTypeFilter(event.target.value);
  };

  const columns = [
    { title: "Name", key: "name" },
    { title: "Type", key: "type" },
    { title: "Date", key: "date" },
    { title: "Amount", key: "amount" },
    { title: "Tag", key: "tag" },
  ];

  let filteredTransactions = transactions.filter((item) =>
    item.name.toLowerCase().includes(search.toLocaleLowerCase()) && item.type.includes(typeFilter)
  );

  const sortedTransactions = [...filteredTransactions].sort((a, b) => {
    if (sortKey === "date") {
      return new Date(a.date) - new Date(b.date);
    } else if (sortKey === "amount") {
      return a.amount - b.amount;
    } else {
      return 0;
    }
  });

  function importFromCsv(event) {
    event.preventDefault();
    try {
      parse(event.target.files[0], {
        header: true,
        complete: async function (results) {
          // Now results.data is an array of objects representing your CSV rows
          for (const transaction of results.data) {
            // Write each transaction to Firebase, you can use the addTransaction function here
            console.log("Transactions", transaction);
            const newTransaction = {
              ...transaction,
              amount: parseInt(transaction.amount),
            };
            await addTransaction(newTransaction, true);
          }
        },
      });
      toast.success("All Transactions Added");
      fetchTransactions();
      event.target.files = null;
    } catch (e) {
      toast.error(e.message);
    }
  }

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>

        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search by name"
                inputProps={{ 'aria-label': 'search' }}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </Search>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl variant="filled" fullWidth size="small" sx={{ height: '40px' }}>
              <Select
                labelId="demo-simple-select-filled-label"
                id="demo-simple-select-filled"
                value={typeFilter}
                onChange={handleChange}
                sx={{ height: '100%', borderRadius: '4px', }}
              >
                <MenuItem value={''}>All</MenuItem>
                <MenuItem value={'income'}>Income</MenuItem>
                <MenuItem value={'expense'}> Expense</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Box>


      <TableContainer component={Paper} sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead >

            <TableRow>
              <TableCell align="center" colSpan={1}>
                <Typography variant='h5'>My Transactions</Typography>
              </TableCell>
              <TableCell align="center" colSpan={2}>
                <ToggleButtonGroup
                  color="primary"
                  value={sortKey}
                  exclusive
                  onChange={(e) => setSortKey(e.target.value)}
                  aria-label="Platform"
                >
                  <ToggleButton size='small' value="">No Sort</ToggleButton>
                  <ToggleButton size='small' value="date">Sort by Date </ToggleButton>
                  <ToggleButton size='small' value="amount">Sort by Amount</ToggleButton>
                </ToggleButtonGroup>
              </TableCell>
              <TableCell align="center" colSpan={2}>
                <Stack spacing={2} direction="row">
                  <Button variant="outlined" size='small' onClick={exportToCsv}>Export to CSV </Button>
                 
                  <Button variant="contained" component="label" size='small'>
                    Import from CSV
                    <input  onChange={importFromCsv}
              id="file-csv"
              type="file"
              accept=".csv"
              required
              style={{ display: "none" }} />
                  </Button>
                </Stack>
              </TableCell>
            </TableRow>


            <TableRow>
              {columns.map((column) => (
                <TableCell key={column.key} style={{ top: 75, minWidth: column.minWidth }}>{column.title}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedTransactions.map((transaction, index) => (
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
