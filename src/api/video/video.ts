import apiClient from "../apiClient";

export interface IVideoListItemProps {
  portfolioId: number;
  title: string;
  videoUrl: string;
  isDel: boolean;
  createdAt: string;
}
export interface IVideoDetailResponse {
  portfolioId: number;
  title: string;
  videoUrl: string;
  isDel: boolean;
  email: string;
  name: string;
  createdAt: string;
}
export interface IVideoListResponse {
  items: IVideoListItemProps[];
  pageMetadata: {
    size: number;
    totalPages: number;
    totalElements: number;
    last: true;
  };
}

export async function getVideoList(
  page: number,
  size: number,
  keyword?: string,
  keyValue?: string,
  startDate?: string,
  endDate?: string
  // page,size
) {
  const response = await apiClient.get<IVideoListItemProps>(
    // `/backoffice-api/user?keyword=${keyword}=&${keyValue}=&${startDate}=&${endDate}=&page=${page}&size=${size}`,
    `/backoffice-api/channel/profile/video`,
    {
      params: {
        page,
        size,
        keyword,
        keyValue,
        startDate,
        endDate,
      },
    }
  );
  return response;
}

export async function getVideoDetail(id: string) {
  const response = await apiClient.get<IVideoDetailResponse>(
    `/backoffice-api/channel/profile/${id}/video`
  );
  return response;
}

export async function editVideo(
  portfolioId: number,
  title?: string,
  videoUrl?: string
) {
  const response = await apiClient.put<IVideoDetailResponse>(
    `/backoffice-api/channel/profile/${portfolioId}/video`,
    {
      title,
      videoUrl,
    }
  );
  return response;
}

export async function addVideo(email: string, title: string, videoUrl: string) {
  const response = await apiClient.post<number>(
    `/backoffice-api/channel/profile/video`,
    {
      email,
      title,
      videoUrl,
    }
  );
  return response;
}

export async function getMemberStatus(email: string) {
  const response = await apiClient.get<string>(
    `/backoffice-api/channel/user/status/${email}`
  );
  return response;
}
