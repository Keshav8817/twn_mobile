import axiosInstance from "../../../library/axiosInstance";
import type { OtherInformation } from "./otherInformationDatatypes";
import type { AxiosResponse } from "axios";

export const readOtherInformation = async (
  participantId: number
): Promise<AxiosResponse> =>
  axiosInstance.get<OtherInformation>(
    `participantservice/readParticipantOtherInformation/${participantId}`,
    {
      headers: { authorization: `Bearer ${localStorage.getItem("jwtToken")}` },
    }
  );

export const saveOtherInformation = async (
  formData: OtherInformation
): Promise<AxiosResponse> =>
  axiosInstance.put<OtherInformation>(
    "participantservice/saveParticipantOtherInformation",
    formData,
    {
      headers: { authorization: `Bearer ${localStorage.getItem("jwtToken")}` },
    }
  );
