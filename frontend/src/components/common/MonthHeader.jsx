import {
  ArrowBackIos,
  ArrowForwardIos,
} from "@mui/icons-material";
import { Box, IconButton, } from "@mui/material";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";

export default function MonthHeader({ month, onMonthChange }) {

  const hasPrevMonth = dayjs(month).isAfter(dayjs("2024-01-01"), "month");
  const hasNextMonth = dayjs(month).isBefore(dayjs(), "month");

  const dayjsMonth = dayjs(month);

  const handleMonthChange = (newMonth) => {
    onMonthChange(newMonth.toDate());
  };

  const handleNextMonth = () => {
    onMonthChange(dayjs(month).add(1, "month").toDate());
  };

  const handlePrevMonth = () => {
    onMonthChange(dayjs(month).subtract(1, "month").toDate());
  };

  return (
    <Box
      sx={{
        width: "60%",
        justifySelf: "center",
        display: "flex",
        justifyContent: "space-between",
        mb: 2,
      }}
    >
      <Box>
        {hasPrevMonth && (
          <IconButton onClick={handlePrevMonth}>
            <ArrowBackIos />
          </IconButton>
        )}
      </Box>
      <Box
        sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={["DatePicker"]}>
            <DatePicker
              minDate={dayjs("2024-01-01")}
              maxDate={dayjs(new Date())}
              views={["year", "month"]}
              openTo="month"
              value={dayjsMonth}
              label="Month"
              onChange={handleMonthChange}
            />
          </DemoContainer>
        </LocalizationProvider>
      </Box>
      <Box>
        {hasNextMonth && (
          <IconButton onClick={handleNextMonth}>
            <ArrowForwardIos />
          </IconButton>
        )}
      </Box>
    </Box>
  );
}
