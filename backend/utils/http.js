const { default: axios } = require("axios");

const http = (baseurl) => {
  const instance = axios.create({
    baseURL: baseurl || "",
    timeout: 3000,
  });
  const post = async (...params) => {
    try {
      const response = await instance.post(...params);
      console.log("BODY:", response.data);
      return response;
    } catch (err) {
      return err.response;
    }
  };
  return { post };
};

module.exports = http;
