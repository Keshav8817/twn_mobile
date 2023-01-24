import Input from "../../components/Input";
import Layout from "../../components/layout/Layout";
import {
  Box,
  Button,
  Typography,
  Link as MuiLink,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { AuthDispatchContext } from "../../contexts/AuthContext";
import { handleSubmit } from "./loginService";
import React, { useContext } from "react";
import { Link as ReactRouterLink, useNavigate } from "react-router-dom";
import type { FC } from "react";

/**
 * `LoginPage`
 */
const LoginPage: FC = () => {
  const navigate = useNavigate();
  const authDispatchContext = useContext(AuthDispatchContext);
  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Layout>
      <Box
        component="form"
        onSubmit={(event) => handleSubmit(event, navigate, authDispatchContext)}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          rowGap: "1rem",
          my: "1rem",
        }}
      >
        {isMatch ? (
          <>
            {" "}
            <Typography sx={{ textAlign: "center" }}>
              <b>Child, Youth and Family Services Wellness Management System</b>
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "1rem 0",
                mt: "1rem",
              }}
            >
              <Input id="userName" name="userName" value="Username" required />
              <Input
                formLabelFlex="1.06 1 0"
                id="passWord"
                name="passWord"
                validationTitle="Password must be at least 6 characters long!"
                validationPattern="^.{6,}$"
                value="Password"
                required
                type="password"
              />
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  flexWrap: "wrap",
                }}
              >
                <Box
                  sx={{
                    flex: "2 1 0",
                    display: "flex",
                    justifyContent: "center",
                    gap: "0 1rem",
                  }}
                >
                  <Button
                    variant="contained"
                    type="submit"
                    sx={{ justifyContent: "center", mt: "2rem" }}
                  >
                    Login
                  </Button>
                </Box>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  flexWrap: "wrap",
                }}
              >
                <Box
                  sx={{
                    flex: "2 1 0",
                    display: "flex",
                    justifyContent: "center",
                    mb: "6rem",
                  }}
                >
                  <ReactRouterLink
                    style={{ textDecoration: "none" }}
                    to="/login"
                  >
                    <MuiLink component="span" underline="hover">
                      Forgot password?
                    </MuiLink>
                  </ReactRouterLink>
                </Box>
              </Box>
            </Box>
          </>
        ) : (
          <>
            <Typography>
              <b>Child, Youth and Family Services Wellness Management System</b>
            </Typography>
            <Box
              sx={{ display: "flex", flexDirection: "column", gap: "1rem 0" }}
            >
              <Input id="userName" name="userName" value="Username" required />
              <Input
                formLabelFlex="1.06 1 0"
                id="passWord"
                name="passWord"
                validationTitle="Password must be at least 6 characters long!"
                validationPattern="^.{6,}$"
                value="Password"
                required
                type="password"
              />
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  flexWrap: "wrap",
                }}
              >
                <Box sx={{ flex: "1.08 1 0" }}></Box>
                <Box
                  sx={{
                    flex: "2 1 0",
                    display: "flex",
                    justifyContent: "center",
                    gap: "0 1rem",
                  }}
                >
                  <Button variant="contained" type="submit">
                    Login
                  </Button>
                </Box>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  flexWrap: "wrap",
                }}
              >
                <Box sx={{ flex: "1.08 1 0" }}></Box>
                <Box
                  sx={{
                    flex: "2 1 0",
                    display: "flex",
                    justifyContent: "center",
                    gap: "0 1rem",
                  }}
                >
                  <ReactRouterLink
                    style={{ textDecoration: "none" }}
                    to="/login"
                  >
                    <MuiLink component="span" underline="hover">
                      Forgot password?
                    </MuiLink>
                  </ReactRouterLink>
                </Box>
              </Box>
            </Box>
          </>
        )}
      </Box>
    </Layout>
  );
};

export default LoginPage;
