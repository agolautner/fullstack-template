import axios from 'axios';
import config from '../app.config';

export const toDoApi = () => {
  const instance = axios.create({
    baseURL: config.todoapi,
    timeout: 3000,
  });
  const post = async (path, data) => {
    try {
      const response = await instance.post(path, data, {
        headers: {
            'authorization': localStorage.getItem('token')
        }
      });
      console.log(response);
      return response;
    } catch (err) {
      return err.response;
    }
  };

  const get = async (path) => {
    try {
      const response = await instance.get(path, {
        headers: {
          authorization: localStorage.getItem("token"),
        },
      });
      return response;
    } catch (error) {
      console.log(error.response.status);
      console.log(error.response.data);
      return error.response;
    }
  };
  
  return { post, get, _instance: instance };
};