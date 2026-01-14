import { Backdrop, CircularProgress, Typography } from "@mui/material";

import { useTranslation } from "../../hooks/i18n.js";

export default function Loader() {
  const { translate } = useTranslation();

  return (
    <Backdrop
      sx={(theme) => ({
        color: "#fff",
        zIndex: theme.zIndex.drawer + 1,
        gap: 2,
      })}
      open
    >
      <Typography>{translate("Loading...")}</Typography>
      <CircularProgress />
    </Backdrop>
  );
}
