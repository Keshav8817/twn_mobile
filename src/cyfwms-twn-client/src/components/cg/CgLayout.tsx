import Tabbar from "../auth/tabbar/Tabbar";
import Header from "../Header";
import { Box } from "@mui/material";
import React from "react";
import type { FC, PropsWithChildren } from "react";
import { useParams } from "react-router-dom";

/**
 * `CG` aka `Caregivers` module.
 * Sub page component: `CG Layout`.
 * @param props
 * @returns `ReactElement`
 */
const CgLayout: FC<PropsWithChildren> = (props) => {
  const { id } = useParams();
  return (
    <Box>
      <Header bannerTitle="Caregivers" />
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: { xs: "1rem 0", md: undefined },
        }}
      >
        <Box sx={{ flex: "1 1 0", height: 400, overflowY: "auto" }}>
          <Tabbar
            tabs={[
              { value: "Care Provider", route: `../care_provider/${id}` },
              { value: "Capacity", route: `../capacity/${id}` },
              { value: "Caregivers", route: `../caregivers/${id}` },
              { value: "Contact Notes", route: `../contact_notes/${id}` },
              { value: "Appointments", route: `../appointments/${id}` },
              { value: "Reminders", route: `../reminders/${id}` },
              { value: "Attachments", route: `../attachments/${id}` },
            ]}
          />
        </Box>
        <Box sx={{ flex: "4 1 0", px: "1rem", height: 400, overflowY: "auto" }}>
          {props.children}
        </Box>
      </Box>
    </Box>
  );
};

export default CgLayout;
