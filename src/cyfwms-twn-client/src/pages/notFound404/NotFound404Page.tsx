import { Box, Typography } from "@mui/material";
import Layout from "../../components/layout/Layout";
import React from "react";
import type { FC } from "react";

/**
 * `NotFound404Page`
 */
const NotFound404Page: FC = () => {
  return (
    <Layout>
      <Box
        sx={{
          alignItems: "center",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          m: "2rem",
        }}
      >
        <Typography variant="h1" color="primary">
          404
        </Typography>
        <Typography variant="h2">Page Not Found</Typography>
      </Box>
    </Layout>
  );
};

export default NotFound404Page;
