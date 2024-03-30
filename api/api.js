import axios from "axios";
const BASE_URL = process.env.NEXT_PUBLIC_DOMAIN;

// Increment the visit count for a given link
const incrementLinkVisitCount = async (linkID) => {
  const endpoint = `/api/track/link`;
  return new Promise((resolve, reject) => {
    axios
      .post(BASE_URL + endpoint, { link_id: linkID })
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

module.exports = { incrementLinkVisitCount };
