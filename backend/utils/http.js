const { default: axios } = require("axios");

const http = (baseurl) => {
  const instance = axios.create({
    baseURL: baseurl || "",
    timeout: 3000,
  });
  const post = async (url, body) => {
    try {
      const response = await instance.post(url, body);
      return response;
    } catch (err) {
      return err.response;
    }
  };
  return { post };
};

module.exports = http;
