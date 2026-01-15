import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Divider,
} from "@mui/material";

import { ExpandMore } from "@mui/icons-material";

import { selectTransactionsByCategoryId } from "../../features/transactions/transactionsSelectors";
import { updateCategory } from "../../features/categories/categoriesThunks";
import { deleteCategory } from "../../features/categories/categoriesThunks";
import { getTotalAmount } from "../../utiles/transactionsUtils";

import CategoryTransactions from "./CategoryTransactions";
import DeleteCategoryForm from "./DeleteCategoryForm";
import CategoryHeader from "./CategoryHeader";
import CategoryEditActions from "./CategoryEditActions";
import CategoryMenu from "./CategoryMenu";

import { useTranslation } from "../../hooks/i18n";

import { CategoryCardStyles as styles } from "./styles/CategoryCard.styles";

export default function CategoryCard({ category }) {
  const { id, userId, name } = category;

  const dispatch = useDispatch();

  const { translate } = useTranslation();

  const [anchorEl, setAnchorEl] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [updatedName, setUpdatedName] = useState(name);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const transactions = useSelector((state) =>
    selectTransactionsByCategoryId(state, id)
  );

  const menuOpen = Boolean(anchorEl);

  const amount = getTotalAmount(transactions).toFixed(2);

  const handleMenuClick = (event) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = (event) => {
    event.stopPropagation();
    setAnchorEl(null);
  };

  const handleEdit = (event) => {
    event.stopPropagation();
    setIsEditing(true);
    handleMenuClose(event);
  };

  const handleNameChange = ({ target: { value } }) => setUpdatedName(value);

  const handleEditCancel = (event) => {
    event.stopPropagation();
    setIsEditing(false);
    setUpdatedName(name);
  };

  const handleEditSave = (event) => {
    event.stopPropagation();
    dispatch(updateCategory({ ...category, name: updatedName }));
    setIsEditing(false);
  };

  const handleDeleteOpen = (event) => {
    event.stopPropagation();
    setDeleteOpen(true);
    handleMenuClose(event);
  };

  const handleDeleteClose = (event) => {
    event.stopPropagation();
    setDeleteOpen(false);
  };

  const handleDelete = (event) => {
    event.stopPropagation();
    dispatch(deleteCategory(id));
    handleDeleteClose(event);
  };

  return (
    <Accordion sx={styles.accordion}>
      <AccordionSummary
        expandIcon={<ExpandMore />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <CategoryHeader
          isEditing={isEditing}
          updatedName={updatedName}
          onNameChange={handleNameChange}
          name={name}
          amount={amount}
          id={id}
        />
      </AccordionSummary>
      <Divider />

      <AccordionDetails sx={styles.accordionDetails}>
        {isEditing && (
          <CategoryEditActions
            updatedName={updatedName}
            onSave={handleEditSave}
            onCancel={handleEditCancel}
          />
        )}

        {userId && !isEditing && (
          <CategoryMenu
            anchorEl={anchorEl}
            menuOpen={menuOpen}
            onMenuClick={handleMenuClick}
            onMenuClose={handleMenuClose}
            onEdit={handleEdit}
            onDeleteOpen={handleDeleteOpen}
          />
        )}

        <DeleteCategoryForm
          open={deleteOpen}
          onClose={handleDeleteClose}
          onDelete={handleDelete}
        />
        {transactions.length > 0 ? (
          <CategoryTransactions transactions={transactions} />
        ) : (
          <Typography>{translate("No transactions yet")}</Typography>
        )}
      </AccordionDetails>
    </Accordion>
  );
}
