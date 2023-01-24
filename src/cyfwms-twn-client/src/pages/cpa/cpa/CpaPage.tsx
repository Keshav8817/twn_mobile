import Header from "../../../components/Header";
import Popup from "../../../components/auth/popup/Popup";
import AuthLayout from "../../../components/auth/layout/AuthLayout";

import { Box, Button } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import type { FC } from "react";
import CpaPopupRouter from "../../../routers/popup/CpaPopupRouter";
import { PopupDispatchContext } from "../../../contexts/PopupContext";

/**
 * `CpaPage` is *CPA* aka \
 * *Cultural Programmes and Activities* module main page.
 */
const CpaPage: FC = () => {
  const popupDispatchContext = useContext(PopupDispatchContext);
  const [id, setId] = useState(0);
  const navigate = useNavigate();
  return (
    <AuthLayout>
      <Header bannerTitle="Cultural Programs and Activities" />
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
            to={`/cpa/add_cpa/${id}`}
            sx={{
              background: "lightgrey",
              color: "black",
              border: "1px solid black",
              height: "63px",
            }}
            onClick={() => {
              popupDispatchContext({ type: "open", open: true });
              navigate(`/cpa/add_cpa/${id}`);
            }}
          >
            Add a Cultural Program or Activity
          </Button>
          <Button
            component={Link}
            to="/cpa/search"
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
            Search for a Cultural Program or Activity
          </Button>
        </Box>
      </Box>
      <Popup children={<CpaPopupRouter />} />
    </AuthLayout>
  );
};

export default CpaPage;
