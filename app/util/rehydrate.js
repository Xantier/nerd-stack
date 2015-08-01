import { set as setCache } from'./cache';

export default function () {
  const data = window.__DATA__.data;
  const token = window.__DATA__.token;
  if (data) {
    Object.keys(data).forEach((key) => {
      setCache(token, key, data[key]);
    });
  }
  delete window.__DATA__;
  return token;
}
