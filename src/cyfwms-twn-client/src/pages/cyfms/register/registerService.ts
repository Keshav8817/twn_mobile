import axiosInstance from "../../../library/axiosInstance";
import type { Register } from "./registerDatatypes";

export const readIdentity = async (participantId: number) =>
  axiosInstance.get<Register>(
    `participantservice/readParticipantIdentity/${participantId}`,
    {
      headers: { authorization: `Bearer ${localStorage.getItem("jwtToken")}` },
    }
  );

export const saveIdentity = async (data: FormData) =>
  axiosInstance.put<Register>(
    "participantservice/saveParticipantIdentity",
    data,
    {
      headers: {
        authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
        "Content-Type": "multipart/form-data",
      },
    }
  );

export const removeIdentity = async (referenceId: number) =>
  axiosInstance.delete(`participantservice/removeParticipant/${referenceId}`, {
    headers: { authorization: `Bearer ${localStorage.getItem("jwtToken")}` },
  });
