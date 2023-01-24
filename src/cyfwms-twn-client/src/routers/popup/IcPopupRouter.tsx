import React from "react";
import { Link, Route, Routes } from "react-router-dom";
import type { FC } from "react";
import FileDetails from "../../pages/ic/fileDetails/FileDetails";
import ReferralInformation from "../../pages/ic/referralInformation/ReferralInformation";
import IncidentReport from "../../pages/ic/incidentReport/IncidentReport";
import PresentConcerns from "../../pages/ic/presentConcern/PresentConcerns";
import PatientCareInformation from "../../pages/ic/patientCareInformation/PatientCareInformation";
import Participants from "../../pages/ic/participants/Participants";
import { ParticipantAdd } from "../../pages/ic/participants/Add";
import { ParticipantEdit } from "../../pages/ic/participants/Edit";
import ContactNotes from "../../pages/ic/contactNotes/ContactNotes";
import { IcContactNotesAdd } from "../../pages/ic/contactNotes/Add";
import { IcContactNotesEdit } from "../../pages/ic/contactNotes/Edit";
import Attachments from "../../pages/ic/attachments/Attachments";
import Add from "../../pages/ic/attachments/Add";
import Edit from "../../pages/ic/attachments/Edit";
import View from "../../pages/ic/attachments/View";
import Appointments from "../../pages/ic/appointments/Appointments";
import { IcAppointmentAdd } from "../../pages/ic/appointments/Add";
import { IcAppointmentEdit } from "../../pages/ic/appointments/Edit";
import Reminders from "../../pages/ic/reminders/Reminders";
import { ICReminderAdd } from "../../pages/ic/reminders/Add";
import { ICReminderEdit } from "../../pages/ic/reminders/Edit";
import { AttachmentsContextProvider } from "../../contexts/AttachmentsContext copy";

/**
 * `IcRouter` is used in Popup of `CYFMS` aka \
 * `Initil Contact` \
 * module and holds all the nested routes.
 */
const IcPopupRouter: FC = () => (
  <>
    <Routes>
      <Route path="file_details/:id" element={<FileDetails />} />
      {/* {["file_details", "file_details/:id"].map((path, index) => (
        <Route path={path} element={<FileDetails />} />
      ))} */}
      <Route
        path="referral_information/:id"
        element={<ReferralInformation />}
      />
      <Route path="incident_report/:id" element={<IncidentReport />} />
      <Route path="present_concerns/:id" element={<PresentConcerns />} />
      <Route
        path="patient_care_information/:id"
        element={<PatientCareInformation />}
      />
      <Route path="participant/:id" element={<Participants />} />
      <Route path="participant/add/:id" element={<ParticipantAdd />} />
      <Route
        path="participant/edit/:id/:childId"
        element={<ParticipantEdit />}
      />
      <Route path="contact_notes/:id" element={<ContactNotes />} />
      <Route path="contact_notes/add/:id" element={<IcContactNotesAdd />} />
      <Route
        path="contact_notes/edit/:id/:childId"
        element={<IcContactNotesEdit />}
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
    <Routes>
      <Route path="appointment/:id" element={<Appointments />} />
      <Route path="appointment/add/:id" element={<IcAppointmentAdd />} />
      <Route
        path="appointment/edit/:id/:childId"
        element={<IcAppointmentEdit />}
      />
    </Routes>
    <Routes>
      <Route path="reminder/:id" element={<Reminders />} />
      <Route path="reminder/add/:id" element={<ICReminderAdd />} />
      <Route path="reminder/edit/:id/:childId" element={<ICReminderEdit />} />
    </Routes>
    {/* <AttachmentsContextProvider>
      <Routes>
        <Route path="attachments" element={<Attachments />} />
        <Route path="attachments/add" element={<Add />} />
        <Route path="attachments/view" element={<View />} />
        <Route path="attachments/edit" element={<Edit />} />
      </Routes>
    </AttachmentsContextProvider> */}
  </>
);

export default IcPopupRouter;
