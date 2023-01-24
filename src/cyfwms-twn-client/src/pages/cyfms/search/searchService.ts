import axiosInstance from "../../../library/axiosInstance";
import type { SearchQuery, SearchResult } from "./searchDatatypes";
import type { AxiosResponse } from "axios";

export const readSearch = async (data: SearchQuery): Promise<AxiosResponse> =>
  axiosInstance.get<SearchResult[]>(
    `participantservice/searchParticipants/${data.referenceId}/${data.firstname}/${data.middleName}/${data.surname}/${data.dateOfBirth}/${data.maritalStatus}/${data.city}/${data.workPhone}`,
    {
      headers: { authorization: `Bearer ${localStorage.getItem("jwtToken")}` },
    }
  );
