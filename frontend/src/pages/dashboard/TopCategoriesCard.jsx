import { Fragment } from "react";

import { useNavigate } from "react-router-dom";

import { Card, Typography, Button, Box, Divider } from "@mui/material";

import { getTopCategories } from "../../utiles/categoriesUtils";

import { ROUTE_PATHS } from "../../constants/app/routes";

import { dashboardStyles as styles } from "./styles/Dashboard.styles";

const { CATEGORIES } = ROUTE_PATHS;

export default function TopCategoriesCard({ transactions, categories }) {
  const navigate = useNavigate();

  const topCategories = getTopCategories(categories, transactions, 3);

  const handleNavigate = () => {
    navigate(CATEGORIES);
  };
  return (
    <Card sx={styles.card}>
      <Typography variant="h6" gutterBottom sx={styles.cardTitle}>
        Top Categories
      </Typography>
      <Box>
        {topCategories.length > 0 ? (
          topCategories.map((category, index) => (
            <Fragment key={category.name}>
              <Box sx={styles.categoryItem}>
                <Typography variant="body1">{category.name}</Typography>
                <Typography
                  variant="body1"
                  sx={styles.categoryAmount}
                >
                  - ${category.amount}
                </Typography>
              </Box>
              {index !== topCategories.length - 1 && <Divider />}
            </Fragment>
          ))
        ) : (
          <Typography variant="body1" sx={{ textAlign: "center" }}>
            No categories found.
          </Typography>
        )}
      </Box>
      <Button
        onClick={handleNavigate}
        fullWidth
        variant="contained"
        sx={styles.cardButton}
      >
        View All Categories
      </Button>
    </Card>
  );
}
