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
  clearMessage,
  clearSearched,
} from "../../features/transactions/transactionsSlice";

import { getCurrentMonth, dayjsToDate } from "../../utiles/monthUtils";

import MonthHeader from "../../components/common/MonthHeader";
import Loader from "../../components/common/Loader";
import Feedback from "../../components/common/Feedback";
import TransactionsList from "./TransactionsList";
import TransactionForm from "./TransactionForm";

import { STATUSES } from "../../constants/features/statusConstants";

import { transactionsPageStyles as styles } from "./styles/TransactionsPage.styles";

const { LOADING, FAILED, SUCCEEDED } = STATUSES;

export default function TransactionsPage() {
  const dispatch = useDispatch();

  const [month, setMonth] = useState(getCurrentMonth);
  const [search, setSearch] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [addOpen, setAddOpen] = useState(false);
  const [showMessage, setShowMessage] = useState(false);

  const { status, message, transactions, searched } = useSelector(
    selectTransactionsState
  );

  const currentTransactions = isSearching ? searched : transactions;

  useEffect(() => {
    dispatch(fetchTransactions(dayjsToDate(month)));
  }, [dispatch, month]);

  useEffect(() => {
    if ((message && status === SUCCEEDED) || status === FAILED) {
      setShowMessage(true);
    }
  }, [status, message]);

  const handleMonthChange = (dayjsMonth) => setMonth(dayjsMonth);

  const handleSearchChange = ({ target: { value } }) => setSearch(value);

  const handleSearch = () => {
    setIsSearching(true);
    dispatch(searchTransactions(search));
  };

  const handleSearchClose = () => {
    setIsSearching(false);
    setSearch("");
    dispatch(clearSearched());
  };

  const handleAddOpen = () => setAddOpen(true);

  const handleAddClose = () => setAddOpen(false);

  const handleFeedbackClose = (_, reason) => {
    if (reason !== "clickaway") {
      setShowMessage(false);
      dispatch(clearMessage());
    }
  };

  return (
    <Container sx={styles.container}>
      <Typography variant="h2" gutterBottom sx={styles.heading}>
        Transactions
      </Typography>

      <MonthHeader month={month} onMonthChange={handleMonthChange} />
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
              isEditMode={false}
            />
          </Box>
        </Box>
        {status === LOADING && <Loader />}
        {currentTransactions.length > 0 ? (
          <TransactionsList transactions={currentTransactions} />
        ) : (
          <Typography variant="h6">No transactions found</Typography>
        )}
      </Box>
      {(status === FAILED || status === SUCCEEDED) && message && (
        <Feedback
          message={message}
          severity={status === FAILED ? "error" : "success"}
          open={showMessage}
          onClose={handleFeedbackClose}
        />
      )}
    </Container>
  );
}
