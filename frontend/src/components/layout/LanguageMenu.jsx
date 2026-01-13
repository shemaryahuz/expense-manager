import { useDispatch, useSelector } from "react-redux";

import { Menu, MenuItem } from "@mui/material";
import {
  selectLanguage,
  setLanguage,
} from "../../features/settings/settingsSlice";

export default function LanguageMenu({ open, anchorEl, onClose }) {
  const dispatch = useDispatch();

  const language = useSelector(selectLanguage);

  const setEnglish = () => {
    if (language !== "en") {
      onClose();
      dispatch(setLanguage("en"));
    }
  };

  const setHebrew = () => {
    if (language !== "he") {
      onClose();
      dispatch(setLanguage("he"));
    }
  };

  return (
    <Menu
      open={open}
      anchorEl={anchorEl}
      onClose={onClose}
      closeAfterTransition={false}
    >
      <MenuItem selected={language === "en"} onClick={setEnglish}>
        English
      </MenuItem>
      <MenuItem selected={language === "he"} onClick={setHebrew}>
        עברית
      </MenuItem>
    </Menu>
  );
}
