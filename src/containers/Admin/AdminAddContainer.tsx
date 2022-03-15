import React, { useState, useCallback,useEffect} from 'react';
import {useRootState} from '../../lib/hooks/useRootState';
import {inputRegex} from '../../lib/inputRegex';
import { useAppDispatch } from "../../store";
import {
  asyncCheckAdminLoginId,
  asyncSignup
  } from '../../modules/admin';


import { MenuItem } from '../../components/Menu';
import { validation } from '../../lib/validation';
import { isEmpty } from '../../lib/util';

import {Container, Row, Col, Table, Form, Button, InputGroup} from "react-bootstrap";
import { useHistory } from 'react-router-dom';

export const AdminAddContainer = () => {

    const {
      loginIdCheck
      } = useRootState((state) => state.admin);

    const dispatch = useAppDispatch();
    const history = useHistory();

    
    const [department, setDepartment] = useState<string>('');
    const [name, setName] = useState<string>('');
    const [loginId, seLoginId] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [phoneNumber, setPhoneNumber] = useState<string>('');

    const onCheckLoginId =()=>{
      if(isEmpty(loginId)){
        alert("아이디를 입력 해 주세요")
      }else if(validation.email(loginId)){
        alert("이메일 형식에 맞지 않습니다")

      } else{
        dispatch(asyncCheckAdminLoginId(loginId));

      }

    };

 

    const onChangeLoginId = (e: any,) => {
      seLoginId(e.target.value);
    };
    const onChangeDepartment = (e: any,) => {
      setDepartment(e.target.value);
    };
    const onChangeName = (e: any,) => {
      setName(e.target.value);
    };
    const onChangePhonenumber = (e: any,) => {
      setPhoneNumber(e.target.value);
    };
    const onChangePassword = (e: any,) => {
      setPassword(e.target.value);
    };

    const onAddAdminUser = () => { 
      if(loginIdCheck){
        alert("아이디 중복 체크 해주세요")
      }else if(isEmpty(name)){
        alert("이름을 입력 해주세요")

      }else if(isEmpty(phoneNumber)){
        alert("핸드폰 번호를 입력 해주세요")

      }else if(isEmpty(department)){
        alert("부서명을 입력 해주세요")

      }else if(isEmpty(password)){
        alert("비밀번호를 입력해주세요")
      }else if (validation.password(password)){
        alert("비밀번호 형식에 맞지 않습니다")
      }else{
        dispatch(asyncSignup({
          loginId,
          password,
          name,
          phoneNumber,
          department,
        }))

        alert("등록 완료했습니다");
        document.location.href = "/main/admin";

      }


    }
    const onCancle = () => {
      history.goBack();
    }


    return(
        <Container>
            <MenuItem
              title='운영자 관리'
              largeTitle='운영 관리'
              middleTitle ='운영자 관리'
              smallTitle='등록'
           />
            <Container >
            <Table variant="white" bordered >
              <tbody>
                <tr>
                  <td >권한 등급</td>
                  <td>
                  <Form.Select aria-label="Default select example">
                        <option>전체</option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                   </Form.Select>
                  </td>
                  <td>부서명</td>
                  <td>
                    <Form.Control 
                      type="text" 
                      placeholder="부서명"
                      value={department} 
                      onChange={onChangeDepartment}
                    />
                  </td>
                </tr>
                <tr>
                    <td>아이디</td>
                    <td> 
                    <InputGroup className="mb-3" style={{width:'300px'}}>
                      <Form.Control
                       type='text'
                        placeholder="아이디"
                        aria-label={loginId}
                        aria-describedby="basic-addon2"
                        onChange={onChangeLoginId}
                      />
                      <Button 
                      variant="outline-secondary" 
                      id="button-addon2"
                      onClick={onCheckLoginId}
                      >
                        중복 확인
                      </Button>
                    </InputGroup>
                    </td>
                    <td>이름</td>
                    <td>
                      <Form.Control 
                        type="text" 
                        placeholder="이름"
                        value={name} 
                        onChange={onChangeName}
                      />
                    </td>
                </tr>
                <tr>
                    <td>비밀번호</td>
                    <td colSpan={3}>
                      <Form.Control 
                        type="password" 
                        placeholder="비밀번호"
                        value={password} 
                        onChange={onChangePassword}
                      />
                    </td>
                </tr>
                <tr>
                    <td>휴대폰번호</td>
                    <td colSpan={3}>
                      <Form.Control 
                        type="text" 
                        placeholder="전화번호"
                        value={phoneNumber} 
                        onChange={onChangePhonenumber}
                      />
                    </td>
                </tr>
              </tbody>
            </Table>
         </Container>
         <Row className="justify-content-md-center">
             <Col md={{ span: 7, offset: 5 }}>
             <Button style={{marginLeft:'10px'}}variant="outline-primary" onClick={onCancle}>취소</Button>
              <Button 
              style={{marginLeft:'10px'}}variant="outline-primary" onClick={onAddAdminUser}>등록</Button>
             </Col>
         </Row>
           
        </Container>
       
    )
  }