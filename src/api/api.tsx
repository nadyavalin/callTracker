import { useEffect, useState } from "react";
import axios from "axios";
import { CallListResponse } from "../types";

const TOKEN = "testtoken";

export const useFetchCallList = (
  dateStart: string,
  dateEnd: string,
  inOut: string
) => {
  const src = "https://api.skilla.ru/mango/getList";
  const [data, setData] = useState<CallListResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.post<CallListResponse>(
          src,
          {
            date_start: dateStart,
            date_end: dateEnd,
            in_out: inOut,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${TOKEN}`,
            },
          }
        );
        console.log(response);
        setData(response.data);
      } catch (err) {
        if (axios.isAxiosError(err)) {
          setError(err.message);
        } else {
          setError("An unexpected error occurred");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [dateStart, dateEnd, inOut]);

  return { data, loading, error };
};
