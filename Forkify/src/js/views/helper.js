import { TIMEOUT_SECONDS } from './config';

export const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

export const getJSON = async function (url) {
  try {
    const res = await Promise.race([fetch(url), timeout(TIMEOUT_SECONDS)]);
    if (!res.ok) throw new Error(`${res.status}`);
    const data = await res.json();
    return data;
  } catch (e) {
    throw new Error('404:Invalid ID');
  }
};
