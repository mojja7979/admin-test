import axios from "axios";
const host: any = `${process.env.REACT_APP_API_URL}`;

const apiFile = axios.create({
  baseURL: host,
  withCredentials: false,
  timeout: 10000,
  headers: { "Content-Type": "multipart/form-data" },
});

apiFile.interceptors.request.use(
  async (config) => {
    const accessToken = sessionStorage.getItem("accessToken");
    // const accessToken =
    // 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIzZGNhYjM0YS0wNTNmLTRiMWUtODFjOS01OGE3YjViOTE5NTgiLCJhdXRoIjpbeyJhdXRob3JpdHkiOiJST0xFX0NMSUVOVCJ9XSwidHlwZSI6IkFjY2VzcyIsImlhdCI6MTYwMzc3MjE0MSwiaXNzIjoidGFnbnRhZ2dlci5jb20iLCJleHAiOjE3MDM3NzU3NDF9.b24TEF7R5wgZ7yc8r_FhGFdvfgCauwnvdQJK3tCS5Ek';
    if (accessToken) {
      config.headers!.Authorization = "Bearer " + accessToken;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

apiFile.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    // AsyncStorage에 저장된 refreshToken 가져옴
    const refreshToken = sessionStorage.getItem("refreshToken");
    // 요청에 실패한 객체의 정보
    const originalRequest = error.config;
    // 현재 status : 403 ( accessToken 만료 )
    // 반복 호출 방지를 위한 retry
    if (error?.response?.status === 403 && !originalRequest.retry) {
      originalRequest.retry = true;
      if (refreshToken) {
        const refreshConfig = {
          headers: {
            Authorization: `Bearer ${refreshToken}`, // 새로운 accessToken 발급을 위해 기존 headers에 accessToken이 아닌 refreshToken 사용
            "Content-Type": "application/json;charset=UTF-8",
          },
        };
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
      }
    }
    return Promise.reject(error);
  }
);

export default apiFile;
