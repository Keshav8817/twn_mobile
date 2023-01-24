export interface Data {
  cgProviderId: number | null;
  referenceId: number | null;
  name: string | null;
  type: string | null;
  priCaregiver: string | null;
  secCaregiver: string | null;
  status: string | null;
}

export interface Search {
  cgProviderId: number | null;
  referenceId: number | null;
  name: any | null;
  type: string | 0;
  status: string | null;
}
