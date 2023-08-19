interface Options {
  method: string;
}

const BACKEND_URL = import.meta.env.VITE_BACK;

type ApiResponse<T> = {
  message: string;
  data: T;
};

export const sendRequest = async <T>(
  route: string,
  body: Record<string, any> | null,
  options?: Options
) => {
  const thisOptions: Options = {
    method: options?.method || "POST",
  };
  const res = await fetch(`${BACKEND_URL}${route}`, {
    method: thisOptions.method,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(body || {}),
  });
  if (res.ok) {
    const json: ApiResponse<T> = await res.json();
    return json;
  }
};
