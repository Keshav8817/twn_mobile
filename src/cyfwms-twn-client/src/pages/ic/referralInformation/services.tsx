import axiosInstance from "../../../library/axiosInstance";
import { Data } from "./referralInformationDatatypes";

export async function getAllReferralInfo(id: number) {
  const res = await axiosInstance.get(
    `initialcontactservice/readAllReferralInfo/${id}`,
    {
      headers: { Authorization: "Bearer " + localStorage.getItem("jwtToken") },
    }
  );
  return res;
}

export async function postAllReferralInfo(data: Data) {
  const res = await axiosInstance.put(
    `initialcontactservice/saveAllReferralInfo`,
    data,
    {
      headers: { Authorization: "Bearer " + localStorage.getItem("jwtToken") },
    }
  );

  return res;
}
