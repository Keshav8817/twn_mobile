import axiosInstance from "../../../library/axiosInstance";
import { Data } from "./PatientCareInformationDatatypes";

export async function getAllPatientCareInfo(id: number) {
  const res = await axiosInstance.get(
    `initialcontactservice/readAllPatientCareInfo/${id}`,
    {
      headers: { Authorization: "Bearer " + localStorage.getItem("jwtToken") },
    }
  );
  return res;
}

export async function postPatientCareInfo(data: Data) {
  const res = await axiosInstance.put(
    `initialcontactservice/saveAllPatientCareInfo`,
    data,
    {
      headers: { Authorization: "Bearer " + localStorage.getItem("jwtToken") },
    }
  );
  return res;
}
