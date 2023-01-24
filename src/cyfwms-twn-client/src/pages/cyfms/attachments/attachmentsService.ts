import axiosInstance from "../../../library/axiosInstance";

export const readAttachments = (participantId: number) =>
  axiosInstance.get(
    `participantservice/attachments/read_all/${participantId}`,
    { headers: { authorization: `Bearer ${localStorage.getItem("jwtToken")}` } }
  );
