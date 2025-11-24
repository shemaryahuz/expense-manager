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
import { clearMessages, INCOME } from "../../features/transactions/transactionsSlice";

import { selectCategories } from "../../features/categories/categoriesSelectors";
import {
  INCOME_ID,
  MISCELLANEOUS_ID,
} from "../../features/categories/categoriesSlice";

import Error from "../../components/common/Error";
import Success from "../../components/common/Success";

export default function TransactionForm({
  open,
  onClose,
  isExisting,
  existingTransaction,
}) {
  const dispatch = useDispatch();

  const categories = useSelector(selectCategories);
  const { actionLoading, actionError, success } = useSelector(
    selectTransactionsState
  );

  const expenseCategories = categories.filter(
    (category) => category.id !== INCOME_ID
  );

  const initialTransaction = isExisting
    ? existingTransaction
    : {
        title: "",
        amount: 0,
        type: "",
        categoryId: "",
        date: null,
      };

  const [transaction, setTransaction] = useState(initialTransaction);
  const { title, amount, type, categoryId } = transaction;
  const date = transaction.date ? dayjs(transaction.date) : null;

  useEffect(() => {
    if (success && open) {
      setTransaction(initialTransaction);
      setTimeout(() => onClose(), 2000);
    }
  }, [success, open, onClose]);

  const handleChange = (event) => {
    dispatch(clearMessages());

    const { name, value } = event.target;

    switch (name) {
      case "title":
        setTransaction({ ...transaction, title: value });
        break;

      case "amount":
        if (value === "") {
          return setTransaction({ ...transaction, amount: "" });
        }

        const amountNumber = Number(value);

        if (isNaN(amountNumber) || amountNumber < 0) {
          return setTransaction({ ...transaction, amount: 0 });
        }

        setTransaction({ ...transaction, amount: amountNumber });
        break;

      case "type":
        setTransaction({ ...transaction, type: value });
        break;

      case "categoryId":
        setTransaction({ ...transaction, categoryId: value });
        break;
      default:
        break;
    }
  };

  const handleDateChange = (newValue) => {
    dispatch(clearMessages());
    setTransaction({ ...transaction, date: newValue });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const categoryIdToSend =
      type === INCOME ? INCOME_ID : categoryId || MISCELLANEOUS_ID;

    const transactionToSend = {
      ...transaction,
      categoryId: categoryIdToSend,
      date: date.toISOString(),
    };

    if (isExisting) {
      dispatch(editTransaction(transactionToSend));
    } else {
      dispatch(addTransaction(transactionToSend));
    }
  };

  const handleClose = () => {
    setTransaction(initialTransaction);
    onClose();
  };

  return (
    <Dialog
      component="form"
      onSubmit={handleSubmit}
      open={open}
      onClose={onClose}
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
            <MenuItem value="expense">Expense</MenuItem>
          </Select>
        </FormControl>
        {type === "expense" && (
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
              {expenseCategories.map((category) => (
                <MenuItem key={category.id} value={category.id}>
                  {category.name}
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
      {actionError && <Error error={actionError} />}
      {success && <Success message={success} />}
      <DialogActions>
        <Button onClick={handleClose} disabled={actionLoading}>
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={actionLoading || !!actionError}
          sx={{ color: "success.dark" }}
        >
          {actionLoading ? "Saving..." : isExisting ? "Update" : "Add"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
