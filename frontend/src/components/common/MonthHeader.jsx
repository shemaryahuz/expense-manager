import { ArrowBackIos, ArrowForwardIos, CalendarMonth } from "@mui/icons-material";
import { Box, Button, IconButton, Typography } from "@mui/material";

export default function MonthHeader({
  month,
  hasNextMonth,
  hasPrevMonth,
  onMonthChange,
}) {

  const monthName = month.toLocaleString("default", { month: "long" });
  const year = month.getFullYear();

  return (
    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
      <Box>
        {hasPrevMonth && (
          <IconButton>
            <ArrowBackIos />
          </IconButton>
        )}
      </Box>
      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <Typography variant="h5">{monthName} {year}</Typography>
        <Button startIcon={<CalendarMonth />} sx={{ textTransform: "none" }}>
            Select month
        </Button>
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
