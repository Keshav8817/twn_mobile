import axiosInstance from "../../../library/axiosInstance";
import { Data } from "./PresentConcernDatatypes";

export async function getAllPresentConcerns(id: number) {
  const res = await axiosInstance.get(
    `initialcontactservice/readAllPresentConcerns/${id}`,
    {
      headers: { Authorization: "Bearer " + localStorage.getItem("jwtToken") },
    }
  );
  return res;
}

export async function postPresentConcerns(data: Data) {
  const res = await axiosInstance.put(
    `initialcontactservice/saveAllPresentConcerns`,
    data,
    {
      headers: { Authorization: "Bearer " + localStorage.getItem("jwtToken") },
    }
  );
  return res;
}
