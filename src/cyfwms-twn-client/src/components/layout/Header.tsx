import { Box } from "@mui/material";
import React from "react";
import type { FC } from "react";

/**
 * `Header` is header of non-authorized layout.
 */
const Header: FC = () => {
  return (
    <Box>
      <Box
        sx={{
          backgroundImage: "url('/img/top.png')",
          backgroundPosition: "top center",
          backgroundSize: "960px 100%",
          height: "222px",
          width: "100%",
        }}
      />
    </Box>
  );
};

export default Header;
