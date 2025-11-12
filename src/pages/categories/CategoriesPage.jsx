import { Container, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import Loader from "../../components/common/Loader";
import Error from "../../components/common/Error";
import CategoriesContainer from "./CategoriesContainer";

export default function CategoriesPage() {
  const { loading, error, categories } = useSelector(
    (state) => state.categories
  );

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h2" gutterBottom sx={{ fontWeight: "bold" }}>
        Categories
      </Typography>

      {loading && <Loader />}

      {!loading && error && <Error error={error} />}

      {!loading && !error && categories.length > 0 && (
        <CategoriesContainer categories={categories} />
      )}
    </Container>
  );
}
