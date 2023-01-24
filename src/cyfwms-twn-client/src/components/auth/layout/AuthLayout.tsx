import AuthContext from "../../../contexts/AuthContext";
// import SessionTimer from "../../SessionTimer";
import Footer from "../../layout/Footer";
import Header from "./AuthHeader";
import { Box, useTheme, useMediaQuery } from "@mui/material";
import jwtDecode from "jwt-decode";
import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import type { JwtPayload } from "jwt-decode";
import type { FC, PropsWithChildren } from "react";
import SessionTimer from "../../SessionTimer";

/**
 * The `AuthLayout` functional component makes sure \
 * that the user is logged-in. If not, then redirect \
 * them to the respective login page.
 * @example
 * ```jsx
 * <AuthLayout>
 *   ...
 * </AuthLayout>
 * ```
 * @example
 * ```jsx
 * <AuthLayout children={} />
 * ```
 */
const AuthLayout: FC<PropsWithChildren> = (props) => {
  const authContext = useContext(AuthContext);
  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down("sm"));

  if (authContext.jwtToken !== null) {
    try {
      const decodedJwtToken: JwtPayload = jwtDecode(authContext.jwtToken);
      if (decodedJwtToken.exp) {
        if (decodedJwtToken.exp < Date.now() / 1000) {
          return <Navigate to="/login" />;
        }
      }
    } catch (err) {
      return <Navigate to="/login" />;
    }
  } else {
    return <Navigate to="/login" />;
  }

  return (
    <Box>
      {isMatch ? (
        <>
          <Box>
            <Header />
            {props.children}
            <Footer />
            <SessionTimer />
          </Box>
        </>
      ) : (
        <>
          <Box
            sx={{
              border: "5px solid black",
              mx: { xs: "", md: "5rem" },
              my: { xs: "", md: "1rem" },
              boxShadow: `inset 1px 1px black,
                      inset -1px -1px black`,
            }}
          >
            <Header />
            {props.children}
            <Footer />
            <SessionTimer />
          </Box>
        </>
      )}
    </Box>
  );
};

export default AuthLayout;
