import { Fragment } from "react";
import { useNavigate } from "react-router-dom";

import { Card, Typography, Button, Box, Divider } from "@mui/material";

import { getTopCategories } from "../../utiles/categoriesUtils";

import { ROUTE_PATHS } from "../../constants/app/routes";
import { TOP_CATEGORIES_LIMIT } from "../../constants/ui/dashboardConstants";

import { useTranslation } from "../../hooks/i18n";

import { dashboardStyles as styles } from "./styles/Dashboard.styles";

const { CATEGORIES } = ROUTE_PATHS;

export default function TopCategoriesCard({ transactions, categories }) {
  const navigate = useNavigate();

  const { translate } = useTranslation();

  const topCategories = getTopCategories(
    categories,
    transactions,
    TOP_CATEGORIES_LIMIT
  );

  const handleNavigate = () => navigate(CATEGORIES);

  return (
    <Card sx={styles.card}>
      <Typography variant="h6" gutterBottom sx={styles.cardTitle}>
        {translate("Top Categories")}
      </Typography>
      <Box>
        {topCategories.length > 0 ? (
          topCategories.map(({ name, amount }, index) => (
            <Fragment key={name}>
              <Box sx={styles.categoryItem}>
                <Typography variant="body1">{translate(name)}</Typography>
                <Typography variant="body1" sx={styles.categoryAmount}>
                  - ${amount.toFixed(2)}
                </Typography>
              </Box>
              {index !== topCategories.length - 1 && <Divider />}
            </Fragment>
          ))
        ) : (
          <Typography variant="body1" sx={{ textAlign: "center" }}>
            {translate("No categories found")}
          </Typography>
        )}
      </Box>
      <Button
        onClick={handleNavigate}
        fullWidth
        variant="contained"
        sx={styles.cardButton}
      >
        {translate("See all categories")}
      </Button>
    </Card>
  );
}
