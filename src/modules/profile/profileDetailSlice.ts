import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { userInfo } from "os";
import * as API from "../../api/profile";
import {
  IProfileListItemProps,
  ISnapshotListResponse,
  IVideoListProps,
  IEditProfiletProps,
  IProfileImageResponse,
  IProfileItemProps,
} from "../../api/profile";

interface IProfileState
  extends IProfileListItemProps,
    ISnapshotListResponse,
    IProfileImageResponse {
  errorMessage: string;
  videolistPage: number;
  snapshotlistPage: number;
  //size: number;
  videolist: IVideoListProps[];
  snapshotPageMetadata: {
    size: number;
    totalPages: number;
    totalElements: number;
    last: boolean;
  };
  videolistPageMetadata: {
    size: number;
    totalPages: number;
    totalElements: number;
    last: boolean;
  };
  CUSTOM_CATE_CODE: string;

  customActiveKindList: any[];
  activeKindList: any[];
  profileThumbnailImg: string;

  statusEmail: string;
  checkEmail: boolean;
  checkName: boolean;
  successMessage: string;
}

const initialState: IProfileState = {
  errorMessage: "",
  videolistPage: 0,
  snapshotlistPage: 0,
  //size: 10,

  email: "",
  profileImg: "",
  aboutMe: "",
  name: "",
  myMessage: "",
  chUserActiveList: [],
  profileThumbnailImg: "",
  channelUserTagList: [],
  createdAt: "",

  imgPath: "",
  imgThumbnailPath: "",

  items: [], //snapshot 목록 정보
  videolist: [],
  pageMetadata: {
    size: 20,
    totalPages: 0,
    totalElements: 0,
    last: false,
  },
  snapshotPageMetadata: {
    size: 20,
    totalPages: 0,
    totalElements: 0,
    last: false,
  },
  videolistPageMetadata: {
    size: 20,
    totalPages: 0,
    totalElements: 0,
    last: false,
  },
  CUSTOM_CATE_CODE: "99",
  customActiveKindList: [],
  activeKindList: [],

  statusEmail: "",
  checkEmail: false,
  checkName: true,
  successMessage: "",
};

const name = "profileDetail";

export const asyncGetUserProfileInfo = createAsyncThunk(
  `${name}/asyncGetUserProfileInfo`,
  async (data: any, { rejectWithValue }) => {
    try {
      const { email } = data;
      const response = await API.getUserProfileInfo(email);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.status);
    }
  }
);

export const asyncGetUserProfileSnapshotList = createAsyncThunk(
  `${name}/asyncGetUserProfileSnapshotList`,
  async (data: any, { rejectWithValue }) => {
    try {
      const response = await API.getUserProfileSnapshotList(data);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.status);
    }
  }
);

export const asyncGetUserProfileVideoList = createAsyncThunk(
  `${name}/asyncGetUserProfileVideoList`,
  async (data: any, { rejectWithValue }) => {
    try {
      const response = await API.getUserProfileVideoList(data);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.status);
    }
  }
);

export const asyncDetailPageGetActiveList = createAsyncThunk(
  `${name}/asyncDetailPageGetActiveList`,
  async () => {
    try {
      const response = await API.getActiveList();
      return response.data;
    } catch (err) {
      return err;
    }
  }
);

export const asyncOnEditProfile = createAsyncThunk(
  `${name}/asyncOnEditProfile`,
  async (EditData: any, { rejectWithValue }) => {
    const { data, email } = EditData;
    console.log("EditData", EditData);
    try {
      const response = await API.onEditProfile(data, email);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.status);
    }
  }
);

// export const asyncOnSaveProfileImage = createAsyncThunk(
//   `${name}/asyncOnSaveProfileImage`,
//   async (imageData: any, { rejectWithValue }) => {
//     try {
//       const { formData } = imageData;
//       const response = await API.onSaveProfileImage(formData);
//       return response.data;
//     } catch (err) {
//       return rejectWithValue(err.response.status);
//     }
//   }
// );

export const asyncOnSaveProfileImage = (formData: any) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await API.onSaveProfileImage(formData);
      resolve(response.data);
    } catch (err) {
      reject(err);
    }
  });
};

export const asyncCheckValidationNickname = createAsyncThunk(
  `${name}/asyncCheckValidationNickname`,
  async (nickname: string, { rejectWithValue }) => {
    try {
      const response = await API.checkValidationNickname(nickname);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.status);
    }
  }
);

