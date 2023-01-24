import AuthLayout from "../../../components/auth/layout/AuthLayout";
import Popup from "../../../components/auth/popup/Popup";
import Header from "../../../components/Header";
import { PopupDispatchContext } from "../../../contexts/PopupContext";
import CyfmsPopupRouter from "../../../routers/popup/CyfmsPopupRouter";
import { Box, Button } from "@mui/material";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import type { FC } from "react";

/**
 * `CyfmsPage` is *CYFMS* aka \
 * *Child, Youth, Family and Wellness Management System* \
 * module main page.
 */
const CyfmsPage: FC = () => {
  const popupDispatchContext = useContext(PopupDispatchContext);

  return (
    <AuthLayout>
      <Header bannerTitle="Child, Youth, and Family Members" />
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          py: "3rem",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            maxWidth: 300,
            rowGap: "1rem",
          }}
        >
          <Button
            component={Link}
            to="/cyfms/register/0"
            sx={{
              background: "lightgrey",
              color: "black",
              border: "1px solid black",
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              textAlign: "center",
            }}
            onClick={() => {
              popupDispatchContext({ type: "open", open: true });
            }}
          >
            Register a Child, Youth, or Family Member
          </Button>
          <Button
            component={Link}
            to="/cyfms/search"
            sx={{
              background: "lightgrey",
              color: "black",
              border: "1px solid black",
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              textAlign: "center",
            }}
          >
            Search for a Child, Youth, or Family Member
          </Button>
        </Box>
      </Box>
      <Popup children={<CyfmsPopupRouter />} />
    </AuthLayout>
  );
};

export default CyfmsPage;
