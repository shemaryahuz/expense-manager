import {
  ArrowBackIos,
  ArrowForwardIos,
  CalendarMonth,
} from "@mui/icons-material";
import { Box, Button, IconButton, Typography } from "@mui/material";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";

export default function MonthHeader({
  month,
  hasNextMonth,
  hasPrevMonth,
  onMonthChange,
}) {
  const monthName = month.toLocaleString("default", { month: "long" });
  const year = month.getFullYear();

  const dayjsMonth = dayjs(month);

  const handleMonthChange = (newMonth) => {
    onMonthChange(newMonth.toDate());
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
      <Box>
        {hasPrevMonth && (
          <IconButton>
            <ArrowBackIos />
          </IconButton>
        )}
      </Box>
      <Box
        sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        {/* <Typography variant="h5">
          {monthName} {year}
        </Typography> */}
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={["DatePicker"]}>
            <DatePicker
              disableFuture
              views={["year", "month"]}
              value={dayjsMonth}
              label="Month"
              onChange={handleMonthChange}
            />
          </DemoContainer>
        </LocalizationProvider>
      </Box>
      <Box>
        {hasNextMonth && (
          <IconButton>
            <ArrowForwardIos />
          </IconButton>
        )}
      </Box>
    </Box>
  );
}
