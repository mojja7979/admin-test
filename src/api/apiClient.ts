import axios from "axios";
const host: any = process.env.REACT_APP_API_URL;

const apiClient = axios.create({
  baseURL: host,
  withCredentials: false,
  timeout: 5000,
  headers: { "Content-Type": "application/json;" },
});

apiClient.interceptors.request.use(
  async (config) => {
    console.log("apiClient config " + config?.url);
    const accessToken = sessionStorage.getItem("accessToken");
    // const accessToken ='eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbkBnbWFpbC5jb20iLCJhdXRoIjoiUk9MRV9BRE1JTiIsImV4cCI6MTY0NDg1OTA2OH0.Q2hoWNziPdbCgyhPuLEM_u1WJ46UnfjMr1ZgeBYCSQXUL_4YM0giHH-fjDebXFYHfT926puPhtXk99107LyZ9A';
    if (accessToken) {
      config.headers!.Authorization = "Bearer " + accessToken;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    // AsyncStorage에 저장된 refreshToken 가져옴
    const refreshToken = sessionStorage.getItem("refreshToken");
    // 요청에 실패한 객체의 정보
    const originalRequest = error.config;

    // status : 403 ( accessToken 만료 )
    // status : 502 ( 토큰 만료 및 리프레시 토큰 만료)
    // 반복 호출 방지를 위한 retry
    if (error?.response?.status === 403 && !originalRequest.retry) {
      originalRequest.retry = true;
      if (refreshToken) {
        const refreshConfig = {
          headers: {
            Authorization: `Bearer ${refreshToken}`, // 새로운 accessToken 발급을 위해 기존 headers에 accessToken이 아닌 refreshToken 사용
            "Content-Type": "application/json;",
          },
        };
        try {
          // Token refresh API
          const res = await axios.get(
            `${host}/security/auth/refresh`,
            refreshConfig
          );
          // API 요청 성공
          if (res.status === 200) {
            // 요청 실패한 객체의 accessToken을 새로 발급받은 Token으로 교체
            originalRequest.headers["Authorization"] = res.data.accessToken;
            // AsyncStorage에 새로 발급받은 accessToken으로 저장
            sessionStorage.setItem("accessToken", res.data.accessToken);
            // 재발급한 accessToken으로 요청 실패한 객체에 재 요청 및 전달
            const originalResponse = await axios.request(originalRequest);
            return originalResponse;
          }
          console.log(res);
        } catch (error) {
          console.log(error);
          if (
            error?.response?.status === 403 ||
            error?.response?.status === 502
          ) {
            originalRequest.headers["Authorization"] = null;
            sessionStorage.multiRemove(["accessToken", "refreshToken"]);
            const originalResponse = await axios.request(originalRequest);
            return originalResponse;
          }
          throw error;
        }
      }
    }
    return Promise.reject(error);
  }
);

export default apiClient;
