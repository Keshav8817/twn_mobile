import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { AuthContextProvider } from "./contexts/AuthContext";
import { PopupContextProvider } from "./contexts/PopupContext";
import { TabbarContextProvider } from "./contexts/TabbarContext";
import theme from "./library/theme";
import HomePage from "./pages/home/HomePage";
import LoginPage from "./pages/login/LoginPage";
import NotFound404Page from "./pages/notFound404/NotFound404Page";
import Calendar from "./pages/calendar/Calendar_";
import CgRouter from "./routers/CgRouter";
import CpaRouter from "./routers/CpaRouter";
import CyfmsRouter from "./routers/CyfmsRouter";
import IcRouter from "./routers/IcRouter";
import { ThemeProvider } from "@mui/material/styles";
import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import type { FC } from "react";

/**
 * Application entrypoint.
 */
const App: FC = () => {
  return (
    <AuthContextProvider>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/home" element={<HomePage />} />
          </Routes>
          <PopupContextProvider>
            <TabbarContextProvider>
              <Routes>
                <Route path="/calendar/*" element={<Calendar />} />
                <Route path="/cyfms/*" element={<CyfmsRouter />} />
                <Route path="/ic/*" element={<IcRouter />} />
                <Route path="/cpa/*" element={<CpaRouter />} />
                <Route path="/cg/*" element={<CgRouter />} />
              </Routes>
            </TabbarContextProvider>
          </PopupContextProvider>
          <Routes>
            {/* <Route path="*" element={<NotFound404Page />} /> */}
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </AuthContextProvider>
  );
};

export default App;
