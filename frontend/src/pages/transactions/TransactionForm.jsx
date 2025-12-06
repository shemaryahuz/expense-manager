import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";

import {
  addTransaction,
  editTransaction,
} from "../../features/transactions/transactionsThunks";
import { selectTransactionsState } from "../../features/transactions/transactionsSelectors";
import { clearMessage } from "../../features/transactions/transactionsSlice";
import { selectExpenseCategories } from "../../features/categories/categoriesSelectors";

import {
  INCOME_ID,
  MISCELLANEOUS_ID,
} from "../../constants/features/categoriesConstants";
import {
  INCOME,
  EXPENSE,
} from "../../constants/features/transactionsConstants";
import { STATUSES } from "../../constants/features/statusConstants";

import AlertMessage from "../../components/common/AlertMessage";

const { LOADING, FAILED, SUCCEEDED } = STATUSES;

export default function TransactionForm({
  open,
  onClose,
  isExisting,
  existingTransaction,
}) {
  const initialTransaction = isExisting
    ? existingTransaction
    : {
        title: "",
        amount: 0,
        type: "",
        categoryId: "",
        date: null,
      };

  const dispatch = useDispatch();

  const [transaction, setTransaction] = useState(initialTransaction);
  const { title, amount, type, categoryId } = transaction;

  const { status, message } = useSelector(selectTransactionsState);
  const expenseCategories = useSelector(selectExpenseCategories);

  const date = transaction.date ? dayjs(transaction.date) : null;

  useEffect(() => {
    if (status === SUCCEEDED && message) {
      setTransaction(initialTransaction);
      onClose();
    }
  }, [status, message]);

  const handleChange = ({ target: { name, value } }) => {
    dispatch(clearMessage());
    setTransaction({ ...transaction, [name]: value });
  };

  const handleDateChange = (newValue) => {
    dispatch(clearMessage());
    setTransaction({ ...transaction, date: newValue });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const categoryIdToSend =
      type === INCOME ? INCOME_ID : categoryId || MISCELLANEOUS_ID;

    const transactionToSend = {
      ...transaction,
      categoryId: categoryIdToSend,
      amount: Number(amount),
      date: date.toISOString(),
    };

    isExisting
      ? dispatch(editTransaction(transactionToSend))
      : dispatch(addTransaction(transactionToSend));
  };

  const handleClose = () => {
    dispatch(clearMessage());
    setTransaction(initialTransaction);
    onClose();
  };

  return (
    <Dialog
      component="form"
      onSubmit={handleSubmit}
      open={open}
      onClose={handleClose}
      sx={{ padding: 2 }}
      closeAfterTransition={false}
    >
      <DialogTitle>{isExisting ? "Edit" : "Add"} Transaction</DialogTitle>
      <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <TextField
          sx={{ mt: 1 }}
          required
          name="title"
          label="Title"
          value={title}
          onChange={handleChange}
        />
        <TextField
          required
          name="amount"
          label="Amount (USD)"
          type="number"
          value={amount}
          slotProps={{ htmlInput: { min: 0.1, step: 0.1 } }}
          onChange={handleChange}
        />
        <FormControl fullWidth required>
          <InputLabel id="type-select-label">Type</InputLabel>
          <Select
            name="type"
            label="Type"
            labelId="type-select-label"
            id="type-select"
            value={type}
            onChange={handleChange}
          >
            <MenuItem value={INCOME}>Income</MenuItem>
            <MenuItem value={EXPENSE}>Expense</MenuItem>
          </Select>
        </FormControl>
        {type === EXPENSE && (
          <FormControl fullWidth required>
            <InputLabel id="category-select-label">Category</InputLabel>
            <Select
              name="categoryId"
              label="Category"
              labelId="category-select-label"
              id="category-select"
              value={categoryId}
              onChange={handleChange}
            >
              {expenseCategories.map(({ id, name }) => (
                <MenuItem key={id} value={id}>
                  {name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={["DatePicker"]}>
            <DatePicker
              slotProps={{
                textField: {
                  required: true,
                },
              }}
              disableFuture
              name="date"
              label="Date"
              value={date}
              onChange={handleDateChange}
            />
          </DemoContainer>
        </LocalizationProvider>
      </DialogContent>
      {status === FAILED && message && (
        <AlertMessage severity="error" message={message} />
      )}
      <DialogActions>
        <Button onClick={handleClose} disabled={status === LOADING}>
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={status === LOADING}
          sx={{ color: "success.dark" }}
        >
          {status === LOADING ? "Saving..." : isExisting ? "Update" : "Add"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
