import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { Container } from "@mui/material";

import ProfileHeader from "./ProfileHeader";
import ProfileDetailsSection from "./ProfileDetailsSection";
import ProfilePasswordSection from "./ProfilePasswordSection";
import ProfileDeleteSection from "./ProfileDeleteSection";
import DeleteAccountDialog from "./DeleteAccountDialog";

import {
  clearMessage,
  selectUser,
  selectUserState,
} from "../../features/user/userSlice";
import {
  deleteUser,
  logout,
  updateUser,
  updateUserPassword,
} from "../../features/user/userThunks";

import { STATUSES } from "../../constants/features/statusConstants";
import { ROUTE_PATHS } from "../../constants/app/routes";

import { profilePageStyles as styles } from "./styles/ProfilePage.styles";

const { LOADING, FAILED, SUCCEEDED } = STATUSES;
const { HOME } = ROUTE_PATHS;

export default function ProfilePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector(selectUser);
  const { status, message } = useSelector(selectUserState);

  const [profile, setProfile] = useState({
    name: user?.name || "",
    email: user?.email || "",
  });

  const [password, setPassword] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  useEffect(() => {
    if (user) {
      setProfile({
        name: user.name,
        email: user.email,
      });
    }
  }, [user]);

  useEffect(() => {
    if (status === SUCCEEDED && message) {
      setShowSuccess(true);
    }
  }, [status, message]);

  const handleProfileChange = ({ target: { name, value } }) => {
    if (message) dispatch(clearMessage());
    setProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePasswordChange = ({ target: { value } }) => {
    if (message) dispatch(clearMessage());
    setPassword(value);
  };

  const handleUpdateProfile = (event) => {
    event.preventDefault();
    dispatch(updateUser(profile));
  };

  const handleUpdatePassword = (event) => {
    event.preventDefault();
    if (password) {
      dispatch(updateUserPassword({ password }));
      setPassword("");
    }
  };

  const handleCloseSuccess = (_, reason) => {
    if (reason !== "clickaway") {
      setShowSuccess(false);
      if (message) dispatch(clearMessage());
    }
  };

  const handleOpenDeleteDialog = () => {
    setDeleteDialogOpen(true);
  };

  const handleCloseDeleteDialog = () => {
    setDeleteDialogOpen(false);
  };

  const handleConfirmDelete = async () => {
    try {
      await dispatch(deleteUser()).unwrap();
      await dispatch(logout()).unwrap();
      navigate(HOME);
    } catch {
      // error is already handled in slice state
    } finally {
      setDeleteDialogOpen(false);
    }
  };

  const isLoading = status === LOADING;
  const showError = status === FAILED && message;

  return (
    <Container sx={styles.container}>
      <ProfileHeader
        showError={showError}
        errorMessage={message}
        showSuccess={showSuccess}
        successMessage={message}
        onCloseSuccess={handleCloseSuccess}
      />

      <ProfileDetailsSection
        profile={profile}
        isLoading={isLoading}
        onChange={handleProfileChange}
        onSubmit={handleUpdateProfile}
      />

      <ProfilePasswordSection
        password={password}
        isLoading={isLoading}
        onChange={handlePasswordChange}
        onSubmit={handleUpdatePassword}
      />

      <ProfileDeleteSection
        isLoading={isLoading}
        onOpenDialog={handleOpenDeleteDialog}
      />

      <DeleteAccountDialog
        open={deleteDialogOpen}
        isLoading={isLoading}
        onCancel={handleCloseDeleteDialog}
        onConfirm={handleConfirmDelete}
      />
    </Container>
  );
}
