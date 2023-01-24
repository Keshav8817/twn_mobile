import axiosInstance from "../../../library/axiosInstance";
import { Data } from "./ContactNotesDataType";

export async function saveCgContactNotes(data: Data) {
  const res = await axiosInstance.put(
    `caregiverservice/saveAllContactNotes`,
    data,
    {
      headers: { Authorization: "Bearer " + localStorage.getItem("jwtToken") },
    }
  );
  return res;
}
export async function readCgContactNotes(id: number) {
  const res = await axiosInstance.get(
    `caregiverservice/getAllContactNotes/${id}`,

    {
      headers: { Authorization: "Bearer " + localStorage.getItem("jwtToken") },
    }
  );
  return res;
}
export async function deleteCgContactNotes(id: number) {
  const res = await axiosInstance.delete(
    `caregiverservice/removeContactNotes/${id}`,
    {
      headers: { Authorization: "Bearer " + localStorage.getItem("jwtToken") },
    }
  );
  return res;
}
export async function searchCgContactNotes(id: number, data: any) {
  const res = await axiosInstance.get(
    `caregiverservice/searchContactNotes/${id}/${data ? data : null}`,
    {
      headers: { Authorization: "Bearer " + localStorage.getItem("jwtToken") },
    }
  );
  return res;
}
