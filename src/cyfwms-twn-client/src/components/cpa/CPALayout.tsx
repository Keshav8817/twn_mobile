import Tabbar from "../auth/tabbar/Tabbar";
import Header from "../Header";
import { Box } from "@mui/material";
import React from "react";
import type { ReactElement, ReactNode } from "react";
import { useParams } from "react-router-dom";

/**
 * The CPALayout functional component.
 * @example
 * ```tsx
 * <CPALayout>...</CPALayout>
 * // OR
 * CPALayout />
 * ```
 * @returns CPALayout component skeleton.
 */
const CPALayout = (props: {
  children: ReactNode | ReactNode[];
}): ReactElement => {
  const { id } = useParams();
  return (
    <Box>
      <Header bannerTitle="Cultural Programs and Activities" />
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
                value: "Cultural Program Or Activity",
                route: `../add_cpa/${id}`,
              },
              {
                value: "Participants",
                route: `../participants/${id}`,
              },
              {
                value: "Attachments",
                route: `../attachments/${id}`,
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

export default CPALayout;
