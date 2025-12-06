import dayjs from "dayjs";

import { MONTH } from "../constants/ui/dateConstants";

export const getCurrentMonth = () => dayjs().startOf(MONTH);

export const toMonth = (date) => dayjs(date).startOf(MONTH);

export const toDate = (month) => month.toDate();