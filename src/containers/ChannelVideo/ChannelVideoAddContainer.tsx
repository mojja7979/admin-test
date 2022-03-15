import React, { useEffect, useState } from 'react'
import { useRootState } from '../../lib/hooks/useRootState';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { asyncNewAddVideo, asyncGetMemberStatus, isMemberCheck } from '../../modules/video'

import { MenuItem } from '../../components/Menu';

import { Container, Row, Col, Form, Table, Button } from 'react-bootstrap';
import { isEmpty } from '../../lib/util';
import { Maybe } from '../../components/Maybe';


export const ChannelVideoAddContainer = () => {
  const {
    memberStatus,
    is_memberCheck,
  } = useRootState((state) => state.video);
  const dispatch = useDispatch();
  const history = useHistory();


  const [email, setEmail] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [videoUrlData, setVideoUrlData] = useState<any>("");
  const [videoId, setVideoId] = useState<string>("");


  const youtubeParser = (url: any) => {
    var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    var match = url.match(regExp);
    return match && match[7].length == 11 ? setVideoId(match[7]) : false;
  };

  const checkValidLink = (url: any) => {
    if (youtubeParser(url) === false) {
      setVideoUrlData("");
      alert('유투브 영상 링크만 올릴 수 있습니다.');
      return false;
    }
    return true;
  }

  const onSave = () => {
    console.log(videoId);
    if (checkValid()) {
      console.log(email, title, videoId);
      dispatch(asyncNewAddVideo({ email: email, title: title, videoUrl: videoId }));
      alert("영상 정보가 저장되었습니다.");
      document.location.href = '/main/video';
      // history.goBack();
    }

  }

  const onMemberCheck = () => {
    if (isEmpty(email)) {
      alert("아이디(이메일)를 넣어주세요");
    } else {
      dispatch(asyncGetMemberStatus({ email }));
    }
  }

  const checkValid = () => {
    let ret = true;
    if (isEmpty(email)) {
      alert("아이디(이메일)를 넣어주세요");
      ret = false;
      return;
    }
    if (!is_memberCheck) {
      alert("아이디(이메일) 확인이 필요합니다.");
      return;
    }
    if (isEmpty(title)) {
      alert("제목을 입력해주세요.");
      ret = false;
      return;
    }
    if (isEmpty(videoUrlData)) {
      alert("유튜브 URL를 입력해주세요.");
      ret = false;
      return;
    }
    ret = checkValidLink(videoUrlData);
    return ret;
  }

  const onTitle = (e: any) => {
    setTitle(e.target.value);
  }

  const onEmail = (e: any) => {
    setEmail(e.target.value);
    dispatch(isMemberCheck(false));
  }


  const onVideoUrl = (e: any) => {
    setVideoUrlData(e.target.value);
    youtubeParser(e.target.value);
  }

  const onCancle = () => {
    history.goBack();
  }

  const onList = () => {
    history.goBack();
  }


  return (
    <Container>
      <MenuItem
        title='영상'
        largeTitle='채널 관리'
        middleTitle='영상'
        smallTitle='등록'
      />
      <Container >
        <Table variant="white" bordered >
          <tbody>
            <tr>
              <td>아이디 </td>
              <td>
                <Form.Control
                  type="email"
                  id="emailInput"
                  placeholder="회원 Email"
                  value={email}
                  onChange={onEmail}
                  style={{ width: "50%", float: "left" }}
                />
                <Button style={{ marginLeft: "10px" }} variant="outline-primary" onClick={onMemberCheck}>회원 확인</Button>
              </td>
            </tr>
            <tr>
              <td>제목 </td>
              <td colSpan={3}>
                <Form.Control
                  type="text"
                  placeholder="제목"
                  value={title}
                  onChange={onTitle}
                  style={{ width: "70%", float: "left" }}
                />
              </td>
            </tr>
            <tr>
              <td>유튜브 URL </td>
              <td colSpan={3}>
                <Form.Control
                  type="text"
                  placeholder="유튜브 URL"
                  value={videoUrlData}
                  onChange={onVideoUrl}
                  style={{ width: "70%", float: "left" }}
                />
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
