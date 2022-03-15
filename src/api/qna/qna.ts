import apiClient from "../apiClient";

export interface IQnaListItemProps {
  id: number;
  categoryName: string;
  content: string;
  name: string;
  email: string;
  createdAt: string;
  status: string;
}

export interface IQnaDetailResponse {
  id: number;
  categoryName: string;
  content: string;
  name: string;
  email: string;
  createdAt: string;
  status: string;
  answer: IAnswer;
}

export interface IAnswer {
  id: number;
  name: string;
  title: string;
  content: string;
  createdAt: string;
}

export interface IQnaListResponse {
  items: IQnaListItemProps[];
  pageMetadata: {
    size: number;
    totalPages: number;
    totalElements: number;
    last: true;
  };
}

export interface IQnaCategoryResponse {
  qnaCategoryList: IQnaCategory[];
}

export interface IQnaCategory {
  id: number;
  name: string;
  active: string;
}

export interface IQnaCount {
  total: number;
  ask: number;
  complete: number;
}

export async function getQnaList(
  page: number,
  size: number,
  keyword?: string,
  keyValue?: string,
  startDate?: string,
  endDate?: string,
  qnaCategory?: number | null
  // page,size
) {
  const response = await apiClient.get<IQnaListItemProps>(
    // `/backoffice-api/user?keyword=${keyword}=&${keyValue}=&${startDate}=&${endDate}=&page=${page}&size=${size}`,
    `/backoffice-api/support/qna`,
    {
      params: {
        page,
        size,
        keyword,
        keyValue,
        startDate,
        endDate,
        qnaCategory,
      },
    }
  );
  return response;
}

export async function getQnaDetail(id: string) {
  const response = await apiClient.get<IQnaDetailResponse>(
    `/backoffice-api/support/qna/${id}`
  );
  return response;
}

export async function getQnaCategoryList() {
  const response = await apiClient.get<IQnaCategoryResponse>(
    `/backoffice-api/support/qna/category`
  );
  return response;
}

export async function getQnaCount() {
  const response = await apiClient.get<IQnaCount>(
    `/backoffice-api/support/qna/count`
  );
  return response;
}

export async function saveQnaReply(
  questionId: number,
  title: string,
  content: string
) {
  const response = await apiClient.post<IQnaDetailResponse>(
    `/backoffice-api/support/qna/answer`,
    {
      questionId,
      title,
      content,
    }
  );
  return response;
}

export async function modifyQnaReply(
  id: number,
  questionId: number,
  title: string,
  content: string
) {
  const response = await apiClient.put<IQnaDetailResponse>(
    `/backoffice-api/support/qna/answer/${id}`,
    {
      questionId,
      title,
      content,
    }
  );
  return response;
}
