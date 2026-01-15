import { useDispatch, useSelector } from "react-redux";

import { Menu, MenuItem, Typography } from "@mui/material";

import {
  selectCurrency,
  setCurrency,
} from "../../features/settings/settingsSlice";

import { useTranslation } from "../../hooks/i18n";

export default function SettingsMenu({ open, anchorEl, onClose }) {
  const dispatch = useDispatch();

  const { translate } = useTranslation();

  const { currency } = useSelector(selectCurrency);

  const setUSD = () => {
    if (currency !== "USD")
      dispatch(setCurrency({ currency: "USD", symbol: "$" }));
  };

  const setILS = () => {
    if (currency !== "ILS")
      dispatch(setCurrency({ currency: "ILS", symbol: "₪" }));
  };

  return (
    <Menu
      open={open}
      anchorEl={anchorEl}
      onClose={onClose}
      closeAfterTransition={false}
    >
      <MenuItem selected={currency === "USD"} onClick={setUSD}>
        <Typography>{translate("USD")} $</Typography>
      </MenuItem>
      <MenuItem selected={currency === "ILS"} onClick={setILS}>
        <Typography>{translate("ILS")} ₪</Typography>
      </MenuItem>
    </Menu>
  );
}
