import { combineReducers } from "@reduxjs/toolkit";

import loginReducer from "../modules/auth/loginSlice";
import adminReducer from "../modules/admin/adminSlice";
import memberReducer from "../modules/member/memberSlice";
import reportReducer from "../modules/report/reportSlice";
import profileReducer from "../modules/profile/profileSlice";
import profileDetailReducer from "../modules/profile/profileDetailSlice";
import qnaReducer from "../modules/qna/qnaSlice";
import videoReducer from "../modules/video/videoSlice";
import snapshotReducer from "../modules/snapshot/snapshotSlice";

const appReducer = combineReducers({
  login: loginReducer,
  admin: adminReducer,
  member: memberReducer,
  report: reportReducer,
  profile: profileReducer,
  profileDetail: profileDetailReducer,
  qna: qnaReducer,
  video: videoReducer,
  snapshot: snapshotReducer
});

const rootReducer = (state: any, action: any) => {
  if (action.type === "auth/logout") {
    state = undefined;
  }
  return appReducer(state, action);
};

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
