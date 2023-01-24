import Header from "../../../components/Header";
import Popup from "../../../components/auth/popup/Popup";
import AuthLayout from "../../../components/auth/layout/AuthLayout";
import CpaRouter from "../../../routers/CpaRouter";
import TabContext from "../../../contexts/view/TabContext";
import { Box, Tab, Tabs, Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { Route, Routes, useNavigate, useParams } from "react-router-dom";
import type { FC } from "react";
import { readCpa } from "../culturalProgramOrActivity/Servcie";
import CpaViewPage from "./CpaViewPage";
import AttachmentsViewPage from "./AttachmentsViewPage";
import ParticipantsViewPage from "./ParticipantsViewPage";
import EditIcon from "../../../components/cpa/EditIcon";

/**
 * *CPA* aka *Cultural Program And Activity* module. \
 * `ViewPage` is *CPA* modules' view page.
 */
const ViewPage: FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const tabContext = useContext(TabContext);
  const [data, setData] = useState({
    culturalProgramId: 0,
    referenceId: 0,
    name: "",
    type: "",
    status: "",
    caseworker: "",
    startDate: "",
    endDate: "",
    totalCost: "",
    totalParticipation: "",
    sessionDetails: "",
    costOrParticipationDetails: "",
    outcomes: "",
    notes: "",
  });
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    tabContext.tabNumber = newValue;
  };

  useEffect(() => {
    readCpa(Number(id)).then(({ data }) => {
      setData(data);
    });
  }, []);

  return (
    <AuthLayout>
      <Header bannerTitle="Cultural Programs and Activities" />
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          backgroundColor: "#d7d3d354",
          px: "1rem",
        }}
      >
        <Typography variant="h5" alignSelf="center">
          Reference Id: {data.referenceId}
        </Typography>
        <Typography>
          <EditIcon
            value={data.culturalProgramId}
            referenceId={data.referenceId}
          />
        </Typography>
      </Box>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          bgcolor: "background.paper",
          boxShadow: `inset 1px 0 black,
                      inset -1px 0 black`,
        }}
      >
        <TabContext.Provider value={{ tabNumber: 1 }}>
          <Tabs
            variant="scrollable"
            value={tabContext.tabNumber}
            onChange={handleChange}
            aria-label="CPA view navigation tabs"
          >
            <Tab
              label="Cultural Program(s) and Activities"
              value={1}
              onClick={() => navigate("add_cpa")}
            />
            <Tab
              label="Participants"
              value={2}
              onClick={() => navigate("participants")}
            />
            <Tab
              label="Attachments"
              value={3}
              onClick={() => navigate("attachments")}
            />
          </Tabs>
        </TabContext.Provider>
      </Box>
      <Box sx={{ height: 400, overflowY: "scroll" }}>
        <Routes>
          <Route path="*" element={<CpaViewPage />} />
          <Route path="add_cpa" element={<CpaViewPage />} />
          <Route path="participants" element={<ParticipantsViewPage />} />
          <Route path="attachments" element={<AttachmentsViewPage />} />
        </Routes>
      </Box>
      <Popup children={<CpaRouter />} />
    </AuthLayout>
  );
};

export default ViewPage;
