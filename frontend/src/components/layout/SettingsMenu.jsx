import { useDispatch, useSelector } from "react-redux";

import { Menu, MenuItem, Switch } from "@mui/material";

import {
  selectThemeMode,
  toggleThemeMode,
} from "../../features/settings/settingsSlice";
import { Contrast } from "@mui/icons-material";

export default function SettingsMenu({ open, anchorEl, onClose }) {
  const dispatch = useDispatch();

  const themeMode = useSelector(selectThemeMode);

  const handleThemeModeToggle = () => {
    dispatch(toggleThemeMode());
  };

  return (
    <Menu
      open={open}
      anchorEl={anchorEl}
      onClose={onClose}
      closeAfterTransition={false}
    >
      <MenuItem>
        <Contrast />
        <Switch
          checked={themeMode === "dark"}
          onChange={handleThemeModeToggle}
        />
      </MenuItem>
    </Menu>
  );
}
