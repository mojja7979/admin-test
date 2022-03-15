import React, { useState, useCallback,useEffect} from 'react';
import { useDispatch } from "react-redux";
import {useRootState} from '../../lib/hooks/useRootState';
import {inputRegex} from '../../lib/inputRegex';
import { RootState } from "../../reducer";
import { useAppDispatch } from "../../store";
import {
    asyncLogin,
    initLoginState,
    initLoginErrorState,
    changeEmail,
    changePassword,
    
  } from '../../modules/auth';
import { Login } from '../../components/Auth/Login';

export const LoginContainer = ({ history } : { history: any }) => {

    const { email, password, isLogin } = useRootState((state) => state.login);

    const dispatch = useAppDispatch();
     

    // const [id, setId] = useState<string>('');
    // const [pw, setPw] = useState<string>('');
  
    const onLogin = (email: string, password: string) => {
      // 유효성 검사
      if(!email || !password) {
        alert("아이디나 비밀번호를 입력하세요.")
        return
      }

      try {
          console.log(email, password);
          dispatch(asyncLogin({email, password}));
      } catch(err) {
            alert("문제가 발생하여 로그인할 수 없습니다.");
            console.log("loginError", err);
      }
    }
    useEffect(() => {
      if(isLogin){
        alert("로그인 되었습니다.");
        history.push("/");
      }   
    }, [isLogin, history])
    

  return(
    <Login onSignIn={onLogin} />
  )
}