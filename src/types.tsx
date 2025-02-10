interface CallRecord {
  id: number;
  date: string;
  candidate_name: string;
  duration: number;
  status: string;
  from_number: string;
  to_number: string;
}

export interface CallListResponse {
  calls: CallRecord[];
  total: number;
  page: number;
  per_page: number;
}
