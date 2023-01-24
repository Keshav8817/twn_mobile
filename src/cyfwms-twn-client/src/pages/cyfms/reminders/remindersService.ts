import axiosInstance from "../../../library/axiosInstance";
import type { Reminder } from "./remindersDatatypes";

export const getHrReminder = (id: number) =>
  axiosInstance.get(`participantservice/readParticipantReminder/${id}`, {
    headers: { authorization: `Bearer ${localStorage.getItem("jwtToken")}` },
  });

export const postHrReminder = (data: any) =>
  axiosInstance.put(`participantservice/saveParticipantReminder`, data, {
    headers: { authorization: `Bearer ${localStorage.getItem("jwtToken")}` },
  });

export const searchHrReminder = (id: number, data: any) =>
  axiosInstance.get(
    `participantservice/searchParticipantReminder/${id}/${data ? data : null}`,
    { headers: { authorization: `Bearer ${localStorage.getItem("jwtToken")}` } }
  );

export const deleteHrReminder = (id: number) =>
  axiosInstance.delete(`participantservice/removeParticipantReminder/${id}`, {
    headers: { authorization: `Bearer ${localStorage.getItem("jwtToken")}` },
  });
