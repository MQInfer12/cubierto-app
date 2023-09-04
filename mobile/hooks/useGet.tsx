import { useEffect, useState } from "react";

const BACKEND_URL = process.env.EXPO_PUBLIC_BACKEND;

type ApiResponse<T> = {
  message: string, 
  data: T
}

type Data<T> = ApiResponse<T> | null

interface ReturnData<T> {
  res: Data<T>
  loading: boolean
  setRes: React.Dispatch<React.SetStateAction<Data<T>>>
  getData: () => void
}

export const useGet = <T,>(route: string): ReturnData<T> => {
  const [res, setRes] = useState<Data<T>>(null);
  const [loading, setLoading] = useState(true);

  const getData = async () => {
    setLoading(true);
    const res = await fetch(`${BACKEND_URL}${route}`);
    if(res.ok) {
      const resJson = await res.json();
      setRes(resJson);
    }
    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, []);

  return {
    res,
    loading,
    setRes,
    getData
  }
}