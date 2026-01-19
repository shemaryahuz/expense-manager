import { useDispatch, useSelector } from "react-redux";

import { Menu, MenuItem } from "@mui/material";

import {
  selectLanguage,
  setLanguage,
} from "../../features/settings/settingsSlice";
import { LANGUAGES } from "../../constants/features/settingsConstants";

const { ENGLISH, HEBREW } = LANGUAGES;

export default function LanguageMenu({ open, anchorEl, onClose }) {
  const dispatch = useDispatch();

  const language = useSelector(selectLanguage);

  const setEnglish = () => {
    if (language !== ENGLISH) {
      onClose();
      dispatch(setLanguage(ENGLISH));
    }
  };

  const setHebrew = () => {
    if (language !== HEBREW) {
      onClose();
      dispatch(setLanguage(HEBREW));
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
      <MenuItem selected={language === HEBREW} onClick={setHebrew}>
        עברית
      </MenuItem>
    </Menu>
  );
}
