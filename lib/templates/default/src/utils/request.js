import Axios from 'axios';

const request = Axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 10000 // request timeout
});

// request interceptor
request.interceptors.request.use(
  // do something before request is sent
  (config) => {
    /* get token and set request header */

    // const token = store.getters.token;
    // if (token) config.header.Authorization = token;
    return config;
  },
  // do something with request error
  (error) => {
    console.log(error); // for debug
    return Promise.reject(error);
  }
);

// response interceptor
request.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.log(error); // for debug
    /* you can notify the user that something is wrong now */

    return Promise.reject(error);
  }
);

export default request;