import Header from "../../../components/Header";
import Popup from "../../../components/auth/popup/Popup";

import Router from "../../../routers/CgRouter";

import { Box, Button } from "@mui/material";
import React, { useEffect, useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import type { FC } from "react";
import CgRouter from "../../../routers/CgRouter";
import AuthLayout from "../../../components/auth/layout/AuthLayout";
import CgPopupRouter from "../../../routers/popup/CgPopupRouter";
import { PopupDispatchContext } from "../../../contexts/PopupContext";

/**
 * `CgPage` is *CG* aka *Caregivers* module main page.
 */
const CgPage: FC = () => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  // useEffect(() => handleEffect(dispatch), []);
  const popupDispatchContext = useContext(PopupDispatchContext);
  const [id, setId] = useState(0);
  const navigate = useNavigate();

  return (
    <AuthLayout>
      <Header bannerTitle="Caregiver" />
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
            to={`care_provider/${id}`}
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
              navigate(`/cg/care_provider/${id}`);
            }}
          >
            Add A Caregiver
          </Button>
          <Button
            component={Link}
            to="/cg/search"
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
            Search for a Caregiver
          </Button>
        </Box>
      </Box>
      <Popup children={<CgPopupRouter />} />
    </AuthLayout>
  );
};

export default CgPage;
