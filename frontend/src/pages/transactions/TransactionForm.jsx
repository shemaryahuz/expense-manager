import { useState } from "react";

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
import { selectCategories } from "../../features/categories/categoriesSelectors";
import { INCOME_ID } from "../../features/categories/categoriesSlice";

import Error from "../../components/common/Error";

export default function TransactionForm({
  open,
  onClose,
  isExisting,
  initialTransaction,
}) {
  const dispatch = useDispatch();

  const categories = useSelector(selectCategories);

  const expenseCategories = categories.filter(
    (category) => category.id !== INCOME_ID
  );

  const intialTransaction = isExisting
    ? initialTransaction
    : {
        title: "",
        amount: 0,
        type: "",
        categoryId: "",
        date: null,
      };

  const [transaction, setTransaction] = useState(intialTransaction);
  const { title, amount, type, categoryId } = transaction;
  const date = transaction.date ? dayjs(transaction.date) : null;

  const [error, setError] = useState("");

  const handleChange = (event) => {
    setError("");

    const { name, value } = event.target;

    switch (name) {
      case "title":
        setTransaction({ ...transaction, title: value });
        break;

      case "amount":
        const amountNumber = Number(value);

        if (amountNumber < 0) {
          return setTransaction({ ...transaction, amount: 0 });
        }

        setTransaction({ ...transaction, amount: amountNumber });
        break;

      case "type":
        setTransaction({ ...transaction, type: value });
        break;

      case "category":
        setTransaction({ ...transaction, categoryId: value });
        break;
      default:
        break;
    }
  };

  const handleDateChange = (newValue) => {
    setError("");
    setTransaction({ ...transaction, date: newValue });
  };

  const handleSubmit = () => {
    if (!date || !title || !amount || !type) {
      setError("All fields are required");
      return;
    }
    const transactionToSend = {
      ...transaction,
      date: date.toISOString(),
    };

    if (isExisting) {
      dispatch(editTransaction(transactionToSend));
      return;
    }

    dispatch(addTransaction(transactionToSend));

    setTransaction(intialTransaction);
    onClose();
  };

  const handleClose = () => {
    setTransaction(intialTransaction);
    onClose();
  };

  return (
    <Dialog
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
            <MenuItem value="income">Income</MenuItem>
            <MenuItem value="expense">Expense</MenuItem>
          </Select>
        </FormControl>
        {type === "expense" && (
          <FormControl fullWidth required>
            <InputLabel id="category-select-label">Category</InputLabel>
            <Select
              name="category"
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
      {error && <Error error={error} />}
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSubmit} sx={{ color: "success.dark" }}>
          {isExisting ? "Update" : "Add"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
