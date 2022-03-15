import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import MainHeader from "../../components/Common/MainHeader";
import apiClient from "../../api/apiClient";
import { unsetIsLogin } from "../../modules/auth";
import { useRootState } from '../../lib/hooks/useRootState';
import { useHistory } from 'react-router-dom';
import jwt_decode from 'jwt-decode';

export interface jwt_token {
  sub: any,
  auth: any,
  exp: any
};

export const MainHeaderContainer = () => {

  const { loginId } = useRootState((state) => state.login);
  const dispatch = useDispatch();
  const history = useHistory();

  const [email, setEmail] = useState(loginId);
  const [roleId, setRoleId] = useState("");
  const onLogout = () => {
    const accessToken = sessionStorage.getItem("accessToken");
    if (accessToken) {
      delete apiClient.defaults.headers.common.Authorization;
      dispatch(unsetIsLogin());
    }
    history.push("/login");
  };

  useEffect(() => {
    let isAuthorized = sessionStorage.getItem("isAuthorized");
    if (!isAuthorized) {
      alert("로그인이 필요합니다.");
      history.push("/login");
    }
  });

  useEffect(() => {
    const accessToken = sessionStorage.getItem('accessToken');
    const userId = sessionStorage.getItem("roleId");
    if (accessToken) {
      try {
        const token: any = jwt_decode(accessToken);
        const { sub, auth, exp }: jwt_token = jwt_decode(accessToken);
        if (Date.now() >= token?.exp * 1000) {
          sessionStorage.removeItem("refreshToken");
          sessionStorage.removeItem("isAuthorized");
          sessionStorage.removeItem("accessToken");
          sessionStorage.removeItem("roleId");
          history.push("/login");
        } else {
          setEmail(sub);
          setRoleId(userId ? userId : "");

        }
      } catch (e) {
        window.localStorage.removeItem('user');
      }
    }
  }, []);
  return (
    <MainHeader
      loginId={email}
      roleId={roleId}
      onLogout={onLogout}
    />
  );
};