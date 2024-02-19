import axios from "axios";

// Function to shorten the URL
const shortenURL = ({ url, user_id }) => {
  const endpoint = "/api/shorten";
  return new Promise(async (resolve, reject) => {
    axios
      .post(endpoint, {
        url: url,
        user_id: user_id,
      })
      .then((data) => {
        resolve(data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

// get all links
const getLinks = ({ user_id }) => {
  const endpoint = "/api/links";
  return new Promise(async (resolve, reject) => {
    axios
      .post(endpoint, {
        user_id: user_id,
      })
      .then((data) => {
        resolve(data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

// delete specific link
const deleteLink = ({ user_id, link_id }) => {
  const endpoint = "/api/user/delete-link";
  return new Promise(async (resolve, reject) => {
    axios
      .post(endpoint, {
        user_id: user_id,
        link_id: link_id,
      })
      .then((data) => {
        resolve(data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
export { shortenURL, getLinks,deleteLink };
