import { ModuleContextProvider } from "../contexts/ModuleContext";
// import { PopupContextProvider } from "../contexts/PopupContext";
// import { TabbarContextProvider } from "../contexts/TabbarContext";
import CyfmsPage from "../pages/cyfms/cyfms/CyfmsPage";
import SearchPage from "../pages/cyfms/search/SearchPage";
import ViewPage from "../pages/cyfms/view/ViewPage";
import React from "react";
import { Route, Routes } from "react-router-dom";
import type { FC } from "react";

/**
 * `CyfmsRouter` is used in Popup of `CYFMS` aka \
 * `Child, Youth, and Family Management Services` \
 * module and holds all the nested routes.
 */
const CyfmsRouter: FC = () => (
  <ModuleContextProvider>
    {/* <PopupContextProvider>
      <TabbarContextProvider> */}
    <Routes>
      <Route path="/*" element={<CyfmsPage />} />
      <Route path="search/*" element={<SearchPage />} />
      <Route path="view/:id/*" element={<ViewPage />} />
    </Routes>
    {/* </TabbarContextProvider>
    </PopupContextProvider> */}
  </ModuleContextProvider>
);

export default CyfmsRouter;
