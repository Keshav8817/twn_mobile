import axiosInstance from "../../../library/axiosInstance";
import { Data } from "./CapacityDataType";

export async function saveCapacity(data: Data) {
  const res = await axiosInstance.put(`caregiverservice/saveCapacity`, data, {
    headers: { Authorization: "Bearer " + localStorage.getItem("jwtToken") },
  });
  return res;
}
export async function readCapacity(id: number) {
  const res = await axiosInstance.get(
    `caregiverservice/readCapacity/${id}`,

    {
      headers: { Authorization: "Bearer " + localStorage.getItem("jwtToken") },
    }
  );
  return res;
}
