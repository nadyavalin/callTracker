interface PartnerData {
  id: string;
  name: string;
  phone: string;
}

interface CallRecord {
  in_out: string;
  id: number;
  date: string;
  candidate_id: number;
  candidate_name: string;
  contact_name: string;
  from_number: string;
  to_number: string;
  status: string;
  person_name: string;
  person_surname: string;
  person_avatar: string;
  partner_data: PartnerData;
  duration: number;
}

export interface CallListResponse {
  duration: number;
  results: CallRecord[];
}

export type InOutCalls = {
  in_out: "1" | "0" | "";
};
