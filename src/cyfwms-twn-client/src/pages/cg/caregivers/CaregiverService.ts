import axiosInstance from "../../../library/axiosInstance";
import { Data } from "./CaregiverDataType";

export async function saveCareGivers(data: Data) {
  const res = await axiosInstance.put(
    `caregiverservice/saveCareGiversBackGroundCheck`,
    data,
    {
      headers: { Authorization: "Bearer " + localStorage.getItem("jwtToken") },
    }
  );
  return res;
}
export async function readCareGivers(id: number) {
  const res = await axiosInstance.get(
    `caregiverservice/readCareGiversBackGroundCheck/${id}`,

    {
      headers: { Authorization: "Bearer " + localStorage.getItem("jwtToken") },
    }
  );
  return res;
}
