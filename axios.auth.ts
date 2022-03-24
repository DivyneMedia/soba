import axios from "axios";
import appContants from "./constants/appConstants";
import Base64 from "./utils/base64";

axios.defaults.baseURL = appContants.BASE_URL

// axios.defaults.headers.common = {
//     Authorization: "Basic YWRtaW46MTIzNA==",
//     "X-API-KEY": "CODEX@123"
// }

axios.interceptors.request.use(function (config) {

    const basicAuth = 'Basic ' + Base64.btoa(appContants.orgId + ':' + appContants.apiKey)

    config.headers = {
        Authorization: basicAuth
    }

    // config.auth = {
    //     username: appContants.orgId,
    //     password: appContants.apiKey
    // }

    // Do something before request is sent
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });

// const instance = axios.create({
//   baseURL: appContants.BASE_URL,
//   timeout: 30000,
//   headers: {
//     Authorization: "Basic YWRtaW46MTIzNA==",
//     "X-API-KEY": "CODEX@123"
//   }
// });


export default axios
