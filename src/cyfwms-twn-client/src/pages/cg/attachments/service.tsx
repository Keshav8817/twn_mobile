import axiosInstance from "../../../library/axiosInstance";
import { Data } from "./AttachmentDataTypes";

export async function getCgAttachments(id: number) {
  const res = await axiosInstance.get(
    `caregiverservice/attachments/read_one/${id}`,
    {
      headers: { Authorization: "Bearer " + localStorage.getItem("jwtToken") },
    }
  );
  return res;
}

export async function postCgAttachments(data: any) {
  const res = await axiosInstance.put(
    `caregiverservice/attachments/save_one`,
    data,
    {
      headers: { Authorization: "Bearer " + localStorage.getItem("jwtToken") },
    }
  );
  return res;
}

export async function searchCgAttachments(id: number) {
  const res = await axiosInstance.get(
    `caregiverservice/attachments/read_all/${id}`,
    {
      headers: { Authorization: "Bearer " + localStorage.getItem("jwtToken") },
    }
  );
  return res;
}

export async function deleteCgAttachments(id: number) {
  const res = await axiosInstance.delete(
    `caregiverservice/attachments/remove_one/${id}`,
    {
      headers: { Authorization: "Bearer " + localStorage.getItem("jwtToken") },
    }
  );
  return res;
}
