import axiosInstance from "../library/axiosInstance";
import type { AxiosResponse } from "axios";

/**
 * Codetable data type
 */
export interface Codetable {
  /** Name of codetable */
  type: string;
  /** Codetable values */
  valuesMap: {
    [value: string]: {
      en: string;
      fr?: string;
    };
  };
}

// CYFMS

export const getGendersCodetable = async (): Promise<
  AxiosResponse<Codetable>
> =>
  await axiosInstance.get("dataservice/gender", {
    headers: { authorization: `Bearer ${localStorage.getItem("jwtToken")}` },
  });

export const getMaritalStatusCodetable = async (): Promise<
  AxiosResponse<Codetable>
> =>
  await axiosInstance.get("dataservice/maritalstatus", {
    headers: { authorization: `Bearer ${localStorage.getItem("jwtToken")}` },
  });

export const getProvinceCodetable = async (): Promise<
  AxiosResponse<Codetable>
> =>
  await axiosInstance.get("dataservice/province", {
    headers: { authorization: `Bearer ${localStorage.getItem("jwtToken")}` },
  });

export const getEducationAndEmploymentCodetable = async (): Promise<
  AxiosResponse<Codetable>
> =>
  await axiosInstance.get("dataservice/education", {
    headers: { authorization: `Bearer ${localStorage.getItem("jwtToken")}` },
  });

export const getTypesOfEmployeeCodetable = async (): Promise<
  AxiosResponse<Codetable>
> =>
  await axiosInstance.get("dataservice/typeofemployee", {
    headers: { authorization: `Bearer ${localStorage.getItem("jwtToken")}` },
  });

export const getRolesCodetable = async (): Promise<AxiosResponse<Codetable>> =>
  await axiosInstance.get("dataservice/role", {
    headers: { authorization: `Bearer ${localStorage.getItem("jwtToken")}` },
  });

export const getAppointmentsStatusCodetable = async (): Promise<
  AxiosResponse<Codetable>
> =>
  await axiosInstance.get("dataservice/appoinmentstatus", {
    headers: { authorization: `Bearer ${localStorage.getItem("jwtToken")}` },
  });

export const getRemindersStatusCodetable = async (): Promise<
  AxiosResponse<Codetable>
> =>
  await axiosInstance.get("dataservice/reminderstatus", {
    headers: { authorization: `Bearer ${localStorage.getItem("jwtToken")}` },
  });

export const getFrequencyCodetable = async (): Promise<
  AxiosResponse<Codetable>
> =>
  await axiosInstance.get("dataservice/frequency", {
    headers: { authorization: `Bearer ${localStorage.getItem("jwtToken")}` },
  });

// IC

export const getIcrStatusCodetable = async (): Promise<
  AxiosResponse<Codetable>
> =>
  await axiosInstance.get("dataservice/initialContactStatus", {
    headers: { authorization: `Bearer ${localStorage.getItem("jwtToken")}` },
  });

export const getIcReferralCodetable = async (): Promise<
  AxiosResponse<Codetable>
> =>
  await axiosInstance.get("dataservice/initialContactReferral", {
    headers: { authorization: `Bearer ${localStorage.getItem("jwtToken")}` },
  });

export const getIcRisksCodetable = async (): Promise<
  AxiosResponse<Codetable>
> =>
  await axiosInstance.get("dataservice/risk", {
    headers: { authorization: `Bearer ${localStorage.getItem("jwtToken")}` },
  });

export const getIcPresentConcernsCodetable = async (): Promise<
  AxiosResponse<Codetable>
> =>
  await axiosInstance.get("dataservice/presentConcerns", {
    headers: { authorization: `Bearer ${localStorage.getItem("jwtToken")}` },
  });

export const getIcMentalHealthOrSubstanceAbuseCodetable = async (): Promise<
  AxiosResponse<Codetable>
> =>
  await axiosInstance.get("dataservice/mentalHealthOrSubstanceAbuse", {
    headers: { authorization: `Bearer ${localStorage.getItem("jwtToken")}` },
  });

export const getIcTypesOfPatientsCodetable = async (): Promise<
  AxiosResponse<Codetable>
> =>
  await axiosInstance.get("dataservice/typeOfPatient", {
    headers: { authorization: `Bearer ${localStorage.getItem("jwtToken")}` },
  });

export const getIcContactMethodsCodetable = async (): Promise<
  AxiosResponse<Codetable>
> =>
  await axiosInstance.get("dataservice/contactMethod", {
    headers: { authorization: `Bearer ${localStorage.getItem("jwtToken")}` },
  });

// CPA

export const getCpaTypesCodetable = async (): Promise<
  AxiosResponse<Codetable>
> =>
  await axiosInstance.get("dataservice/culturaltype", {
    headers: { authorization: `Bearer ${localStorage.getItem("jwtToken")}` },
  });

export const doGetCPACulturalStatusAPI = async (): Promise<
  AxiosResponse<Codetable>
> =>
  await axiosInstance.get("dataservice/culturalstatus", {
    headers: { authorization: `Bearer ${localStorage.getItem("jwtToken")}` },
  });

// CG

export const getCgStatusCodetable = async (): Promise<
  AxiosResponse<Codetable>
> =>
  await axiosInstance.get("dataservice/caregiverstatus", {
    headers: { authorization: `Bearer ${localStorage.getItem("jwtToken")}` },
  });

export const getCgTypeCodetable = async (): Promise<AxiosResponse<Codetable>> =>
  await axiosInstance.get("dataservice/caregivertype", {
    headers: { authorization: `Bearer ${localStorage.getItem("jwtToken")}` },
  });

export const getCgBgCheckStatusCodetable = async (): Promise<
  AxiosResponse<Codetable>
> =>
  await axiosInstance.get("dataservice/caregiverbackgroundstatus", {
    headers: { authorization: `Bearer ${localStorage.getItem("jwtToken")}` },
  });
