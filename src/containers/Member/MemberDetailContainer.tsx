import React, { useEffect, useState } from 'react'
import { useRootState } from '../../lib/hooks/useRootState';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { asyncGetMemberDetail, changeNickName, changeNickNamecheck, asyncNickNameValidationCheck, asyncEditMemberDetail } from '../../modules/member'

import { MenuItem } from '../../components/Menu';

import { Container, Row, Col, Form, Table, Button } from 'react-bootstrap';
import { isEmpty } from '../../lib/util';


export const MemberDetailContainer = ({ match }: any) => {
  const { id } = match.params;
  const {
    email,
    nickName,
    pushActive,
    state,
    channelActive,
    phoneNumber,
    nightPushActive,
    adPushActive,
    createdAt,
    nickNameChange,
  } = useRootState((state) => state.member);
  const dispatch = useDispatch();
  const history = useHistory();


  useEffect(() => {
    dispatch(asyncGetMemberDetail({ id }));
  }, [])

  const onSave = () => {
    if (nickNameChange) {
      alert("닉네임 중복확인을 해주세요.");
      return;
    }
    if (isEmpty(nickName)) {
      alert("닉네임을 입력해주세요");
      return;
    }
    if (nickName.length < 2) {
      alert("닉네임은 2자리 이상을 입력해주세요.");
    } else {
      dispatch(asyncEditMemberDetail({ id, email, nickName }));
      alert("회원정보가 저장되었습니다.");
      // history.push("/main/member");
      document.location.href = '/main/member';
    }
  }

  const onChangeNickName = (e: any) => {
    dispatch(changeNickName(e.target.value));
    dispatch(changeNickNamecheck(true));
  }

  const onNickNameChk = () => {
    if (isEmpty(nickName)) {
      alert("닉네임을 입력해주세요");
      return;
    }
    if (nickName.length < 2) {
      alert("닉네임은 2자리 이상을 입력해주세요.");
      return;
    }
    dispatch(asyncNickNameValidationCheck({ nickName }));
  }

  const onCancle = () => {
    history.goBack();
  }


  return (
    <Container>
      <MenuItem
        title='회원 관리'
        largeTitle='회원 관리'
        middleTitle='회원 관리'
        smallTitle='상세'
      />
      <Container >
        ◎ 회원 구분
        <Table variant="white" bordered >
          <colgroup>
            <col width="50%" />
            <col width="50%" />
          </colgroup>
          <tbody>
            <tr>
              <td >구분 </td>
              <td>
                <Form.Label aria-label="Default select example">
                  {channelActive ? "채널 회원" : "일반 회원"}{state === "DELETED" ? "(탈퇴)" : ""}
                </Form.Label>
              </td>
            </tr>
          </tbody>
        </Table>
        ◎ 회원 정보
        <Table variant="white" bordered >
          <colgroup>
            <col width="25%" />
            <col width="25%" />
            <col width="25%" />
            <col width="25%" />
          </colgroup>

          <tbody>
            <tr>
              <td>구분 </td>
              <td>
                <Form.Label aria-label="Default select example">
                  {email}
                </Form.Label>
              </td>
              <td>닉네임 </td>
              <td>
                <Form.Control
                  type="text"
                  placeholder="닉네임"
                  value={nickName}
                  onChange={onChangeNickName}
                  style={{ width: "70%", float: "left" }}
                />
                <Button style={{ float: "right" }} variant="outline-primary" onClick={onNickNameChk}>중복 확인</Button>
              </td>
            </tr>
            <tr>
              <td>휴대폰 번호 </td>
              <td>
                <Form.Label aria-label="Default select example">
                  {phoneNumber}
                </Form.Label>
              </td>
              <td>가입일 </td>
              <td>
                <Form.Label aria-label="Default select example">
                  {createdAt}
                </Form.Label>
              </td>
            </tr>
          </tbody>
        </Table>

        ◎ 어플 관리
        <Table variant="white" bordered >
          <colgroup>
            <col width="25%" />
            <col width="25%" />
            <col width="25%" />
            <col width="25%" />
          </colgroup>

          <tbody>
            <tr>
              <td>알림 푸시 </td>
              <td>
                <Form.Label aria-label="Default select example">
                  {pushActive === "Y" ? "동의" : "미동의"}
                </Form.Label>
              </td>
              <td>야간 수신 동의 </td>
              <td>
                <Form.Label aria-label="Default select example">
                  {nightPushActive === "Y" ? "동의" : "미동의"}
                </Form.Label>
              </td>
            </tr>
            <tr>
              <td>광고성 정보 푸시 </td>
              <td colSpan={3}>
                <Form.Label aria-label="Default select example">
                  {adPushActive === "Y" ? "동의" : "미동의"}
                </Form.Label>
              </td>
            </tr>
          </tbody>
        </Table>

        <Row className="justify-content-md-center" style={{ margin: '20px 0' }}>
          <Col md={{ span: 7, offset: 5 }}>
            <Button style={{ marginLeft: '10px' }} variant="outline-primary" onClick={onCancle}>취소</Button>
            <Button style={{ marginLeft: '10px' }} variant="outline-primary" onClick={onSave}>저장</Button>
          </Col>
        </Row>
      </Container>
    </Container >

  )
}
