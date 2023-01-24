import Header from "../../../components/Header";

import AuthLayout from "../../../components/auth/layout/AuthLayout";

import Popup from "../../../components/auth/popup/Popup";
import { PopupDispatchContext } from "../../../contexts/PopupContext";

import { Box, Button } from "@mui/material";
import React, { useEffect, useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import type { FC } from "react";
import IcPopupRouter from "../../../routers/popup/IcPopupRouter";

// import { ModuleDispatchContext } from "../../../contexts/ModuleContext";
/**
 * `IcPage` is *IC* aka *Initial Contact* module main page.
 */
const IcPage: FC = () => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  // useEffect(() => handleEffect(dispatch), []);
  // const moduleDispatchContext = useContext(ModuleDispatchContext);
  const navigate = useNavigate();
  const cleanStore = () => {};
  const [id, setId] = useState(0);
  const popupDispatchContext = useContext(PopupDispatchContext);

  return (
    <>
      <AuthLayout>
        <Header bannerTitle="Initial Contact" />
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
              to={`/ic/file_details/${id}`}
              sx={{
                background: "lightgrey",
                color: "black",
                border: "1px solid black",
              }}
              onClick={() => {
                popupDispatchContext({ type: "open", open: true });

                navigate(`/ic/file_details/${id}`);
              }}
            >
              Add an Initial Contact File
            </Button>
            <Button
              component={Link}
              to="/ic/search"
              sx={{
                background: "lightgrey",
                color: "black",
                border: "1px solid black",
              }}
              onClick={() => {
                localStorage.removeItem("filedetailsId");
                // dispatch(setOpenPopup(true));
              }}
            >
              Search for an Initial Contact File
            </Button>
          </Box>
        </Box>
        <Popup children={<IcPopupRouter />} />
      </AuthLayout>
    </>
  );
};

export default IcPage;
