import {
  Box,
  Button,
  Container,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import { Add, Search, Close } from "@mui/icons-material";
import { styles } from "./styles/TransactionsPage.styles";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchTransactions,
  searchTransactions,
} from "../../features/transactions/transactionsThunks";
import Error from "../../components/common/Error";
import { useEffect, useState } from "react";
import Loader from "../../components/common/Loader";
import TransactionsList from "./transactionsList";

export default function TransactionsPage() {
  const { loading, error, transactions } = useSelector(
    (state) => state.transactions
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTransactions());
  }, []);

  const [search, setSearch] = useState("");

  const handleAdd = () => {};

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSearch = () => {
    dispatch(searchTransactions(search));
  };

  const handleSearchClose = () => {
    dispatch(fetchTransactions());
    setSearch("");
  };

  return (
    <Container sx={styles.container}>
      <Typography variant="h2" gutterBottom sx={styles.heading}>
        Transactions
      </Typography>

      {loading && <Loader />}

      {!loading && error && <Error error={error} />}

      {!loading && !error && (

        <Box sx={styles.mainBox}>
          <Box
            sx={styles.headerBox}
          >
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
              <IconButton disabled={!search} onClick={handleSearchClose}>
                <Close />
              </IconButton>
            </Box>
            <Box>
              <Button
                variant="contained"
                sx={styles.addButton}
                onClick={handleAdd}
              >
                <Typography variant="h6">Add Transaction</Typography>
                <Add sx={styles.addIcon} />
              </Button>
              
            </Box>
          </Box>
          {transactions.length > 0 ? (
            <TransactionsList transactions={transactions} />
          ) : (
            <Typography variant="h6">No transactions found.</Typography>
          )}
        </Box>
      )}
    </Container>
  );
}
