import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import * as API from "../../api/qna";
import {
  IQnaDetailResponse,
  IQnaListItemProps,
  IQnaListResponse,
  IQnaCategoryResponse,
  IQnaCount,
} from "../../api/qna";
import { isEmpty } from "../../lib/util";

interface IQnaState
  extends IQnaListItemProps,
    IQnaDetailResponse,
    IQnaListResponse,
    IQnaCategoryResponse,
    IQnaCount {
  error: string;
  errorMessage: string;
  page: number;
  size: number;
  keyword?: string | null;
  keyValue?: string | null;
  startDate?: string | null;
  endDate?: string | null;
  qnaCategory?: number | null;
}

const initialState: IQnaState = {
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
  id: 0,
  email: "",
  createdAt: "",
  categoryName: "",
  content: "",
  name: "",
  status: "",
  answer: {
    id: 0,
    name: "",
    title: "",
    content: "",
    createdAt: "",
  },
  qnaCategoryList: [],
  total: 0,
  ask: 0,
  complete: 0,
};

const name = "member";

export const asyncGetQnaList = createAsyncThunk(
  `${name}/asyncGetQnaList`,
  async (pageInfo: any, { rejectWithValue }) => {
    try {
      const {
        page,
        size = 20,
        keyword,
        keyValue,
        startDate,
        endDate,
        qnaCategory,
      } = pageInfo;
      const response = await API.getQnaList(
        page,
        size,
        keyword,
        keyValue,
        startDate,
        endDate,
        qnaCategory
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.status);
    }
  }
);

export const asyncGetQnaDetail = createAsyncThunk(
  `${name}/asyncGetQnaDetail`,
  async (data: any, { rejectWithValue }) => {
    try {
      const { id } = data;
      const response = await API.getQnaDetail(id);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.status);
    }
  }
);

export const asyncGetQnaCategory = createAsyncThunk(
  `${name}/asyncGetQnaCategory`,
  async (_, { rejectWithValue }) => {
    try {
      const response = await API.getQnaCategoryList();
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.status);
    }
  }
);

export const asyncGetQnaCount = createAsyncThunk(
  `${name}/asyncGetQnaCount`,
  async (_, { rejectWithValue }) => {
    try {
      const response = await API.getQnaCount();
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.status);
    }
  }
);

export const asyncSaveQnaReply = createAsyncThunk(
  `${name}/asyncSaveQnaReply`,
  async (data: any, { rejectWithValue }) => {
    try {
      const { questionId, title, content } = data;
      const response = await API.saveQnaReply(questionId, title, content);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.status);
    }
  }
);

export const asyncModifyQnaReply = createAsyncThunk(
  `${name}/asyncModifyQnaReply`,
  async (data: any, { rejectWithValue }) => {
    try {
      const { id, questionId, title, content } = data;
      const response = await API.modifyQnaReply(id, questionId, title, content);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.status);
    }
  }
);

const qna = createSlice({
  name,
  initialState,
  reducers: {
    changePage(state, { payload }: PayloadAction<number>) {
      state.page = payload;
    },
    changeAnswerContent(state, { payload }: PayloadAction<string>) {
      state.answer.content = payload;
    },
    changeAnswerTitle(state, { payload }: PayloadAction<string>) {
      state.answer.title = payload;
    },
  },
  extraReducers: {
    [asyncGetQnaList.fulfilled.type]: (
      state,
      { payload }: PayloadAction<any>
    ) => {
      state.items = payload.items;
      state.pageMetadata = payload.pageMetadata;
    },
    [asyncGetQnaList.rejected.type]: (
      state,
      { payload }: PayloadAction<any>
    ) => {
      state.error = "리스트를 갸져오는 중에 오류가 발생하였습니다.";
    },
    [asyncGetQnaDetail.fulfilled.type]: (
      state,
      { payload }: PayloadAction<any>
    ) => {
      state.categoryName = payload.categoryName;
      state.content = payload.content;
      state.name = payload.name;
      state.email = payload.email;
      state.createdAt = payload.createdAt;
      state.status = payload.status;
      if (payload.status === "COMPLETE") {
        state.answer.id = payload.answer.id;
        state.answer.name = payload.answer.name;
        state.answer.title = payload.answer.title;
        state.answer.content = payload.answer.content;
        state.answer.createdAt = payload.answer.createdAt;
      } else {
        state.answer.id = 0;
        state.answer.name = "";
        state.answer.title = "";
        state.answer.content = "";
        state.answer.createdAt = "";
      }
    },
    [asyncGetQnaDetail.rejected.type]: (
      state,
      { payload }: PayloadAction<any>
    ) => {
      state.error = "정보를 가져오는 중에 오류가 발생하였습니다.";
    },
    [asyncGetQnaCategory.fulfilled.type]: (
      state,
      { payload }: PayloadAction<any>
    ) => {
      state.qnaCategoryList = payload;
    },
    [asyncGetQnaCategory.rejected.type]: (
      state,
      { payload }: PayloadAction<any>
    ) => {
      state.error = "정보를 가져오는 중에 오류가 발생하였습니다.";
    },
    [asyncGetQnaCount.fulfilled.type]: (
      state,
      { payload }: PayloadAction<any>
    ) => {
      state.total = payload.total;
      state.ask = payload.ask;
      state.complete = payload.complete;
    },
    [asyncGetQnaCount.rejected.type]: (
      state,
      { payload }: PayloadAction<any>
    ) => {
      state.error = "정보를 가져오는 중에 오류가 발생하였습니다.";
    },
    [asyncSaveQnaReply.fulfilled.type]: (
      state,
      { payload }: PayloadAction<any>
    ) => {
      state.categoryName = payload.categoryName;
      state.content = payload.content;
      state.name = payload.name;
      state.email = payload.email;
      state.createdAt = payload.createdAt;
      state.status = payload.status;
      state.answer.id = payload.answer?.id;
      state.answer.name = payload.answer?.name;
      state.answer.title = payload.answer?.title;
      state.answer.content = payload.answer?.content;
      state.answer.createdAt = payload.answer?.createdAt;
    },
    [asyncSaveQnaReply.rejected.type]: (
      state,
      { payload }: PayloadAction<any>
    ) => {
      state.error = "정보를 저장하는 중에 오류가 발생하였습니다.";
    },
    [asyncModifyQnaReply.fulfilled.type]: (
      state,
      { payload }: PayloadAction<any>
    ) => {
      state.categoryName = payload.categoryName;
      state.content = payload.content;
      state.name = payload.name;
      state.email = payload.email;
      state.createdAt = payload.createdAt;
      state.status = payload.status;
      state.answer.id = payload.answer?.id;
      state.answer.name = payload.answer?.name;
      state.answer.title = payload.answer?.title;
      state.answer.content = payload.answer?.content;
      state.answer.createdAt = payload.answer?.createdAt;
    },
    [asyncModifyQnaReply.rejected.type]: (
      state,
      { payload }: PayloadAction<any>
    ) => {
      state.error = "정보를 저장하는 중에 오류가 발생하였습니다.";
    },
  },
});

export const { changePage, changeAnswerContent, changeAnswerTitle } =
  qna.actions;

export default qna.reducer;
