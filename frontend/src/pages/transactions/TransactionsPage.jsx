import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import {
  Box,
  Button,
  Container,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import { Add, Search, Close } from "@mui/icons-material";

import {
  fetchTransactions,
  searchTransactions,
} from "../../features/transactions/transactionsThunks";
import { clearSearched } from "../../features/transactions/transactionsSlice";

import MonthHeader from "../../components/common/MonthHeader";
import Error from "../../components/common/Error";
import Loader from "../../components/common/Loader";

import TransactionsList from "./transactionsList";
import TransactionForm from "./TransactionForm";

import { transactionsPageStyles as styles } from "./styles/TransactionsPage.styles";

export default function TransactionsPage() {
  const { loading, error, transactions, searched } = useSelector(
    (state) => state.transactions
  );

  const dispatch = useDispatch();

  const [search, setSearch] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [addOpen, setAddOpen] = useState(false);

  const currentTransactions = isSearching ? searched : transactions;

  const [month, setMonth] = useState(new Date());

  useEffect(() => {
    dispatch(fetchTransactions(month));
  }, [dispatch]);

  const handleMonthChange = (newMonth) => {
    setMonth(newMonth);
    dispatch(fetchTransactions(newMonth));
  };

  const handleAddOpen = () => {
    setAddOpen(true);
  };

  const handleAddClose = () => {
    setAddOpen(false);
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSearch = () => {
    setIsSearching(true);
    dispatch(searchTransactions(search));
  };

  const handleSearchClose = () => {
    setIsSearching(false);
    setSearch("");
    dispatch(clearSearched());
  };

  return (
    <Container sx={styles.container}>
      <Typography variant="h2" gutterBottom sx={styles.heading}>
        Transactions
      </Typography>

      <MonthHeader
        month={month}
        hasNextMonth={true}
        hasPrevMonth={true}
        onMonthChange={handleMonthChange}
      />

      {loading && <Loader />}

      {!loading && error && <Error error={error} />}

      {!loading && !error && (
        <Box sx={styles.mainBox}>

          <Box sx={styles.headerBox}>

            <Box sx={styles.searchBox}>
              <TextField
                value={search}
                onChange={handleSearchChange}
                label="Search"
                variant="outlined"
              />
              <IconButton disabled={!search} onClick={handleSearch}>
                <Search />
              </IconButton>
              <IconButton
                disabled={!isSearching && !search}
                onClick={handleSearchClose}
              >
                <Close />
              </IconButton>
            </Box>

            <Box>
              <Button
                variant="contained"
                sx={styles.addButton}
                onClick={handleAddOpen}
              >
                <Typography variant="h6">Add Transaction</Typography>
                <Add sx={styles.addIcon} />
              </Button>
              <TransactionForm
                open={addOpen}
                onClose={handleAddClose}
                isExisting={false}
              />
            </Box>

          </Box>

          {currentTransactions.length > 0 ? (
            <TransactionsList transactions={currentTransactions} />
          ) : (
            <Typography variant="h6">No transactions found</Typography>
          )}

        </Box>
      )}
      
    </Container>
  );
}
