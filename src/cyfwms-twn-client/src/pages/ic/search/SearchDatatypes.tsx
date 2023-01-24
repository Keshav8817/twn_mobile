export interface Search {
  participantId: number | null;
  referenceId: number | null;
  firstname: string | null;
  middleName: string | null;
  surname: string | null;
  dateOfBirth: string | null;
  maritalStatus: string | null;
  city: string | null;
  workPhone: string | null;
}

export interface Data {
  fileDetailsId: number | null;
  clientName: any | null;
  fileNumber: string | 0;
  caseworker: string | null;
  startingDate: string | null;
  status: string | null;
}
