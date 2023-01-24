import { Box } from "@mui/material";
import React from "react";
import type { FC } from "react";

/**
 * `Footer` is footer of non-authorized layout.
 */
const Footer: FC = () => {
  return (
    <Box>
      <Box
        component="img"
        src="/img/bottom.svg"
        sx={{ display: "block", width: "100%" }}
      />
    </Box>
  );
};

export default Footer;
