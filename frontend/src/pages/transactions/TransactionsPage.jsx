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

import { selectTransactionsState } from "../../features/transactions/transactionsSelectors";
import {
  fetchTransactions,
  searchTransactions,
} from "../../features/transactions/transactionsThunks";
import {
  clearMessages,
  clearSearched,
} from "../../features/transactions/transactionsSlice";

import MonthHeader from "../../components/common/MonthHeader";
import AlertMessage from "../../components/common/AlertMessage";
import Loader from "../../components/common/Loader";
import Feedback from "../../components/common/Feedback";

import TransactionsList from "./transactionsList";
import TransactionForm from "./TransactionForm";

import { transactionsPageStyles as styles } from "./styles/TransactionsPage.styles";

export default function TransactionsPage() {
  const dispatch = useDispatch();

  const { loading, error, transactions, searched, actionError, success } =
    useSelector(selectTransactionsState);

  const [month, setMonth] = useState(new Date());

  useEffect(() => {
    dispatch(fetchTransactions(month));
  }, [dispatch, month]);

  const handleMonthChange = (newMonth) => {
    setMonth(newMonth);
  };

  const [search, setSearch] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  const currentTransactions = isSearching ? searched : transactions;

  const handleSearchChange = (event) => {
    const { value } = event.target;
    setSearch(value);
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

  const [addOpen, setAddOpen] = useState(false);

  const handleAddOpen = () => {
    setAddOpen(true);
  };

  const handleAddClose = () => {
    setAddOpen(false);
  };

  const [showSuccess, setShowSuccess] = useState(false);
  const [showActionError, setShowActionError] = useState(false);

  useEffect(() => {
    if (success) {
      setShowSuccess(true);
    }
  }, [success]);

  useEffect(() => {
    if (actionError) {
      setShowActionError(true);
    }
  }, [actionError]);

  const handleFeedbackClose = (event, reason) => {
    if (reason === "clickaway") return;
    setShowSuccess(false);
    setShowActionError(false);
    dispatch(clearMessages());
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

      {!loading && (
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
      {!loading && error && <AlertMessage severity="error" message={error} />}
      {actionError && (
        <Feedback
          message={actionError}
          severity="error"
          open={showActionError}
          onClose={handleFeedbackClose}
        />
      )}
      {success && (
        <Feedback
          message={success}
          severity="success"
          open={showSuccess}
          onClose={handleFeedbackClose}
        />
      )}
    </Container>
  );
}
