import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import * as API from "../../api/auth";
import { ILoginResponse } from "../../api/auth";
import { isEmpty } from "../../lib/util";

interface ILoginState extends ILoginResponse {
  isLoading: boolean;
  //error: string | null;
  errorMessage: string | null;

  isLogin: boolean;

  email: string;
  password: string;
}

const initialState: ILoginState = {
  isLoading: false,
  error: null,
  errorMessage: null,
  isLogin: false,
  email: "",
  password: "",

  loginId: "",
  authority: "",
  roleId: 0,
  token: {
    accessToken: "",
    grantType: "",
    refreshToken: "",
  },
  timestamp: "",
  status: 0,
  code: "",
  message: "",
};

const name = "login";

export const asyncLogin = createAsyncThunk(
  `${name}/asyncLogin`,
  async (loginData: any, { rejectWithValue }) => {
    const { email, password } = loginData;
    try {
      const response = await API.onLogin(email, password);
      return response;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const login = createSlice({
  name,
  initialState,
  reducers: {
    initLoginErrorState(state) {
      state.isLoading = false;
      state.error = null;
      state.errorMessage = null;
    },
    initLoginState(state) {
      state.isLoading = false;
      state.error = null;
      state.errorMessage = null;
      state.email = "ㄸㄸ";
      state.password = "";
    },
    setIsLogin(state, { payload }: PayloadAction<boolean>) {
      state.isLogin = payload;
    },
    unsetIsLogin(state) {
      state.isLogin = false;
      sessionStorage.removeItem("refreshToken");
      sessionStorage.removeItem("isAuthorized");
      sessionStorage.removeItem("accessToken");
      sessionStorage.removeItem("roleId");
    },
    changeEmail(state, { payload }: PayloadAction<string>) {
      state.email = payload;
    },
    changePassword(state, { payload }: PayloadAction<string>) {
      state.password = payload;
    },
  },
  extraReducers: {
    [asyncLogin.pending.type]: (state) => {
      state.isLoading = true;
      state.errorMessage = null;
      state.error = null;
      state.isLogin = false;
    },
    [asyncLogin.fulfilled.type]: (
      state,
      { payload }: PayloadAction<ILoginResponse>
    ) => {
      state.isLoading = false;
      state.isLogin = true;
      const { accessToken, refreshToken } = payload.token;
      const { loginId, roleId } = payload;
      state.token.accessToken = accessToken;
      state.token.refreshToken = refreshToken;
      state.loginId = loginId;
      state.roleId = roleId;
      sessionStorage.setItem("accessToken", accessToken ?? "");
      sessionStorage.setItem("refreshToken", refreshToken ?? "");
      sessionStorage.setItem("isAuthorized", "true");
      sessionStorage.setItem("roleId", String(roleId));
    },
    [asyncLogin.rejected.type]: (state, { payload }: PayloadAction<any>) => {
      state.isLoading = false;
      console.log("payload " + JSON.stringify(payload));
      state.error = payload;
      if (isEmpty(payload) || payload.code !== 200) {
        state.errorMessage = payload?.message;
        alert(
          isEmpty(payload)
            ? "로그인이 실패하였습니다. 서버 담당자에게 확인 요청 부탁드립니다."
            : payload.message
        );
      }
    },
  },
});

export const {
  initLoginState,
  setIsLogin,
  unsetIsLogin,
  initLoginErrorState,
  changeEmail,
  changePassword,
} = login.actions;

export default login.reducer;
