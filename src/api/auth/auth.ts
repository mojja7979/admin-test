import apiClient from "../apiClient";

export interface IUserUUIDResponse {
  userId: string;
}

export async function getUserUUID() {
  const response = await apiClient.get<IUserUUIDResponse>(`/security/auth/`);
  return response.data;
}

export interface ILoginResponse {
  loginId: string;
  authority: string | null;
  roleId: number;
  token: {
    accessToken: string;
    grantType: string;
    refreshToken: string;
  };
  timestamp: string;
  status: number;
  error: string | null;
  code: string;
  message: string;
}

export async function onLogin(loginId: string, password: string) {
  const response = await apiClient.post<ILoginResponse>(
    `/backoffice-api/auth/login`,
    {
      loginId: loginId,
      password: password,
    }
  );
  console.log("login response", response);
  return response.data;
}
