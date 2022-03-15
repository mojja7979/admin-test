import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import * as API from "../../api/snapshot";
import {
  ISnapshotListItemProps,
  ISnapshotListResponse,
  ISnapshotDetailResponse,
} from "../../api/snapshot";

import { IProfileActiveListProps } from "../../api/profile";
import { DefaultDeserializer } from "v8";

interface ISnapshotState
  extends ISnapshotListResponse,
    ISnapshotDetailResponse {
  errorMessage: string;
  page: number;
  size: number;
  workTypeList: any[];
  chUserWorkTypeList: IProfileActiveListProps[];
  customWorkTypeList: any[];
  CUSTOM_CATE_CODE: string;
  snapshotListImg: string;
  changeSnapshotListImg: string;
  snapShotImages: any[];
  checkEmail: boolean;
}

const initialState: ISnapshotState = {
  errorMessage: "",
  page: 0,
  size: 20,

  items: [],
  workTypeList: [],
  pageMetadata: {
    size: 20,
    totalPages: 0,
    totalElements: 0,
    last: true,
  },

  portfolioId: 0,
  email: "",
  name: "",
  title: "",
  coverImg: "",
  description: "",
  createdAt: "",
  snapshotList: [],
  chUserWorkTypeList: [],
  customWorkTypeList: [],
  CUSTOM_CATE_CODE: "99",
  snapshotListImg: "",
  changeSnapshotListImg: "",
  snapShotImages: [],
  checkEmail: false,
};

const name = "snapshot";

export const asyncGetSnapshotList = createAsyncThunk(
  `${name}/asyncGetSnapshotList`,
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
      const response = await API.getSnapshotList(
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

export const asyncGetWorktypeList = createAsyncThunk(
  `${name}/asyncGetWorktypeList`,
  async () => {
    try {
      const response = await API.getWorktypeList();
      return response.data;
    } catch (err) {
      return err;
    }
  }
);

export const asyncGetSnapshotDetail = createAsyncThunk(
  `${name}/asyncGetSnapshotDetail`,
  async (id: number, { rejectWithValue }) => {
    try {
      const response = await API.getSnapshotDetail(id);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.status);
    }
  }
);

export const asyncSaveSnapshotImage = (formData: any) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await API.saveSnapshotImage(formData);
      resolve(response.data);
    } catch (err) {
      reject(err);
    }
  });
};
export const asyncSaveSnapshotImages = (formData: any) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await API.saveSnapshotImage(formData);
      resolve(response.data);
    } catch (err) {
      reject(err);
    }
  });
};

// export const asyncEditSnapshot = createAsyncThunk(
//   `${name}/asyncEditSnapshot`,
//   async (EditData: any, { rejectWithValue }) => {
//     const { data, id } = EditData;
//     console.log("EditData",EditData)
//     try {
//       const response = await API.editSnapshot(data,id);
//       return response.data;
//     } catch (err) {
//       return rejectWithValue(err.response.status);
//     }
//   }
// );

export const asyncEditSnapshot = (EditData: any) => {
  return new Promise(async (resolve, reject) => {
    const { data, id } = EditData;
    try {
      const response = await API.editSnapshot(data, id);
      resolve(response.data);
    } catch (err) {
      reject(err);
    }
  });
};

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

export const asyncAddSnapshot = (data: any) => {
  return new Promise(async (resolve, reject) => {
    // const { data, id } = EditData;
    try {
      const response = await API.addSnapshot(data);
      resolve(response.data);
    } catch (err) {
      reject(err);
    }
  });
};

