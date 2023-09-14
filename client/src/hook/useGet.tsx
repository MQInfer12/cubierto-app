import { useEffect, useState } from "react";

const BACKEND_URL = import.meta.env.VITE_BACK;

type ApiResponse<T> = {
  message: string, 
  data: T
}

type Data<T> = ApiResponse<T> | null

interface ReturnData<T> {
  res: Data<T>
  getData: () => void
}

export const useGet = <T,>(route: string): ReturnData<T> => {
  const [res, setRes] = useState<Data<T>>(null);
  const getData = async () => {

    const res = await fetch(`${BACKEND_URL}${route}`);
    if(res.ok) {
      const resJson = await res.json();
      setRes(resJson);
    }
  };
  useEffect(() => {
    getData();
  }, []);
  return {
    res,
    getData,
  }
}