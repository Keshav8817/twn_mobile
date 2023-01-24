import CgPage from "../pages/cg/cg/CgPage";
import React from "react";
import { Route, Routes } from "react-router-dom";
import type { FC } from "react";
import SearchPage1 from "../pages/cg/search/SearchPage1";
import ViewPage from "../pages/cg/view/ViewPage";

/**
 * `CgRouter` is used in Popup of `CG` aka `Caregivers` module \
 *  and holds all of it's associated routes.
 */
const CgRouter: FC = () => (
  <Routes>
    <Route path="/*" element={<CgPage />} />
    <Route path="search/*" element={<SearchPage1 />} />
    <Route path={`view/:id/*`} element={<ViewPage />} />
  </Routes>
);

export default CgRouter;
