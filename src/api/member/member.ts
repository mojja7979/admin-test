import apiClient from "../apiClient";

export interface IMemberListItemProps {
  id: string;
  email: string;
  nickName: string;
  pushActive: string;
  state: string;
  createdAt: string;
  channelActive: boolean;
}

export interface IMemberDetailResponse {
  email: string;
  nickName: string;
  pushActive: string;
  state: string;
  channelActive: boolean;
  phoneNumber: string;
  nightPushActive: string;
  adPushActive: string;
  createdAt: string;
}
export interface IMemberListResponse {
  items: IMemberListItemProps[];
  pageMetadata: {
    size: number;
    totalPages: number;
    totalElements: number;
    last: true;
  };
}

export async function getMemberList(
  page: number,
  size: number,
  keyword?: string,
  keyValue?: string,
  startDate?: string,
  endDate?: string,
  userType?: string,
  searchPushActive?: string
  // page,size
) {
  const response = await apiClient.get<IMemberListResponse>(
    // `/backoffice-api/user?keyword=${keyword}=&${keyValue}=&${startDate}=&${endDate}=&page=${page}&size=${size}`,
    `/backoffice-api/user`,
    {
      params: {
        page,
        size,
        keyword,
        keyValue,
        startDate,
        endDate,
        userType,
        pushActive: searchPushActive,
      },
    }
  );
  return response;
}

export async function getMemberDetail(id: string) {
  const response = await apiClient.get<IMemberDetailResponse>(
    `/backoffice-api/user/${id}`
  );
  return response;
}

export async function nickNameValidationCheck(nickName: string) {
  const response = await apiClient.get<boolean>(
    `/backoffice-api/user/validation/nickname/${nickName}`
  );
  return response;
}

export async function editMemberDetail(
  id: string,
  email: string,
  nickName: string
) {
  const response = await apiClient.put<string>(`/backoffice-api/user/${id}`, {
    email,
    nickName,
  });
  return response;
}