const snapshot = createSlice({

    name,
    initialState,
    reducers: {
      changePage(state, { payload }: PayloadAction<number>) {
          state.page = payload;
      },
      deleteCoverImg(state, { payload }: PayloadAction<any>) {
          state.coverImg = payload;
      },
      setIsActiveWorkTypeList(state, {payload}: PayloadAction<any>) {
        state.workTypeList[payload].isActive = !state.workTypeList[payload].isActive
      },
      changeCustomWorkTypeList(state, {payload}: PayloadAction<any>) {
        state.customWorkTypeList = state.customWorkTypeList.concat([
          {
            mainGubun: "01",
            subGubun: "01",
            cateCode: "99",
            codeName: payload
          }
        ]
         
        )
      },

      changeTitle(state, {payload}: PayloadAction<any>) {
        state.title = payload
      },
      changeDescription(state, {payload}: PayloadAction<any>) {
        state.description = payload
      },
      deleteCustomWorkTypeList(state, {payload}: PayloadAction<any>) {
        state.customWorkTypeList.splice(payload, 1)
       },

       changeSnapshotImgList(state, {payload}: PayloadAction<any>) {

        //  if(state.snapshotList.length>0){
        //   state.snapshotList[payload].imagePath = state.changeSnapshotListImg;
        //   state.snapshotList[payload].imgOrder = payload;
        //  }
        // state.snapshotList = state.snapshotList.concat(payload)
        state.snapShotImages = payload
         
       },
       changeCoverImg(state, {payload}: PayloadAction<any>) {
        state.coverImg = payload
       },

       addSnapshotImg(state, {payload}: PayloadAction<any>) {
        // state.snapshotList = state.snapshotList.concat({
        //   imagePath:state.snapshotListImg,
        //   imgOrder: state.snapshotList.length+1
        // })
        state.snapShotImages = state.snapShotImages.concat(payload)
       },
       deleteSnapshotImg(state, {payload}: PayloadAction<any>) {
        state.snapShotImages.splice(payload, 1)
       },
       changeEmail(state, {payload}: PayloadAction<any>) {
        state.email =payload
       },
       initSnapshotList(state, {payload}: PayloadAction<any>) {
        state.snapShotImages =payload
       },
       initCustomWorkTypeList(state, {payload}: PayloadAction<any>) {
        state.customWorkTypeList =payload
       },
       initCheckEmail(state, {payload}: PayloadAction<any>) {
        state.checkEmail =payload
       },
       
       
      },
      
  extraReducers: {
    [asyncGetSnapshotList.fulfilled.type]: (
      state,
      { payload }: PayloadAction<any>
    ) => {
      state.items = payload.items;
      state.pageMetadata = payload.pageMetadata;
    },
    [asyncGetSnapshotList.rejected.type]: (
      state,
      { payload }: PayloadAction<any>
    ) => {
      state.errorMessage = "리스트를 갸져오는 중에 오류가 발생하였습니다.";
    },

      [asyncGetSnapshotDetail.fulfilled.type]: (
        state,
        { payload }: PayloadAction<any>
      ) => {
        state.portfolioId = payload.portfolioId
        state.email = payload.email
        state.name = payload.name
        state.title = payload.title
        state.coverImg = payload.coverImg
        state.description = payload.description
        state.createdAt = payload.createdAt
        state.snapshotList = payload.snapshotList
        state.snapShotImages = payload.snapshotList.sort(function(a:any, b:any) {
          return a['imgOrder'] - b['imgOrder'];
        });
        state.chUserWorkTypeList = payload.workTypeList;

        state.customWorkTypeList = [];
        for(var i in state.chUserWorkTypeList) {
          let previousItem = state.chUserWorkTypeList[i]
          if(previousItem.cateCode !== '99') {
            for(var j in state.workTypeList){
              if(state.workTypeList[j].codeName === previousItem.codeName){
                state.workTypeList[j].isActive = true
                break
              }
            }
          } else {
            state.customWorkTypeList.push(previousItem)
          }
        }

      },
      [asyncGetSnapshotDetail.rejected.type]: (
        state,
        { payload }: PayloadAction<any>
      ) => {
        state.errorMessage = "리스트를 갸져오는 중에 오류가 발생하였습니다.";
      },
  
    [asyncGetWorktypeList.fulfilled.type]: (
      state,
      { payload }: PayloadAction<any>
    ) => {
      state.workTypeList = payload.workTypeList;
    },
    [asyncGetWorktypeList.rejected.type]: (
      state,
      { payload }: PayloadAction<any>
    ) => {
      state.errorMessage = "리스트를 갸져오는 중에 오류가 발생하였습니다.";
    },

    [asyncCheckStatusEmail.fulfilled.type]: (
      state,
      { payload }: PayloadAction<any>
    ) => {
      switch (payload.status) {
        case "NOT_CHANNEL_USER":
          alert("스냅샷 등록이 불가능 합니다.");
          state.email = "";
          state.checkEmail = false;
          break;
        case "CHANNEL_USER":
          alert("스냅샷 등록이 가능합니다.");
          state.checkEmail = true;
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
  },
});

export const {
  changePage,
  deleteCoverImg,
  setIsActiveWorkTypeList,
  changeCustomWorkTypeList,
  changeTitle,
  deleteCustomWorkTypeList,
  changeDescription,
  changeSnapshotImgList,
  addSnapshotImg,
  deleteSnapshotImg,
  changeCoverImg,
  initSnapshotList,
  changeEmail,
  initCustomWorkTypeList,
  initCheckEmail,
} = snapshot.actions;

export default snapshot.reducer;
