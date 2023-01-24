import useNavigate from "react-router-dom";
import type { FormEvent, ReactElement } from "react";
import axiosInstance from "../../../library/axiosInstance";
import axios from "axios";
import { Data } from "./FileDetailsDatatypes";

export async function saveFileDetails(data: Data) {
  const res = await axiosInstance.put(
    `/initialcontactservice/saveAllFileDetails`,
    data,
    {
      headers: { Authorization: "Bearer " + localStorage.getItem("jwtToken") },
    }
  );
  return res;
}

export async function readFileDetails(id: number) {
  const res = await axiosInstance.get(
    `/initialcontactservice/readAllFileDetails/${id}`,
    {
      headers: { Authorization: "Bearer " + localStorage.getItem("jwtToken") },
    }
  );
  return res;
}
export async function removeFileDetails(id: number) {
  const res = await axiosInstance.delete(
    `/initialcontactservice/remove/${id}`,

    {
      headers: { Authorization: "Bearer " + localStorage.getItem("jwtToken") },
    }
  );
  return res;
}
