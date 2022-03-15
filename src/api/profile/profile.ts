import apiClient from "../apiClient";
import apiFile from "../apiFile";

export interface IProfileActiveListProps {
    mainGubun: string;
    subGubun: string;
    cateCode: string;
    codeName: string;
}

export interface IProfileListItemProps {
  email: string;
  profileImg: string;
  profileThumbnailImg:string;
  aboutMe: string;
  name: string;
  myMessage: string;
  chUserActiveList: IProfileActiveListProps[];
  channelUserTagList:any[];
  createdAt:string;
}

export interface IProfileListResponse {
  items: IProfileListItemProps[];
  pageMetadata: {
    size: number;
    totalPages: number;
    totalElements: number;
    last: true;
  };
}

export async function getProfileList(
  page: number,
  size: number,
  keyword: string,
  keyValue: string,
  startDate: string,
  endDate: string,
  complexCode: string
) {
  const response = await apiClient.get<IProfileListResponse>(
    `/backoffice-api/channel/profile?complexCode=${complexCode}&keyword=${keyword}&keyValue=${keyValue}&startDate=${startDate}&endDate=${endDate}&page=${page}&size=${size}`
  );
  return response;
}

export interface IActiveListResponse {
  activeKindList: IProfileActiveListProps[];
}


export async function getActiveList() {
  const response = await apiClient.get<IActiveListResponse>(
    `/backoffice-api/channel/profile/activekind`
  );
  return response;
}


export async function getUserProfileInfo(email:string) {
  const response = await apiClient.get<IProfileListItemProps>(
    `/backoffice-api/channel/profile/${email}`
  );
  return response;
}


export interface ISnapshotListProps {
  portfolioId: number;
  title: string;
  coverImg: string;
  snapshotCount: number;
  workName: object;
  isDel: boolean;
  createdAt: string;

}
export interface ISnapshotListResponse {
  items:ISnapshotListProps[];
  pageMetadata:{
    size: number;
    totalPages: number;
    totalElements: number;
    last: boolean;
  }
}

export async function getUserProfileSnapshotList(data:any) {
  const response = await apiClient.get<ISnapshotListResponse>(
    `/backoffice-api/channel/profile/${data.email}/snapshotList?page=${data.page}&size=${data.size}`
  );
  return response;
}


export interface IVideoListProps {
  portfolioId: number;
  title: string;
  videoUrl: string;
  isDel: boolean;
  createdAt: string;

}
export interface IVidoeListResponse {
  items:IVideoListProps[];
  pageMetadata:{
    size: number;
    totalPages: number;
    totalElements: number;
    last: boolean;
  }
}

export async function getUserProfileVideoList(data:any) {
  const response = await apiClient.get<IVidoeListResponse>(
    `/backoffice-api/channel/profile/${data.email}/videoList?page=${data.page}&size=${data.size}`
  );
  return response;
}


export interface IEditProfiletProps {
  profileImg: string,
  profileThumbnailImg: string,
  aboutMe: string,
  myMessage: string,
  channelUserActiveKind: IProfileActiveListProps[],
  channelUserTagList: any[]
}

export async function onEditProfile(data:any, email:string) {
  const response = await apiClient.put<IEditProfiletProps>(
    `/backoffice-api/channel/profile/${email}`,
    data

  );
  return response;
}

export interface IProfileImageResponse {
  imgPath:string;
  imgThumbnailPath: string
}
export async function onSaveProfileImage(Image:any) {
  const response = await apiFile.post<IProfileImageResponse>(
    `/backoffice-api/channel/profile/image`,
   Image
  );
  return response;
}



export async function checkValidationNickname(nickname:string) {
  const response = await apiFile.get<any>(
    `/backoffice-api/user/validation/nickname/${nickname}`
  );
  return response;
}

export interface IEmailStatus {
  status: string;
}

export async function checkStatusEmail(email:string) {
  const response = await apiFile.get<IEmailStatus>(
    `/backoffice-api/channel/user/status/${email}`
  );
  return response;
}


export interface IProfileItemProps {
  email: string;
  profileImg: string;
  profileThumbnailImg:string;
  aboutMe: string;
  name: string;
  myMessage: string;
  channelUserActiveKind: IProfileActiveListProps[];
  channelUserTagList:any[];
}

export async function onAddProfile(data:any) {
  const response = await apiClient.post<IProfileItemProps>(
    `/backoffice-api/channel/profile`,
    data
    );
  return response;
}






