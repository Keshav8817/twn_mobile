import axiosInstance from "../../../library/axiosInstance";
import { Data } from "./SearchDataType";

export async function getAllCgRecord(data: Data) {
  const res = await axiosInstance.get(
    `caregiverservice/careGiverProviderSearch/${data.referenceId}/${data.name}/${data.type}/${data.priCaregiver}/${data.secCaregiver}/${data.status}`,
    {
      headers: { Authorization: "Bearer " + localStorage.getItem("jwtToken") },
    }
  );
  return res;
}
