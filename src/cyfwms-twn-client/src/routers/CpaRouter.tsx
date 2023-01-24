import { PopupContextProvider } from "../contexts/PopupContext";
import React from "react";
import { Route, Routes } from "react-router-dom";
import type { FC } from "react";

import { TabbarContextProvider } from "../contexts/TabbarContext";
import CpaPage from "../pages/cpa/cpa/CpaPage";
import SearchPage from "../pages/cpa/search/SearchPage";
import CpaViewPage from "../pages/cpa/view/CpaViewPage";
import AddCpaViewPage from "../pages/cpa/view/ViewPage";
import ParticipantsViewPage from "../pages/cpa/view/ParticipantsViewPage";
import ViewPage from "../pages/cpa/view/ViewPage";

/**
 * `CPARouter` is used in Popup of `CPA` aka \
 * `cpa` \
 * module and holds all the nested routes.
 */
const CpaRouter: FC = () => (
  <PopupContextProvider>
    <TabbarContextProvider>
      <Routes>
        <Route path="/*" element={<CpaPage />} />
        <Route path="search/*" element={<SearchPage />} />
        {/* <Route path="view/*" element={<CpaViewRouter />} /> */}
        <Route path="view/:id/*" element={<ViewPage />} />
      </Routes>
    </TabbarContextProvider>
  </PopupContextProvider>
);

export default CpaRouter;
