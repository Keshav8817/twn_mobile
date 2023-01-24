import axiosInstance from "../../../library/axiosInstance";

export async function getCgReminder(id: number) {
  const res = await axiosInstance.get(`caregiverservice/readCGReminder/${id}`, {
    headers: { Authorization: "Bearer " + localStorage.getItem("jwtToken") },
  });
  return res;
}

export async function postCgReminder(data: any) {
  const res = await axiosInstance.put(
    `caregiverservice/saveCareGiverReminder`,
    data,
    {
      headers: { Authorization: "Bearer " + localStorage.getItem("jwtToken") },
    }
  );
  return res;
}

export async function searchCgReminder(id: number, data: any) {
  const res = await axiosInstance.get(
    `caregiverservice/searchCGReminder/${id}/${data ? data : null}`,
    {
      headers: { Authorization: "Bearer " + localStorage.getItem("jwtToken") },
    }
  );
  return res;
}

export async function deleteCgReminder(id: number) {
  const res = await axiosInstance.delete(
    `caregiverservice/removeCGReminder/${id}`,
    {
      headers: { Authorization: "Bearer " + localStorage.getItem("jwtToken") },
    }
  );
  return res;
}
