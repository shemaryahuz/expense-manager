import { Box, IconButton } from "@mui/material";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";

import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import dayjs from "dayjs";

import { monthHeaderStyles as styles } from "./styles/MonthHeader.styles";

const minDate = dayjs("2024-01-01");
const maxDate = dayjs(new Date());

export default function MonthHeader({ month, onMonthChange }) {
  const hasPrevMonth = dayjs(month).isAfter(minDate, "month");
  const hasNextMonth = dayjs(month).isBefore(maxDate, "month");

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
      sx={styles.headerBox}
    >
      <Box>
        {hasPrevMonth && (
          <IconButton onClick={handlePrevMonth}>
            <ArrowBackIos />
          </IconButton>
        )}
      </Box>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={["DatePicker"]}>
          <DatePicker
            minDate={minDate}
            maxDate={maxDate}
            views={["year", "month"]}
            openTo="month"
            value={dayjsMonth}
            label="Month"
            onChange={handleMonthChange}
          />
        </DemoContainer>
      </LocalizationProvider>
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
