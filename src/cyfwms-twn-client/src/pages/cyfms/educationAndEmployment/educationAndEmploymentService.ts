import axiosInstance from "../../../library/axiosInstance";
import type { EducationAndEmployment } from "./educationAndEmploymentDatatypes";
import type { AxiosResponse } from "axios";

export const readEducationAndEmployment = async (
  participantId: number
): Promise<AxiosResponse> =>
  axiosInstance.get<EducationAndEmployment>(
    `participantservice/readEmploymentAndEducation/${participantId}`,
    {
      headers: { authorization: `Bearer ${localStorage.getItem("jwtToken")}` },
    }
  );

export const saveEducationAndEmployment = async (
  formData: EducationAndEmployment
): Promise<AxiosResponse> =>
  axiosInstance.put<EducationAndEmployment>(
    "participantservice/saveEmploymentAndEducation/",
    formData,
    {
      headers: { authorization: `Bearer ${localStorage.getItem("jwtToken")}` },
    }
  );
