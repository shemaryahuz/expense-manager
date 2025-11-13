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
import { DatePicker } from "@mui/x-date-pickers";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTransaction } from "../../features/transactions/transactionsThunks";
import Error from "../../components/common/Error";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { INCOME_ID } from "../../features/categories/categoriesSlice";

export default function AddTransactionForm({ open, onClose }) {
  const { categories } = useSelector((state) => state.categories);
  const expenseCategories = categories.filter((category) => category.id !== INCOME_ID);
  const intialTransaction = {
    userId: "u1", // u1 = user id
    title: "",
    amount: 0,
    type: "",
    categoryId: "",
    date: null,
  };

  const [transaction, setTransaction] = useState(intialTransaction);
  const [error, setError] = useState("");

  const dispatch = useDispatch();

  const handleChange = (e) => {
    setError("");
    switch (e.target.name) {
      case "title":
        setTransaction({ ...transaction, title: e.target.value });
        break;
      case "amount":
        const amountNumber = Number(e.target.value);
        if (amountNumber < 0) {
          return setTransaction({ ...transaction, amount: 0 });
        }
        setTransaction({ ...transaction, amount: amountNumber });
        break;
      case "type":
        setTransaction({ ...transaction, type: e.target.value });
        break;
      case "category":
        setTransaction({ ...transaction, categoryId: e.target.value });
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
    if (
      !transaction.date ||
      !transaction.title ||
      !transaction.amount ||
      !transaction.type
    ) {
      setError("All fields are required");
      return;
    }
    const transactionToSend = { ...transaction, date: transaction.date.toISOString() };
    dispatch(addTransaction(transactionToSend));
    setTransaction(intialTransaction);
    onClose();
  };

  const handleClose = () => {
    setTransaction(intialTransaction);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} sx={{ padding: 2 }} closeAfterTransition={false}>
      <DialogTitle>Add Transaction</DialogTitle>
      <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <TextField
          sx={{mt: 1}}
          required
          name="title"
          label="Title"
          value={transaction.title}
          onChange={handleChange}
        />
        <TextField
          required
          name="amount"
          label="Amount"
          type="number"
          value={transaction.amount}
          onChange={handleChange}
        />
        <FormControl fullWidth required>
          <InputLabel id="type-select-label">Type</InputLabel>
          <Select
            name="type"
            label="Type"
            labelId="type-select-label"
            id="type-select"
            value={transaction.type}
            onChange={handleChange}
          >
            <MenuItem value="income">Income</MenuItem>
            <MenuItem value="expense">Expense</MenuItem>
          </Select>
        </FormControl>
        {transaction.type === "expense" && <FormControl fullWidth required>
          <InputLabel id="category-select-label">Category</InputLabel>
          <Select
            name="category"
            label="Category"
            labelId="category-select-label"
            id="category-select"
            value={transaction.categoryId}
            onChange={handleChange}
          >
            {expenseCategories.map((category) => (
              <MenuItem key={category.id} value={category.id}>
                {category.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>}
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={["DatePicker"]}>
            <DatePicker
              slotProps={{
                textField: {
                  required: true,
                }
              }}
              name="date"
              label="Date"
              value={transaction.date}
              onChange={handleDateChange}
            />
          </DemoContainer>
        </LocalizationProvider>
      </DialogContent>
      {error && <Error error={error} />}
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSubmit}>Add</Button>
      </DialogActions>
    </Dialog>
  );
}
