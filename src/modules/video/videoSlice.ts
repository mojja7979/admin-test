import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import * as API from "../../api/video";
import {
  IVideoListResponse,
  IVideoListItemProps,
  IVideoDetailResponse,
} from "../../api/video";
import { isEmpty } from "../../lib/util";

interface IChnanelVideoState
  extends IVideoListItemProps,
    IVideoListResponse,
    IVideoDetailResponse {
  error: string;
  errorMessage: string;
  page: number;
  size: number;
  keyword?: string | null;
  keyValue?: string | null;
  startDate?: string | null;
  endDate?: string | null;
  memberStatus: string;
  is_memberCheck: boolean;
}

const initialState: IChnanelVideoState = {
  error: "",
  errorMessage: "",
  items: [],
  pageMetadata: {
    size: 20,
    totalPages: 1,
    totalElements: 1,
    last: true,
  },
  page: 0,
  size: 20,
  keyword: "",
  keyValue: "",
  startDate: "",
  endDate: "",
  portfolioId: 0,
  title: "",
  videoUrl: "",
  isDel: false,
  createdAt: "",
  email: "",
  name: "",
  memberStatus: "",
  is_memberCheck: false,
};

const name = "video";

export const asyncGetVideoList = createAsyncThunk(
  `${name}/asyncGetVideoList`,
  async (pageInfo: any, { rejectWithValue }) => {
    try {
      const {
        page,
        size = 20,
        keyword,
        keyValue,
        startDate,
        endDate,
      } = pageInfo;
      const response = await API.getVideoList(
        page,
        size,
        keyword,
        keyValue,
        startDate,
        endDate
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.status);
    }
  }
);

export const asyncGetVideoDetail = createAsyncThunk(
  `${name}/asyncGetVideoDetail`,
  async (data: any, { rejectWithValue }) => {
    try {
      const { id } = data;
      const response = await API.getVideoDetail(id);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.status);
    }
  }
);

export const asyncEditVideo = createAsyncThunk(
  `${name}/asyncEditVideo`,
  async (data: any, { rejectWithValue }) => {
    try {
      const { portfolioId, title, videoUrl } = data;
      const response = await API.editVideo(portfolioId, title, videoUrl);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.status);
    }
  }
);

export const asyncNewAddVideo = createAsyncThunk(
  `${name}/asyncNewAddVideo`,
  async (data: any, { rejectWithValue }) => {
    try {
      const { email, title, videoUrl } = data;
      const response = await API.addVideo(email, title, videoUrl);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.status);
    }
  }
);

export const asyncGetMemberStatus = createAsyncThunk(
  `${name}/asyncGetMemberStatus`,
  async (data: any, { rejectWithValue }) => {
    try {
      const { email } = data;
      const response = await API.getMemberStatus(email);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.status);
    }
  }
);

const video = createSlice({
  name,
  initialState,
  reducers: {
    changePage(state, { payload }: PayloadAction<number>) {
      state.page = payload;
    },
    changeTitle(state, { payload }: PayloadAction<string>) {
      state.title = payload;
    },
    changeVideoUrl(state, { payload }: PayloadAction<string>) {
      state.videoUrl = payload;
    },
    checkMemberStatus(state, { payload }: PayloadAction<string>) {
      state.memberStatus = payload;
    },
    isMemberCheck(state, { payload }: PayloadAction<boolean>) {
      state.is_memberCheck = payload;
    },
  },
  extraReducers: {
    [asyncGetVideoList.fulfilled.type]: (
      state,
      { payload }: PayloadAction<any>
    ) => {
      state.items = payload.items;
      state.pageMetadata = payload.pageMetadata;
    },
    [asyncGetVideoList.rejected.type]: (
      state,
      { payload }: PayloadAction<any>
    ) => {
      state.error = "리스트를 갸져오는 중에 오류가 발생하였습니다.";
    },
    [asyncGetVideoDetail.fulfilled.type]: (
      state,
      { payload }: PayloadAction<any>
    ) => {
      state.portfolioId = payload.portfolioId;
      state.title = payload.title;
      state.videoUrl = "https://youtu.be/" + payload.videoUrl;
      state.isDel = payload.isDel;
      state.email = payload.email;
      state.name = payload.name;
      state.createdAt = payload.createdAt;
    },
    [asyncGetVideoDetail.rejected.type]: (
      state,
      { payload }: PayloadAction<any>
    ) => {
      state.error = "정보를 가져오는 중에 오류가 발생하였습니다.";
    },
    [asyncNewAddVideo.fulfilled.type]: (
      state,
      { payload }: PayloadAction<any>
    ) => {
      state.portfolioId = payload;
    },
    [asyncNewAddVideo.rejected.type]: (
      state,
      { payload }: PayloadAction<any>
    ) => {
      state.error = "데이터 저장하는중에 오류가 발생하였습니다.";
    },
    [asyncGetMemberStatus.fulfilled.type]: (
      state,
      { payload }: PayloadAction<any>
    ) => {
      state.memberStatus = payload.status;
      //   "NOT_CHANNEL_USER"프로필 등록 가능,
      // "CHANNEL_USER"프로필 등록 불가능 (이미등록),
      // "NOT_USER"프로필 등록 불가능 (비회원)
      switch (state.memberStatus) {
        case "NOT_CHANNEL_USER":
          alert("채널 유저 가입 후 등록 가능합니다.");
          state.is_memberCheck = false;
          break;
        case "CHANNEL_USER":
          alert("이미 등록한 채널 유저로 신규 영상 등록 가능합니다.");
          state.is_memberCheck = true;
          break;
        case "NOT_USER":
          alert("비회원 정보입니다. 아이디(이메일)를 확인해주세요");
          state.is_memberCheck = false;
          break;
        default:
          alert("정상적인 정보가 아닙니다.");
          state.is_memberCheck = false;
          break;
      }
    },
    [asyncGetMemberStatus.rejected.type]: (
      state,
      { payload }: PayloadAction<any>
    ) => {
      state.is_memberCheck = false;
      state.error = "데이터 저장하는중에 오류가 발생하였습니다.";
    },
  },
});

export const {
  changePage,
  changeTitle,
  changeVideoUrl,
  checkMemberStatus,
  isMemberCheck,
} = video.actions;

export default video.reducer;
