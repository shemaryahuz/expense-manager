import dayjs from "dayjs";

import { MONTH } from "../constants/ui/dateConstants";

export const getCurrentMonth = () => dayjs().startOf(MONTH);

export const dayjsToMonthStart = (dayjsDate) => dayjs(dayjsDate).startOf(MONTH);

export const dayjsToDate = (dayjsMonth) => dayjsMonth.toDate();