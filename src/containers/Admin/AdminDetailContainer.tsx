import React, { useState, useCallback, useEffect } from 'react';
import { useRootState } from '../../lib/hooks/useRootState';
import { inputRegex } from '../../lib/inputRegex';
import { useAppDispatch } from "../../store";
import {
  asyncGetAdminInfo,
  changeDepartmentName,
  changeName,
  changePhoneNumber,
  changeIsActive,
  changePassword,
  asyncEditAdminInfo,
  asyncEditAdminInfoPassword
} from '../../modules/admin';

import { BoardListItem } from '../../components/Board';
import { MenuItem } from '../../components/Menu';
import { validation } from '../../lib/validation';
import { isEmpty } from '../../lib/util';


import {Container, Row, Col, Table, Form, Button, InputGroup} from "react-bootstrap";
import { useHistory } from 'react-router-dom';

export const AdminDetailContainer = ({ match }: any) => {
  const { id } = match.params;
  console.log("id", id)
  const {
    loginId,
    password,
    name,
    phoneNumber,
    departmentName,
    authority,
    isActive,
    roleId
  } = useRootState((state) => state.admin);
  const dispatch = useAppDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(asyncGetAdminInfo({ id }));
  }, [])

  const boardTitle = ['No', '구분', '아이디', '이름', '수정일', '변경 내용'];

  const onChangeDepartment = (e: any,) => {
    dispatch(changeDepartmentName(e.target.value));
  };
  const onChangeName = (e: any,) => {
    dispatch(changeName(e.target.value));
  };
  const onChangePhonenumber = (e: any,) => {
    dispatch(changePhoneNumber(e.target.value));
  };
  const onChangePassword = (e: any,) => {

    dispatch(changePassword(e.target.value));
  };
  const onEditPassword = () => {

    if(isEmpty(password)){
      alert("비밀번호를 입력 해 주세요")
    }else{

      if(!validation.password(password)){
        dispatch(asyncEditAdminInfoPassword({changePassword:password,id:id}))
      }else {
        dispatch(changePassword(''));
        alert("비밀번호 형식에 맞지 않습니다");
      }

    }
  }

  const onEdit = () => {

    if(isEmpty(departmentName)){
      alert("부서명을 입력해주세요")
    }else if(isEmpty(name)){
      alert("이름을 입력해주세요")

    }else if(isEmpty(phoneNumber)){
      alert("핸드폰 번호를 입력해주세요")

    }else {

      dispatch(asyncEditAdminInfo({
        data: {
          name,
          phoneNumber,
          departmentName,
          isActive
  
        },
        id
      }
      ))
      alert("관리자 정보 수정 완료했습니다");
      document.location.href = "/main/admin";
      //history.push("/main/admin");

    }
 
  }

  const onCancle = () => {
    history.goBack();
  }

  return (
    <Container>
      <MenuItem
        title='운영자 관리'
        largeTitle='운영 관리'
        middleTitle='운영자 관리'
        smallTitle='상세'
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
                  type="email"
                  placeholder="name@example.com"
                  value={departmentName}
                  onChange={onChangeDepartment}
                />
              </td>
            </tr>
            <tr>
              <td>아이디</td>
              <td>
                 <Form.Label aria-label="Default select example">
                  {loginId}
                </Form.Label>
              </td>
              <td>이름</td>
              <td>
                <Form.Control
                  type="email"
                  placeholder="name@example.com"
                  value={name}
                  onChange={onChangeName}
                />
              </td>
            </tr>
            <tr>
              <td>비밀번호</td>
              <td colSpan={3}>
                <InputGroup className="mb-3" style={{ width: '300px' }}>
                  <Form.Control
                    type='password'
                    placeholder="비밀번호"
                    aria-label={password}
                    aria-describedby="basic-addon2"
                    onChange={onChangePassword}
                  />
                  <Button
                    variant="outline-secondary"
                    id="button-addon2"
                    onClick={onEditPassword}
                  >
                    수정
                  </Button>
                </InputGroup>
              </td>
            </tr>
            <tr>
              <td>휴대폰번호</td>
              <td colSpan={3}>
                <Form.Control
                  type="email"
                  placeholder="name@example.com"
                  value={phoneNumber}
                  style={{ width: '300px' }}
                  onChange={onChangePhonenumber}
                />
              </td>
            </tr>
          </tbody>
        </Table>
        <Row className="justify-content-md-center" style={{ margin: '20px 0' }}>
          <Col md={{ span: 7, offset: 5 }}>
            <Button style={{ marginLeft: '10px' }} variant="outline-primary" onClick={onCancle}>취소</Button>
            <Button style={{ marginLeft: '10px' }} variant="outline-primary" onClick={onEdit}>저장</Button>
          </Col>
        </Row>
      </Container>
      {/* 차후 추가예정
      <BoardListItem
        boardTitle={boardTitle}
        content={boardTitle}
        address='adminDetail'
        listType='admin'
      /> */}
      {/* <Paginations
        postsPerPage={2}
        totalPosts={5}
        getCurrentPage={1}
      /> */}


    </Container>

  )
}