export const getParamsStr = (params: Record<string, string | undefined>) => {
  const arr = [];
  for (const key in params) {
    if (params[key]) {
      arr.push(`${key}=${params[key]}`);
    }
  }
  return "?" + arr.join("&");
};
