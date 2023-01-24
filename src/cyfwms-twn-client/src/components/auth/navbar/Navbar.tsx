import { AuthDispatchContext } from "../../../contexts/AuthContext";
import "./Navbar.css";
import { Box, Button, useTheme, useMediaQuery } from "@mui/material";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import type { FC } from "react";
import Drawercomp from "../../drawercomp";

/**
 * `Navbar` is navigation panel in authorized layout.
 */
const Navbar: FC = () => {
  const navigate = useNavigate();
  const authDispatchContext = useContext(AuthDispatchContext);
  const theme = useTheme();
  const IsMatch = useMediaQuery(theme.breakpoints.down("sm"));

  const handleHome = () => {
    navigate("/home");
  };

  return (
    <Box
      sx={{
        width: "100%",
        backgroundColor: "black",
        mt: 4,
      }}
    >
      <ul>
        {IsMatch ? (
          <>
            <Drawercomp />
          </>
        ) : (
          <>
            {" "}
            <li className="list">
              <Button
                sx={{
                  color: "white",
                  textTransform: "none",
                  // backgroundColor: homeColor,
                  // "&:hover": {
                  //   backgroundColor: homeColor === "red" ? homeColor : "#464343",
                  // },
                  backgroundColor: window.location.href.includes("home")
                    ? "#920b0b"
                    : "",
                  "&:hover": {
                    backgroundColor: window.location.href.includes("home")
                      ? "#740808"
                      : "#740808",
                  },
                }}
                onClick={handleHome}
              >
                Home
              </Button>
            </li>
            <li className="list">
              <Button
                sx={{
                  color: "white",
                  marginLeft: "10px",
                  textTransform: "none",
                  backgroundColor: window.location.href.includes("calendar")
                    ? "#920b0b"
                    : "",
                  "&:hover": {
                    backgroundColor: window.location.href.includes("calendar")
                      ? "#740808"
                      : "#740808",
                  },
                }}
                onClick={() => navigate("/calendar")}
              >
                Calendar
              </Button>
            </li>
            <li className="logout list">
              <Button
                sx={{ color: "white", textTransform: "none" }}
                onClick={() => {
                  authDispatchContext({ type: "logout" });
                }}
              >
                Logout
              </Button>
            </li>
          </>
        )}
      </ul>
    </Box>
  );
};

export default Navbar;
