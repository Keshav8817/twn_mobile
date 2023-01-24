import Navbar from "../navbar/Navbar";
import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import React from "react";
import type { FC } from "react";

/**
 * `Header`
 */
const Header: FC = () => {
  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <>
      {isMatch ? (
        <>
          {" "}
          <Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Box
                component="img"
                src="/logo.png"
                sx={{
                  mx: "1rem",
                  mb: "1rem",
                  width: "100px",
                  pt: "1rem",
                  pb: "1rem",
                }}
              />
            </Box>
            <Box sx={{ mt: -5 }}>
              <Navbar />
            </Box>
          </Box>
        </>
      ) : (
        <>
          {" "}
          <Box
            sx={{
              borderBottom: "5px solid black",
              boxShadow: `inset 1px 1px black,
                      inset -1px -1px black`,
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography variant="h5" component="h1">
                Child, Youth, and Family Services
              </Typography>
              <Box
                component="img"
                src="/logo.png"
                sx={{ mx: "1rem", mb: "1rem", width: "100px" }}
              />
              <Typography variant="h5" component="h1">
                Wellness Management System
              </Typography>
            </Box>
            <Box sx={{ mt: -5 }}>
              <Navbar />
            </Box>
          </Box>
        </>
      )}
    </>
  );
};

export default Header;
