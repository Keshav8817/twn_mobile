export interface SearchQuery {
  referenceId: number | null;
  participantId: number | null;
  firstname: string | null;
  middleName: string | null;
  surname: string | null;
  dateOfBirth: string | null;
  maritalStatus: string | null;
  city: string | null;
  workPhone: string | null;
}

export interface SearchResult {
  referenceId: number;
  participantId: number;
  firstname: string;
  middleName: string;
  surname: string;
  dateOfBirth: string;
  maritalStatus: string;
  city: string;
  workPhone: string;
}