export const asyncCheckStatusEmail = createAsyncThunk(
  `${name}/asyncCheckStatusEmail`,
  async (userInfo: any, { rejectWithValue }) => {
    const { email } = userInfo;
    try {
      const response = await API.checkStatusEmail(email);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.status);
    }
  }
);

export const asyncOnAddProfile = createAsyncThunk(
  `${name}/asyncOnAddProfile`,
  async (userData: IProfileItemProps, { rejectWithValue }) => {
    try {
      const response = await API.onAddProfile(userData);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.status);
    }
  }
);

const profileDetail = createSlice({
  name,
  initialState,
  reducers: {
    changeSnapshotPage(state, { payload }: PayloadAction<number>) {
      state.snapshotlistPage = payload;
    },
    changeVideoPage(state, { payload }: PayloadAction<number>) {
      state.videolistPage = payload;
    },
    setIsActiveActiveKindList(state, { payload }: PayloadAction<any>) {
      state.activeKindList[payload].isActive =
        !state.activeKindList[payload].isActive;
    },
    changeChUserActiveList(state, { payload }: PayloadAction<any>) {},
    changeCustomActiveKindList(state, { payload }: PayloadAction<any>) {
      state.customActiveKindList = state.customActiveKindList.concat([
        {
          mainGubun: "01",
          subGubun: "01",
          cateCode: "99",
          codeName: payload,
        },
      ]);
    },
    deleteCustomActiveKindList(state, { payload }: PayloadAction<any>) {
      state.customActiveKindList.splice(payload, 1);
    },
    changeMyMessage(state, { payload }: PayloadAction<any>) {
      state.myMessage = payload;
    },
    changeAboutMe(state, { payload }: PayloadAction<any>) {
      state.aboutMe = payload;
    },
    deleteProfileImg(state, { payload }: PayloadAction<any>) {
      state.profileImg = payload;
      state.imgPath = payload;
      state.imgThumbnailPath = payload;
    },
    changeProfileImg(state, { payload }: PayloadAction<any>) {
      state.profileImg = payload;
    },
    changeEmail(state, { payload }: PayloadAction<any>) {
      state.email = payload;
    },
    changeName(state, { payload }: PayloadAction<any>) {
      state.name = payload;
    },
    changeCheckEmail(state, { payload }: PayloadAction<any>) {
      state.checkEmail = payload;
    },
    changeSuccessMessage(state, { payload }: PayloadAction<any>) {
      state.successMessage = payload;
    },
    initCustomActiveKindList(state, { payload }: PayloadAction<any>) {
      state.customActiveKindList = payload;
    },
    initImgPath(state, { payload }: PayloadAction<any>) {
      state.imgPath = payload;
    },
  },

  extraReducers: {
    [asyncGetUserProfileInfo.fulfilled.type]: (
      state,
      { payload }: PayloadAction<any>
    ) => {
      state.email = payload.email;
      state.profileImg = payload.profileImg;
      state.aboutMe = payload.aboutMe;
      state.name = payload.name;
      state.myMessage = payload.myMessage;
      state.chUserActiveList = payload.chUserActiveList;
      state.createdAt = payload.createdAt;

      state.customActiveKindList = [];
      for (var i in state.chUserActiveList) {
        let previousItem = state.chUserActiveList[i];
        if (previousItem.cateCode !== "99") {
          for (var j in state.activeKindList) {
            if (state.activeKindList[j].codeName === previousItem.codeName) {
              state.activeKindList[j].isActive = true;
              break;
            }
          }
        } else {
          state.customActiveKindList.push(previousItem);
        }
      }
    },
    [asyncGetUserProfileInfo.rejected.type]: (
      state,
      { payload }: PayloadAction<any>
    ) => {
      state.errorMessage = "리스트를 갸져오는 중에 오류가 발생하였습니다.";
    },

    [asyncGetUserProfileSnapshotList.fulfilled.type]: (
      state,
      { payload }: PayloadAction<any>
    ) => {
      state.items = payload.items;
      state.snapshotPageMetadata = payload.pageMetadata;
    },
    [asyncGetUserProfileSnapshotList.rejected.type]: (
      state,
      { payload }: PayloadAction<any>
    ) => {
      state.errorMessage = "리스트를 갸져오는 중에 오류가 발생하였습니다.";
    },

    [asyncGetUserProfileVideoList.fulfilled.type]: (
      state,
      { payload }: PayloadAction<any>
    ) => {
      state.videolist = payload.items;
      state.videolistPageMetadata = payload.pageMetadata;
    },
    [asyncGetUserProfileVideoList.rejected.type]: (
      state,
      { payload }: PayloadAction<any>
    ) => {
      state.errorMessage = "리스트를 갸져오는 중에 오류가 발생하였습니다.";
    },

    [asyncDetailPageGetActiveList.fulfilled.type]: (
      state,
      { payload }: PayloadAction<any>
    ) => {
      state.activeKindList = payload.activeKindList;
    },
    [asyncDetailPageGetActiveList.rejected.type]: (
      state,
      { payload }: PayloadAction<any>
    ) => {
      state.errorMessage = "리스트를 갸져오는 중에 오류가 발생하였습니다.";
    },

    // [asyncOnSaveProfileImage.fulfilled.type]: (
    //   state,
    //   { payload }: PayloadAction<any>
    // ) => {
    //   state.imgPath = payload.imgPath;
    //   state.imgThumbnailPath = payload.imgThumbnailPath;
    // },
    // [asyncOnSaveProfileImage.rejected.type]: (
    //   state,
    //   { payload }: PayloadAction<any>
    // ) => {
    //   state.errorMessage = "리스트를 갸져오는 중에 오류가 발생하였습니다.";
    // },

    [asyncOnEditProfile.fulfilled.type]: (
      state,
      { payload }: PayloadAction<any>
    ) => {
      state.successMessage = "회원 프로필 수정 완료했습니다";
    },
    [asyncOnEditProfile.rejected.type]: (
      state,
      { payload }: PayloadAction<any>
    ) => {
      state.errorMessage = "오류가 발생하였습니다.";
    },

    [asyncCheckValidationNickname.fulfilled.type]: (
      state,
      { payload }: PayloadAction<any>
    ) => {
      state.checkName = payload;

      switch (payload) {
        case true:
          alert("중복 된 이름 입니다");
          state.checkName = payload;
          break;
        case false:
          alert("등록 가능한 이름 입니다");
          state.checkName = payload;
          break;
      }
    },
    [asyncCheckValidationNickname.rejected.type]: (
      state,
      { payload }: PayloadAction<any>
    ) => {
      state.errorMessage = "리스트를 갸져오는 중에 오류가 발생하였습니다.";
    },

    [asyncCheckStatusEmail.fulfilled.type]: (
      state,
      { payload }: PayloadAction<any>
    ) => {
      state.statusEmail = payload.status;

      switch (payload.status) {
        case "NOT_CHANNEL_USER":
          alert("프로필 등록이 가능합니다.");
          state.checkEmail = true;
          break;
        case "CHANNEL_USER":
          alert("이미 등록한 채널 유저로 프로필 등록이 불가능합니다.");
          state.email = "";
          state.checkEmail = false;
          break;
        case "NOT_USER":
          alert("비회원 정보입니다. 아이디(이메일)를 확인해주세요");
          state.email = "";
          state.checkEmail = false;
          break;
        default:
          alert("정상적인 정보가 아닙니다.");
          state.checkEmail = false;
          break;
      }
    },

    [asyncCheckStatusEmail.rejected.type]: (
      state,
      { payload }: PayloadAction<any>
    ) => {
      state.errorMessage = "리스트를 갸져오는 중에 오류가 발생하였습니다.";
    },

    [asyncOnAddProfile.fulfilled.type]: (
      state,
      { payload }: PayloadAction<any>
    ) => {
      state.successMessage = "회원 프로필 등록 했습니다";
    },
    [asyncOnAddProfile.rejected.type]: (state) => {
      state.errorMessage = "오류가 발생했습니다";
    },
  },
});

export const {
  changeSnapshotPage,
  changeVideoPage,
  setIsActiveActiveKindList,
  changeCustomActiveKindList,
  deleteCustomActiveKindList,
  changeMyMessage,
  changeAboutMe,
  deleteProfileImg,
  changeProfileImg,
  changeEmail,
  changeName,
  changeCheckEmail,
  changeSuccessMessage,
  initCustomActiveKindList,
  initImgPath,
} = profileDetail.actions;

export default profileDetail.reducer;
