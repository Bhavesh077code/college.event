
const BASE_URL = "http://localhost:9000/api";

export const api = async (url, method = "GET", body = null, isForm = false) => {
  const options = {
    method,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };

  if (body && !isForm) {
    options.headers["Content-Type"] = "application/json";
    options.body = JSON.stringify(body);
  }

  if (body && isForm) {
    options.body = body;
  }

  const res = await fetch(BASE_URL + url, options);
  return res.json();
};
