import axiosInstance from "../../../library/axiosInstance";
import { Data } from "./CareProviderDataType";

export async function saveCareProvider(data: Data) {
  const res = await axiosInstance.put(
    `caregiverservice/care_provider/save`,
    data,
    {
      headers: { Authorization: "Bearer " + localStorage.getItem("jwtToken") },
    }
  );
  return res;
}
export async function readCareProvider(id: number) {
  const res = await axiosInstance.get(
    `caregiverservice/care_provider/read/${id}`,

    {
      headers: { Authorization: "Bearer " + localStorage.getItem("jwtToken") },
    }
  );
  return res;
}
export async function doRemove(id: number) {
  const res = await axiosInstance.delete(
    `caregiverservice/care_provider/remove/${id}`,

    {
      headers: { Authorization: "Bearer " + localStorage.getItem("jwtToken") },
    }
  );
  return res;
}
