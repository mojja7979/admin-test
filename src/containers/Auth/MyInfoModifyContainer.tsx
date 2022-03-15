import React, { useState, useEffect } from 'react';
import { useRootState } from '../../lib/hooks/useRootState';
import { useAppDispatch } from "../../store";
import {
  asyncGetAdminInfo,
  changeDepartmentName,
  changeName,
  changePhoneNumber,
  asyncOnMyInfoModify,
} from '../../modules/admin';
import { useHistory } from 'react-router-dom';

import { MenuItem } from '../../components/Menu';
import { Maybe } from '../../components/Maybe';
import { isEmpty, passwordChecking } from '../../lib/util';

import { Container, Row, Col, Table, Form, Button, InputGroup } from "react-bootstrap";

export const MyInfoModifyContainer = ({ match }: any) => {
  const { id } = match.params;
  const {
    loginId,
    name,
    phoneNumber,
    departmentName,
    authority,
  } = useRootState((state) => state.admin);
  const dispatch = useAppDispatch();
  const history = useHistory();

  const [password, setPassword] = useState("");
  const [changePassword, setChangePassword] = useState("");
  const [changePasswordCheck, setChangePasswordCheck] = useState("");
  const [passwordChangeForm, setPasswordChangeForm] = useState(false);

  useEffect(() => {
    dispatch(asyncGetAdminInfo({ id }));
  }, [])


  const onChangeDepartment = (e: any,) => {
    dispatch(changeDepartmentName(e.target.value));
  };
  const onChangeName = (e: any,) => {
    dispatch(changeName(e.target.value));
  };
  const onChangePhonenumber = (e: any,) => {
    dispatch(changePhoneNumber(e.target.value));
  };

  const onPassword = (e: any) => {
    setPassword(e.target.value);
  }
  const onChangePassword = (e: any) => {
    setChangePassword(e.target.value);
  }
  const onChangePasswordcheck = (e: any) => {
    setChangePasswordCheck(e.target.value);
  }

  const onEdit = () => {
    let passChk = true;
    if (isEmpty(departmentName)) {
      alert("부서명을 입력해주세요.");
      passChk = false;
      return;
    }
    if (isEmpty(name)) {
      alert("이름을 입력해주세요.");
      passChk = false;
      return;
    }
    if (changePassword !== changePasswordCheck) {
      alert("변경할 비밀번호가 다릅니다.");
      passChk = false;
      return;
    }
    if (passwordChangeForm) {
      if (isEmpty(password) || isEmpty(changePassword)) {
        alert("비밀번호를 넣어주세요.");
        passChk = false;
        return;
      }
      if (!passwordChecking(changePassword)) {
        alert('비밀번호 조합기준에 적합하지 않습니다. 다시 확인해 주세요.');
        passChk = false;
        return;
      }
    }
    if (isEmpty(phoneNumber)) {
      alert("휴대폰 번호를 입력해주세요.");
      passChk = false;
      return;
    }

    if (passChk) {

      dispatch(asyncOnMyInfoModify(
        {
          name: name,
          phoneNumber: phoneNumber,
          departmentName: departmentName,
          password: password ?? '',
          changePassword: changePassword ?? '',
        }
      )
      );
      alert("운영자 계정 정보가 저장되었습니다.");
    }
  }
  const onCancel = () => {
    history.goBack();
  };

  const openPassword = () => {
    setPasswordChangeForm(true);
  };

  const closePassword = () => {
    setPasswordChangeForm(false);
    setChangePassword("");
    setChangePassword("");
    setChangePasswordCheck("");
  };


  return (
    <Container>
      <MenuItem
        title='정보 수정'
        largeTitle='대시 보드'
        middleTitle='정보 수정'
        smallTitle=''
      />
      <Container >
        <Table variant="white" bordered >
          <tbody>
            <tr>
              <td >권한 등급</td>
              <td>
                <Form.Control
                  type="text"
                  readOnly
                  defaultValue={authority} />
              </td>
              <td>부서명</td>
              <td>
                <Form.Control
                  type="text"
                  placeholder="부서명을 입력하세요."
                  value={departmentName}
                  onChange={onChangeDepartment}
                />
              </td>
            </tr>
            <tr>
              <td>아이디</td>
              <td>
                <Form.Control
                  type="text"
                  readOnly
                  defaultValue={loginId}
                />
              </td>
              <td>이름</td>
              <td>
                <Form.Control
                  type="text"
                  placeholder="이릉을 입력하세요."
                  value={name}
                  onChange={onChangeName}
                />
              </td>
            </tr>
            <tr>
              <td>비밀번호</td>
              <td colSpan={3}>
                <Maybe test={passwordChangeForm === true}>
                  <InputGroup className="mb-3" style={{ width: '400px' }}>
                    <Form.Control
                      type='password'
                      placeholder="현재 비밀번호"
                      aria-label={password}
                      aria-describedby="basic-addon2"
                      onChange={onPassword}
                    />
                  </InputGroup>
                  <InputGroup className="mb-3" style={{ width: '400px' }}>
                    <Form.Control
                      type='password'
                      placeholder="신규 비밀번호(8~20자 영문, 숫자, 특수기호 조합)"
                      aria-label={changePassword}
                      aria-describedby="basic-addon2"
                      onChange={onChangePassword}
                    />
                  </InputGroup>
                  <InputGroup className="mb-3" style={{ width: '465px' }}>
                    <Form.Control
                      type='password'
                      placeholder="신규 비밀번호 확인"
                      aria-label={changePasswordCheck}
                      aria-describedby="basic-addon2"
                      onChange={onChangePasswordcheck}
                    />
                    <Button style={{ marginLeft: '10px' }} variant="outline-primary" onClick={closePassword}>취소</Button>
                  </InputGroup>
                </Maybe>
                <Maybe test={passwordChangeForm === false}>
                  <Button style={{ marginLeft: '10px' }} variant="outline-primary" onClick={openPassword}>변경</Button>
                </Maybe>

              </td>
            </tr>
            <tr>
              <td>휴대폰번호</td>
              <td colSpan={3}>
                <Form.Control
                  type="text"
                  placeholder="000-0000-0000"
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
            <Button style={{ marginLeft: '10px' }} variant="outline-primary" onClick={onCancel}>취소</Button>
            <Button style={{ marginLeft: '10px' }} variant="outline-primary" onClick={onEdit}>저장</Button>
          </Col>
        </Row>
      </Container>

    </Container>

  )
};


