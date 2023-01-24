import axiosInstance from "../../../library/axiosInstance";
import { Appointment } from "./appointmentsDatatypes";

export const getAppointments = async (id: number) =>
  axiosInstance.get(`/participantservice/readOneAppointment/${id}`, {
    headers: { authorization: `Bearer ${localStorage.getItem("jwtToken")}` },
  });

export const postAppointments = async (data: Appointment) =>
  axiosInstance.put(`/participantservice/saveParticipantAppointment`, data, {
    headers: { authorization: `Bearer ${localStorage.getItem("jwtToken")}` },
  });

export const searchAppointments = async (id: number, data: any) =>
  axiosInstance.get(
    `/participantservice/searchParticipantAppointent/${id}/${
      data ? data : null
    }`,
    { headers: { authorization: `Bearer ${localStorage.getItem("jwtToken")}` } }
  );

export const deleteAppointments = async (id: number) =>
  axiosInstance.delete(
    `/participantservice/deleteParticipantAppointment/${id}`,
    { headers: { authorization: `Bearer ${localStorage.getItem("jwtToken")}` } }
  );
