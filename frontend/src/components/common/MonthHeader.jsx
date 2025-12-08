import { Box, IconButton } from "@mui/material";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";

import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import dayjs from "dayjs";

import { INITIAL_DATE, MONTH, YEAR } from "../../constants/ui/dateConstants";
import { dayjsToMonthStart } from "../../utiles/monthUtils";

import { monthHeaderStyles as styles } from "./styles/MonthHeader.styles";

const minDate = dayjs(INITIAL_DATE);
const maxDate = dayjs(new Date());

export default function MonthHeader({ month, onMonthChange }) {
  const hasPrevMonth = month.isAfter(minDate, MONTH);
  const hasNextMonth = month.isBefore(maxDate, MONTH);

  const handleDatePickerChange = (dayjsDate) =>
    onMonthChange(dayjsToMonthStart(dayjsDate));

  const handleNextMonth = () => onMonthChange(month.add(1, MONTH));

  const handlePrevMonth = () => onMonthChange(month.subtract(1, MONTH));

  return (
    <Box sx={styles.headerBox}>
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
            views={[YEAR, MONTH]}
            openTo={MONTH}
            value={month}
            label="Month"
            onChange={handleDatePickerChange}
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
