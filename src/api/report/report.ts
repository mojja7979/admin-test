import apiClient from "../apiClient";

export interface IReportListItem {
  id: number;
  contentsId: number;
  content: string;
  defendant: string;
  reporter: string;
  contentCreateAt: string;
  createdAt: string;

  reportId: number;
  feedResponseDTO: {
    id: number;
    content: string;
    name: string;
    channelFeedImageList: [
      string
    ];
    createdAt: string;
  };
}

export interface IReportListResponse {
  items: IReportListItem[];
  pageMetadata: {
    size: number;
    totalPages: number;
    totalElements: number;
    last: true;
  };
}

export async function getReportList(
  page: number,
  size: number,
  keyword: string,
  keyValue: string,
  startDate: string,
  endDate: string
  // page,size
) {
  const response = await apiClient.get<IReportListResponse>(
    `/backoffice-api/report/feed?keyword=${keyword}&keyValue=${keyValue}&startDate=${startDate}&endDate=${endDate}&page=${page}&size=${size}`
  );
  return response;
}

export async function getReportInfo(id: number) {
  const response = await apiClient.get<IReportListItem>(
    `/backoffice-api/report/${id}`
  );
  return response;
}