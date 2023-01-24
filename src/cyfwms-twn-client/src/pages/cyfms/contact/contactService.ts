import axiosInstance from "../../../library/axiosInstance";
import type { Contact } from "./contactDatatypes";
import type { AxiosResponse } from "axios";

export const readContact = async (
  participantId: number
): Promise<AxiosResponse> =>
  axiosInstance.get<Contact>(
    `participantservice/readParticipantContact/${participantId}`,
    {
      headers: { authorization: `Bearer ${localStorage.getItem("jwtToken")}` },
    }
  );

export const saveContact = async (formData: Contact): Promise<AxiosResponse> =>
  axiosInstance.put<Contact>(
    "participantservice/saveParticipantContact/",
    formData,
    {
      headers: { authorization: `Bearer ${localStorage.getItem("jwtToken")}` },
    }
  );
