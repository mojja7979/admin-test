import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import * as API from "../../api/report";
import { IReportListResponse, IReportListItem } from "../../api/report";

interface IReportState extends IReportListResponse, IReportListItem {
  keyword: string;
  keyValue: string;
  startDate: string;
  endDate: string;
  error: string;
  errorMessage: string;
  page: number;
  size: number;
}

const initialState: IReportState = {
  keyword: "",
  keyValue: "",
  startDate: "",
  endDate: "",
  error: "",
  errorMessage: "",

  page: 0,
  size: 20,

  id: 0,
  contentsId: 0,
  content: "",
  defendant: "",
  reporter: "",
  contentCreateAt: "",
  createdAt: "",

  reportId: 0,

  feedResponseDTO: {
    id: 0,
    content: "",
    name: "",
    channelFeedImageList: [""],
    createdAt: "",
  },

  items: [],
  pageMetadata: {
    size: 20,
    totalPages: 1,
    totalElements: 1,
    last: true,
  },
};

const name = "report";

export const asyncGetReportList = createAsyncThunk(
  `${name}/asyncGetReportList`,
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
      const response = await API.getReportList(
        page,
        size,
        keyword,
        keyValue,
        startDate,
        endDate
      );
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response.status);
    }
  }
);

export const asyncGetReportInfo = createAsyncThunk(
  `${name}/asyncGetReportInfo`,
  async (pageInfo: any, { rejectWithValue }) => {
    const { id } = pageInfo;
    try {
      const response = await API.getReportInfo(id);
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response.status);
    }
  }
);

const report = createSlice({
  name,
  initialState,
  reducers: {
    changePage(state, { payload }: PayloadAction<number>) {
      state.page = payload;
    },
  },
  extraReducers: {
    [asyncGetReportList.fulfilled.type]: (
      state,
      { payload }: PayloadAction<any>
    ) => {
      state.items = payload.items;
      state.pageMetadata = payload.pageMetadata;
    },
    [asyncGetReportList.rejected.type]: (
      state,
      { payload }: PayloadAction<any>
    ) => {
      state.error = "리스트를 불럴 올 수가 없습니다";
    },

    [asyncGetReportInfo.fulfilled.type]: (
      state,
      { payload }: PayloadAction<IReportListItem>
    ) => {
      state.reportId = payload.reportId;
      state.reporter = payload.reporter;
      state.createdAt = payload.createdAt;
      state.feedResponseDTO = payload.feedResponseDTO;
    },
    [asyncGetReportInfo.rejected.type]: (
      state,
      { payload }: PayloadAction<any>
    ) => {
      state.error = payload.message;
    },
  },
});

export const { changePage } = report.actions;

export default report.reducer;
