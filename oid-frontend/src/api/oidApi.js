import axios from 'axios';
import config from '../app.config';

export const oidApi = () => {
  const instance = axios.create({
    baseURL: config.oidapi,
    timeout: 3000,
  });
  const post = async (path, data) => {
    try {
      const response = await instance.post(path, data, { });
      return response;
    } catch (err) {
      return err.response;
    }
  };

  const get = async (path) => {
    try {
      const response = await instance.get(path, { });
      return response;
    } catch (error) {
      return error.response;
    }
  };
  
  return { post, get, _instance: instance };
};