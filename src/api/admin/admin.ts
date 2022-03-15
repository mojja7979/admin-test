import apiClient from "../apiClient";

export interface IAdminListItemProps {
  id: number;
  loginId: string;
  password: string;
  name: string;
  phoneNumber: string;
  departmentName: string;
  authority: string;
  isActive: string;
  roleId: number;
}
export interface IAdminListResponse {
  items: IAdminListItemProps[];
  pageMetadata: {
    size: number;
    totalPages: number;
    totalElements: number;
    last: true;
  };
}

export async function getAdminList(
  page: number,
  size: number,
  keyword: string,
  keyValue: string,
  startDate: string,
  endDate: string
  // page,size
) {
  const response = await apiClient.get<IAdminListResponse>(
    // `/backoffice-api/admin?keyword=${keyword}=&${keyValue}=&${startDate}=&${endDate}=&page=${page}&size=${size}`,
    `/backoffice-api/admin?keyword=${keyword}&keyValue=${keyValue}&startDate=${startDate}&endDate=${endDate}&page=${page}&size=${size}`
  );
  return response;
}

export async function getAdminInfo(id: number) {
  const response = await apiClient.get<IAdminListItemProps>(
    `/backoffice-api/admin/${id}`
  );
  return response;
}

export async function editAdminInfo(data: any, id: number) {
  const response = await apiClient.put<IAdminListItemProps>(
    `/backoffice-api/admin/${id}`,
    data
  );
  return response;
}

export async function editAdminInfoPassword(data:any) {
  const response = await apiClient.put<IAdminListItemProps>(
    `/backoffice-api/admin/${data.id}/change/password`,
    data
  );
  return response;
}

export async function checkAdminLoginId(loginId: string) {
  const response = await apiClient.get<IAdminListItemProps>(
    `/backoffice-api/admin/validation/loginId/${loginId}`
  );
  return response;
}

export async function onSignup(
  loginId: string,
  password: string,
  name: string,
  phoneNumber: string,
  departmentName: string,
  isActive: string
) {
  const response = await apiClient.post<IAdminListItemProps>(
    `/backoffice-api/admin`,
    {
      loginId,
      password,
      name,
      phoneNumber,
      departmentName,
      isActive,
    }
  );
  return response.data;
}

// 어드민 나의 정보 변경
export async function onMyInfoModify(
  name: string,
  phoneNumber: string,
  departmentName: string,
  password: string,
  changePassword: string
) {
  const response = await apiClient.put<IAdminListItemProps>(
    `/backoffice-api/admin/my`,
    {
      name,
      phoneNumber,
      departmentName,
      password,
      changePassword,
    }
  );
  return response.data;
}
