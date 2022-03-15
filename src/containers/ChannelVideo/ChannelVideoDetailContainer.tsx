import React, { useEffect, useState } from 'react'
import { useRootState } from '../../lib/hooks/useRootState';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { asyncGetVideoDetail, asyncEditVideo, changeTitle, changeVideoUrl } from '../../modules/video'

import { MenuItem } from '../../components/Menu';

import { Container, Row, Col, Form, Table, Button } from 'react-bootstrap';
import { isEmpty } from '../../lib/util';
import { Maybe } from '../../components/Maybe';


export const ChannelVideoDetailContainer = ({ match }: any) => {
  const { id } = match.params;
  const {
    portfolioId,
    title,
    videoUrl,
    isDel,
    email,
    name,
    createdAt,
  } = useRootState((state) => state.video);
  const dispatch = useDispatch();
  const history = useHistory();


  useEffect(() => {
    dispatch(asyncGetVideoDetail({ id }));
  }, [])


  const [videoUrlData, setVideoUrlData] = useState<any>(videoUrl);  //이전 데이터 url 조합
  const [urlChange, setUrlChange] = useState<boolean>(false); //수정 여부 기본 false, 수정시 true
  const [videoId, setVideoId] = useState<any>(null);

  const youtubeParser = (url: any) => {
    var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    var match = url.match(regExp);
    return match && match[7].length == 11 ? setVideoId(match[7]) : false;
  };

  const checkValidLink = (url: any) => {
    if (youtubeParser(url) === false) {
      setVideoUrlData(videoUrl);
      alert('유투브 영상 링크만 올릴 수 있습니다.');
      return false;
    }
    return true;
  }

  const onSave = () => {
    if (checkValid()) {
      dispatch(asyncEditVideo({ portfolioId: id, title: title, videoUrl: videoId }));
      alert("영상 정보가 저장되었습니다.");
      document.location.href = '/main/video';
      //history.goBack();
    }

  }

  const checkValid = () => {
    let ret = true;
    if (isEmpty(title)) {
      alert("제목을 입력해주세요.")
      ret = false;
      return;
    }

    if (urlChange) {
      if (isEmpty(videoUrlData)) {
        alert("유튜브 URL를 입력해주세요.");
        ret = false;
        return;
      }
      ret = checkValidLink(videoUrlData);
    }
    return ret;
  }

  const onTitle = (e: any) => {
    dispatch(changeTitle(e.target.value));
  }

  const onVideoUrlChange = () => {
    setUrlChange(!urlChange);
    setVideoUrlData(videoUrl);
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
        smallTitle='상세'
      />
      <Container >
        <Table variant="white" bordered >
          <tbody>
            <tr>
              <td>이름 </td>
              <td>
                <Form.Label aria-label="Default select example">
                  {name}
                </Form.Label>
              </td>
              <td>등록일 </td>
              <td>
                <Form.Label aria-label="Default select example">
                  {createdAt}
                </Form.Label>
              </td>
            </tr>
            <tr>
              <td>아이디 </td>
              <td colSpan={3}>
                <Form.Label aria-label="Default select example">
                  {email}
                </Form.Label>
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
              <Maybe test={urlChange}>
                <td colSpan={3}>
                  <Form.Control
                    type="text"
                    placeholder="유튜브 URL"
                    value={videoUrlData}
                    onChange={onVideoUrl}
                    style={{ width: "70%", float: "left" }}
                  />
                  <Button style={{ marginLeft: "10px", float: "left" }} variant="outline-primary" onClick={onVideoUrlChange}>취소</Button>
                </td>
              </Maybe>

              <Maybe test={!urlChange}>
                <td colSpan={3}>
                  <a href={videoUrl} target="_blank" rel="noopener noreferrer">
                    {videoUrl}
                  </a>
                  <Button style={{ marginLeft: "10px" }} variant="outline-primary" onClick={onVideoUrlChange}>변경</Button>
                </td>
              </Maybe>
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
