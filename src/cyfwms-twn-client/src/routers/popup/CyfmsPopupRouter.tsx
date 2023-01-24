import { AttachmentsContextProvider } from "../../contexts/AttachmentsContext";
import AppointmentsPage from "../../pages/cyfms/appointments/AppointmentsPage";
import AddAppointmentPage from "../../pages/cyfms/appointments/AddAppointmentPage";
import EditAppointmentPage from "../../pages/cyfms/appointments/EditAppointmentPage";
import AddAttachmentPage from "../../pages/cyfms/attachments/AddAttachmentPage";
import AttachmentsPage from "../../pages/cyfms/attachments/AttachmentsPage";
import EditAttachmentPage from "../../pages/cyfms/attachments/EditAttachmentPage";
import ViewAttachmentPage from "../../pages/cyfms/attachments/ViewAttachmentPage";
import Contact from "../../pages/cyfms/contact/ContactPage";
import CounselorsPage from "../../pages/cyfms/counselors/CounselorsPage";
import CriminalHistoryPage from "../../pages/cyfms/criminalHistory/CriminalHistoryPage";
import EducationAndEmployment from "../../pages/cyfms/educationAndEmployment/EducationAndEmploymentPage";
import FamilyPhysiciansPage from "../../pages/cyfms/familyPhysicians/FamilyPhysiciansPage";
import HouseholdMembersPage from "../../pages/cyfms/householdMembers/HouseholdMembersPage";
import OtherInformation from "../../pages/cyfms/otherInformation/OtherInformationPage";
import RemindersPage from "../../pages/cyfms/reminders/RemindersPage";
import AddReminderPage from "../../pages/cyfms/reminders/AddReminderPage";
import EditReminderPage from "../../pages/cyfms/reminders/EditReminderPage";
import RegisterPage from "../../pages/cyfms/register/RegisterPage";
import React from "react";
import { Route, Routes } from "react-router-dom";
import type { FC } from "react";

/**
 * `CyfmsRouter` is used in Popup of `CYFMS` aka \
 * `Child, Youth, and Family Management Services` \
 * module and holds all the nested routes.
 */
const CyfmsPopupRouter: FC = () => (
  <>
    <Routes>
      <Route path="register/:id" element={<RegisterPage />} />
      <Route path="contact/:id" element={<Contact />} />
      <Route path="household_members/:id" element={<HouseholdMembersPage />} />
      <Route
        path="education_and_employment/:id"
        element={<EducationAndEmployment />}
      />
      <Route path="criminal_history/:id" element={<CriminalHistoryPage />} />
      <Route path="family_physicians/:id" element={<FamilyPhysiciansPage />} />
      <Route path="counselors/:id" element={<CounselorsPage />} />
      <Route path="other_information/:id" element={<OtherInformation />} />
      <Route path="appointment/:id" element={<AppointmentsPage />} />
      <Route path="appointment/add/:id" element={<AddAppointmentPage />} />
      <Route
        path="appointment/edit/:id/:childId"
        element={<EditAppointmentPage />}
      />
      <Route path="reminder/:id" element={<RemindersPage />} />
      <Route path="reminder/add/:id" element={<AddReminderPage />} />
      <Route path="reminder/edit/:id/:childId" element={<EditReminderPage />} />
    </Routes>
    <AttachmentsContextProvider>
      <Routes>
        <Route path="attachments/:id" element={<AttachmentsPage />} />
        <Route path="attachments/add/:id" element={<AddAttachmentPage />} />
        <Route
          path="attachments/view/:id/:childId"
          element={<ViewAttachmentPage />}
        />
        <Route
          path="attachments/edit/:id/:childId"
          element={<EditAttachmentPage />}
        />
      </Routes>
    </AttachmentsContextProvider>
  </>
);

export default CyfmsPopupRouter;
