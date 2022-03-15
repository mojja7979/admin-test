import { StringLiteralLike } from "typescript";
import apiClient from "../apiClient";
import apiFile from "../apiFile";

import { 
    IProfileActiveListProps
} from "../profile";
  


export interface ISnapshotListItemProps {
    portfolioId: number;
    title: string;
    coverImg:string;
    snapshotCount: string;
    workName: any[];
    isDel: string;
    email: string;
    name: string;
    createdAt:string;
  }

export interface ISnapshotListResponse {
    items: ISnapshotListItemProps[];
    pageMetadata: {
      size: number;
      totalPages: number;
      totalElements: number;
      last: true;
    };
  }
  


export async function getSnapshotList(
    page: number,
    size: number,
    keyword: string,
    keyValue: string,
    startDate: string,
    endDate: string,
    complexCode: string
  ) {
    const response = await apiClient.get<ISnapshotListResponse>(
      `/backoffice-api/channel/profile/snapshot?complexCode=${complexCode}&keyword=${keyword}&keyValue=${keyValue}&startDate=${startDate}&endDate=${endDate}&page=${page}&size=${size}`
    );
    return response;
  }

  export async function getWorktypeList() {
    const response = await apiClient.get<IProfileActiveListProps>(
      `/backoffice-api/channel/profile/snapshot/worktype`
    );
    return response;
  }

  export interface ISnapshotListProps {
    imagePath: string;
    imgOrder: number;
  }

export interface ISnapshotDetailResponse {
    portfolioId: number;
    email: string;
    name: string;
    title: string;
    coverImg:string;
    description: string;
    createdAt:string;
    snapshotList: ISnapshotListProps[];
    workTypeList: IProfileActiveListProps[];

  }
  export async function getSnapshotDetail(id:number) {
    const response = await apiClient.get<ISnapshotDetailResponse>(
      `/backoffice-api/channel/profile/${id}/snapshot`
    );
    // console.log("data", response.data)
    return response;
  }


  export async function saveSnapshotImage(Image:any) {
    const response = await apiFile.post<any>(
      `/backoffice-api/channel/profile/snapshot/images`,
      Image
    );
   
    return response;
  }

  export async function editSnapshot(data:any, id:string) {
    const response = await apiClient.put<ISnapshotDetailResponse>(
      `/backoffice-api/channel/profile/${id}/snapshot`,
      data
  
    );
    console.log("test", response.data)
    return response;
  }

  export interface IEmailStatus {
    status: string;
  }
  export async function checkStatusEmail(email:string) {
    const response = await apiClient.get<IEmailStatus>(
      `/backoffice-api/channel/user/status/${email}`
    );
    return response;
  }


  export async function addSnapshot(data:any) {
    const response = await apiClient.post<ISnapshotDetailResponse>(
      `/backoffice-api/channel/profile/snapshot`,
      data
    );
    return response;
  }
  
  
  