import axiosInstance from "../../../library/axiosInstance";
import { Data } from "./AppointmentDataType";

export async function getCgAppointment(id: number) {
  const res = await axiosInstance.get(
    `caregiverservice/readOneAppointment/${id}`,
    {
      headers: { Authorization: "Bearer " + localStorage.getItem("jwtToken") },
    }
  );
  return res;
}

export async function postCgAppointment(data: any) {
  const res = await axiosInstance.put(
    `caregiverservice/saveCGAppointment`,
    data,
    {
      headers: { Authorization: "Bearer " + localStorage.getItem("jwtToken") },
    }
  );
  return res;
}

export async function searchCgAppointment(id: number, data: any) {
  const res = await axiosInstance.get(
    `caregiverservice/searchCGAppointment/${id}/${data ? data : null}`,
    {
      headers: { Authorization: "Bearer " + localStorage.getItem("jwtToken") },
    }
  );
  return res;
}

export async function deleteCgAppointment(id: number) {
  const res = await axiosInstance.delete(
    `caregiverservice/deleteCGAppointment/${id}`,
    {
      headers: { Authorization: "Bearer " + localStorage.getItem("jwtToken") },
    }
  );
  return res;
}
