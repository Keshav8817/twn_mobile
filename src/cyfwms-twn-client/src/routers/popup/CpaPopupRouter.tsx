import React from "react";
import { Link, Route, Routes } from "react-router-dom";
import type { FC } from "react";
import CulturalProgramOrActivity from "../../pages/cpa/culturalProgramOrActivity/CulturalProgramOrActivity";
import Participants from "../../pages/cpa/Participants/Participants";
import { ParticipantAdd } from "../../pages/cpa/Participants/Add";
import { ParticipantEdit } from "../../pages/cpa/Participants/Edit";
import Attachments from "../../pages/cpa/attachments/Attachments";
import Add from "../../pages/cpa/attachments/Add";
import Edit from "../../pages/cpa/attachments/Edit";
import { AttachmentsContextProvider } from "../../contexts/AttachmentsContext";
import View from "../../pages/cpa/attachments/View";
import ViewPage from "../../pages/cpa/view/ViewPage";

const CpaPopupRouter: FC = () => (
  <>
    <Routes>
      {["add_cpa", "add_cpa/:id"].map((path, index) => (
        <Route path={path} element={<CulturalProgramOrActivity />} />
      ))}

      <Route path="participants/:id" element={<Participants />} />
      <Route path="participants/add/:id" element={<ParticipantAdd />} />
      <Route
        path="participants/edit/:id/:childId"
        element={<ParticipantEdit />}
      />
    </Routes>
    <AttachmentsContextProvider>
      <Routes>
        <Route path="attachments/:id" element={<Attachments />} />
        <Route path="attachments/add/:id" element={<Add />} />
        <Route path="attachments/view/:id/:childId" element={<View />} />
        <Route path="attachments/edit/:id/:childId" element={<Edit />} />
      </Routes>
    </AttachmentsContextProvider>
  </>
);

export default CpaPopupRouter;
