import React from "react";
import { Route, Routes } from "react-router-dom";
import type { FC } from "react";
import IcPage from "../pages/ic/ic/IcPage";
import SearchPage from "../pages/ic/search/SearchPage";
import ViewPage from "../pages/ic/view/ViewPage";

/**
 * `IcRouter` is used in Popup of `IC` aka \
 * `initialContact` \
 * module and holds all the nested routes.
 */
const IcRouter: FC = () => (
  <Routes>
    <Route path="/*" element={<IcPage />} />
    <Route path="search/*" element={<SearchPage />} />
    <Route path="view/:id/*" element={<ViewPage />} />
  </Routes>
);

export default IcRouter;
