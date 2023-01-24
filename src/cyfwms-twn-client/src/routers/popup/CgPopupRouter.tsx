import React from "react";
import { Route, Routes } from "react-router-dom";
import CareProvider from "../../pages/cg/careProvider/CareProvider";
import Capacity from "../../pages/cg/capacity/Capacity";
import Caregivers from "../../pages/cg/caregivers/Caregivers";
import ContactNotes from "../../pages/cg/ContactNotes/ContactNotes";
import Appointments from "../../pages/cg/appointments/Appointments";
import Reminders from "../../pages/cg/Reminders/Reminders";
import { AttachmentsContextProvider } from "../../contexts/AttachmentsContext";
import Attachments from "../../pages/cg/attachments/Attachments";
import Add from "../../pages/cg/attachments/Add";
import { CgReminderEdit } from "../../pages/cg/Reminders/Edit";
import { CgReminderAdd } from "../../pages/cg/Reminders/Add";
import { CgAppointmentAdd } from "../../pages/cg/appointments/Add";
import { IcContactNotesAdd } from "../../pages/cg/ContactNotes/Add";
import { CgContactNotesEdit } from "../../pages/cg/ContactNotes/Edit";
import SearchPage1 from "../../pages/cg/search/SearchPage1";
import { CgAppointmentEdit } from "../../pages/cg/appointments/Edit";
import View from "../../pages/cg/attachments/View";
import Edit from "../../pages/cg/attachments/Edit";

const CgPopupRouter = () => {
  return (
    <div>
      <>
        <Routes>
          <Route path="care_provider/:id" element={<CareProvider />} />

          <Route path="capacity/:id" element={<Capacity />} />
          <Route path="caregivers/:id" element={<Caregivers />} />
          <Route path="contact_notes/:id" element={<ContactNotes />} />
          <Route path="contact_notes/add/:id" element={<IcContactNotesAdd />} />
          <Route
            path="contact_notes/edit/:id/:childId"
            element={<CgContactNotesEdit />}
          />
          <Route path="appointments/:id" element={<Appointments />} />
          <Route path="appointment/add/:id" element={<CgAppointmentAdd />} />
          <Route
            path="appointment/edit/:id/:childId"
            element={<CgAppointmentEdit />}
          />
          <Route path="reminders/:id" element={<Reminders />} />
          <Route path="reminder/add/:id" element={<CgReminderAdd />} />
          <Route
            path="reminder/edit/:id/:childId"
            element={<CgReminderEdit />}
          />
        </Routes>

        <AttachmentsContextProvider>
          <Routes>
            <Route path="attachments/:id" element={<Attachments />} />
            <Route path="attachments/add/:id" element={<Add />} />

            <Route path="attachments/edit/:id/:childId" element={<Edit />} />
            <Route path="attachments/view/:id/:childId" element={<View />} />
          </Routes>
        </AttachmentsContextProvider>
      </>
    </div>
  );
};

export default CgPopupRouter;
