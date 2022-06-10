const { default: axios } = require("axios");

const http = (baseurl) => {
  const instance = axios.create({
    baseUrl: baseurl || "",
    timeout: 3000,
  });
  const post = async (...params) => {
    try {
      const response = await instance.post(...params);
      return response;
    } catch (err) {
      return err.response;
    }
  };

  const get = async (...params) => {
    try {
      const response = await instance.get(...params);
      return response;
    } catch (err) {
      return err.response;
    }
  };
  
  return { post, get };
};

module.exports = http;
