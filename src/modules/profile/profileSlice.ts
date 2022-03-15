import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import * as API from "../../api/profile";
import { IActiveListResponse, IProfileListResponse } from "../../api/profile";
import { isEmpty } from "../../lib/util";

interface IProfileState extends IProfileListResponse, IActiveListResponse {
  errorMessage: string;
  page: number;
  size: number;
}

const initialState: IProfileState = {
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

  activeKindList: [],
};

const name = "profile";

export const asyncGetProfileList = createAsyncThunk(
  `${name}/asyncGetProfileList`,
  async (pageInfo: any, { rejectWithValue }) => {
    try {
      const {
        page,
        size = 20,
        keyword,
        keyValue,
        startDate,
        endDate,
        complexCode,
      } = pageInfo;
      const response = await API.getProfileList(
        page,
        size,
        keyword,
        keyValue,
        startDate,
        endDate,
        complexCode
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.status);
    }
  }
);

export const asyncGetActiveList = createAsyncThunk(
  `${name}/asyncGetActiveList`,
  async () => {
    try {
      const response = await API.getActiveList();
      return response.data;
    } catch (err) {
      return err;
    }
  }
);

// export const asyncGetUserProfileInfo = createAsyncThunk(
//   `${name}/asyncGetUserProfileInfo`,
//   async (profileInfo: any, { rejectWithValue }) => {
//     try {
//       const { email } = profileInfo;
//       const response = await API.getUserProfileInfo(email);
//       return response.data;
//     } catch (err) {
//       return rejectWithValue(err.response.status);
//     }
//   }
// );

const profile = createSlice({
  name,
  initialState,
  reducers: {
    changePage(state, { payload }: PayloadAction<number>) {
      state.page = payload;
    },
  },

  extraReducers: {
    [asyncGetProfileList.fulfilled.type]: (
      state,
      { payload }: PayloadAction<any>
    ) => {
      state.items = payload.items;
      state.pageMetadata = payload.pageMetadata;
    },
    [asyncGetProfileList.rejected.type]: (
      state,
      { payload }: PayloadAction<any>
    ) => {
      state.errorMessage = "리스트를 갸져오는 중에 오류가 발생하였습니다.";
    },

    [asyncGetActiveList.fulfilled.type]: (
      state,
      { payload }: PayloadAction<any>
    ) => {
      state.activeKindList = payload.activeKindList;
    },
    [asyncGetActiveList.rejected.type]: (
      state,
      { payload }: PayloadAction<any>
    ) => {
      state.errorMessage = "리스트를 갸져오는 중에 오류가 발생하였습니다.";
    },
  },
});

export const { changePage } = profile.actions;

export default profile.reducer;
