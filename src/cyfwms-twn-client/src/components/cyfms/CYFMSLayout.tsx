import Tabbar from "../auth/tabbar/Tabbar";
import Header from "../Header";
import { Box } from "@mui/material";
import React from "react";
import type { ReactElement, ReactNode } from "react";
import { useParams } from "react-router-dom";

/**
 * The CYFMSLayout functional component.
 * @example
 * ```tsx
 * <CYFMSLayout>...</CYFMSLayout>
 * // OR
 * <CYFMSLayout />
 * ```
 * @returns CYFMSLayout component skeleton.
 */
const CYFMSLayout = (props: {
  children: ReactNode | ReactNode[];
}): ReactElement => {
  const { id } = useParams();
  return (
    <Box>
      <Header bannerTitle="Child, Youth, and Family Members" />
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
              { value: "Register", route: `../register/${id}` },
              { value: "Contact", route: `../contact/${id}` },
              {
                value: "Household Members",
                route: `../household_members/${id}`,
              },
              {
                value: "Education and Employment",
                route: `../education_and_employment/${id}`,
              },
              { value: "Criminal History", route: `../criminal_history/${id}` },
              {
                value: "Family Physician(s)",
                route: `../family_physicians/${id}`,
              },
              {
                value: "Counselor(s) / CFS Worker(s)",
                route: `../counselors/${id}`,
              },
              {
                value: "Other Information",
                route: `../other_information/${id}`,
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

export default CYFMSLayout;
