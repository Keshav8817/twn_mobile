import Header from "../../../components/Header";

import AuthLayout from "../../../components/auth/layout/AuthLayout";
import EditIcon from "../../../components/cg/EditIcon";
import AppointmentsViewPage from "./AppointmentsViewPage";
import AttachmentsViewPage from "./AttachmentsViewPage";
import CapacityViewPage from "./CapacityViewPage";
import CaregiversViewPage from "./CaregiversViewPage";
import CareProviderViewPage from "./CareProviderViewPage";
import ContactNotesViewPage from "./ContactNotesViewPage";
import RemindersViewPage from "./RemindersViewPage";

import TabContext from "../../../contexts/view/TabContext";

import { Box, Tab, Tabs, Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { Route, Routes, useNavigate, useParams } from "react-router-dom";
import type { FC } from "react";
import CgRouter from "../../../routers/CgRouter";
import Popup from "../../../components/auth/popup/Popup";
import { readCareProvider } from "../careProvider/CareProviderService";

/**
 * *CG* aka *Caregivers* module. \
 * `ViewPage` is *CG* modules' view page.
 */
const ViewPage: FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [data, setData] = useState({
    Id: 0,
    referenceId: 0,
    name: "",
    status: "",
    type: "",
    otherType: "",
    address: "",
    city: "",
    postalCode: "",
    province: "",
    phoneNumber: "",
    email: "",
    primaryCaregiver: "",
    secondaryCaregiver: "",
  });

  const tabContext = useContext(TabContext);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    tabContext.tabNumber = newValue;
  };
  useEffect(() => {
    readCareProvider(Number(id)).then(({ data }) => {
      setData(data);
    });
  }, []);

  return (
    <AuthLayout>
      <Header bannerTitle="Caregivers" />
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
          <EditIcon value={id} referenceId={data.referenceId || 0} />
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
            aria-label="InitialContact view navigation tabs"
          >
            <Tab
              label="Care Provider"
              value={1}
              onClick={() => navigate("care_provider")}
            />
            <Tab
              label="Capacity"
              value={2}
              onClick={() => navigate("capacity")}
            />
            <Tab
              label="Caregivers"
              value={3}
              onClick={() => navigate("caregivers")}
            />
            <Tab
              label="Contact Notes"
              value={4}
              onClick={() => navigate("contact_notes")}
            />
            <Tab
              label="Attachments"
              value={5}
              onClick={() => navigate("attachments")}
            />
            <Tab
              label="Appointments"
              value={6}
              onClick={() => navigate("appointment")}
            />
            <Tab
              label="Reminders"
              value={7}
              onClick={() => navigate("reminders")}
            />
          </Tabs>
        </TabContext.Provider>
      </Box>
      <Box sx={{ height: 400, overflowY: "scroll" }}>
        <Routes>
          <Route path="*" element={<CareProviderViewPage />} />
          <Route path="care_provider" element={<CareProviderViewPage />} />
          <Route path="capacity" element={<CapacityViewPage />} />
          <Route path="caregivers" element={<CaregiversViewPage />} />
          <Route path="contact_notes" element={<ContactNotesViewPage />} />
          <Route path="attachments" element={<AttachmentsViewPage />} />
          <Route path="appointment" element={<AppointmentsViewPage />} />
          <Route path="reminders" element={<RemindersViewPage />} />
        </Routes>
      </Box>
      <Popup children={<CgRouter />} />
    </AuthLayout>
  );
};

export default ViewPage;
