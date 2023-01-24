import Tabbar from "../auth/tabbar/Tabbar";
import Header from "../Header";
import { Box } from "@mui/material";
import React from "react";
import type { ReactElement, ReactNode } from "react";
import { useParams } from "react-router-dom";
/**
 * The ICLayout functional component.
 * @example
 * ```tsx
 * <ICLayout>...</ICLayout>
 * // OR
 * <ICLayout />
 * ```
 * @returns ICLayout component skeleton.
 */

const ICLayout = (props: {
  children: ReactNode | ReactNode[];
}): ReactElement => {
  const { id } = useParams();
  return (
    <Box>
      <Header bannerTitle="Initial Contact" />
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
              {
                value: "File Details",
                route: `../file_details/${id}`,
              },
              {
                value: "Referral Information",
                route: `../referral_information/${id}`,
              },
              {
                value: "Incident Report",
                route: `../incident_report/${id}`,
              },
              {
                value: "Present Concerns",
                route: `../present_concerns/${id}`,
              },
              {
                value: "Patient Care Information",
                route: `../patient_care_information/${id}`,
              },
              {
                value: "Participants",
                route: `../participant/${id}`,
              },
              {
                value: "Contact Notes",
                route: `../contact_notes/${id}`,
              },
              {
                value: "Attachments",
                route: `../attachments/${id}`,
              },
              {
                value: "Appointments",
                route: `../appointment/${id}`,
              },
              {
                value: "Reminders",
                route: `../reminder/${id}`,
              },
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

export default ICLayout;
