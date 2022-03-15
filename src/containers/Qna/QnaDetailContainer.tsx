import React, { useEffect, useState } from 'react'
import { useRootState } from '../../lib/hooks/useRootState';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { asyncGetQnaDetail, asyncSaveQnaReply, asyncModifyQnaReply, changeAnswerTitle, changeAnswerContent } from '../../modules/qna'

import { MenuItem } from '../../components/Menu';

import { Container, Row, Col, Form, Table, Button, InputGroup, FormControl } from 'react-bootstrap';
import { isEmpty } from '../../lib/util';
import { Maybe } from '../../components/Maybe';


export const QnaDetailContainer = ({ match }: any) => {
  const { id } = match.params;
  const {
    categoryName,
    content,
    name,
    email,
    createdAt,
    status,
    answer,
  } = useRootState((state) => state.qna);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(asyncGetQnaDetail({ id }));
  }, [status])



  const onSave = () => {
    if (isEmpty(answer.title)) {
      alert("답변 제목을 작성해주세요.");
      return;
    }

    if (isEmpty(answer.content)) {
      alert("답변 내용을 작성해주세요.");
      return;
    } else {
      console.log(id, answer.title);
      dispatch(asyncSaveQnaReply({ questionId: id, title: answer.title, content: answer.content }));
      alert("답변이 저장되었습니다.");
      document.location.href = "/main/qna"
    }
  }

  const onChange = () => {
    if (isEmpty(answer.title)) {
      alert("답변 제목을 작성해주세요.");
      return;
    }

    if (isEmpty(answer.content)) {
      alert("답변 내용을 작성해주세요.");
      return;
    } else {
      dispatch(asyncModifyQnaReply({ id: answer.id, questionId: id, title: answer.title, content: answer.content }));
      alert("답변이 저장되었습니다.");
      document.location.href = "/main/qna"
    }
  }

  const onCancle = () => {
    history.goBack();
  }

  const onChangeAnswerTitle = (e: any) => {
    dispatch(changeAnswerTitle(e.target.value));
  }

  const onChangeAnswerContent = (e: any) => {
    dispatch(changeAnswerContent(e.target.value));
  }


  return (
    <Container>
      <MenuItem
        title='1:1 문의'
        largeTitle='고객 관리'
        middleTitle='1:1문의'
        smallTitle='상세'
      />
      <Container >
        ◎ 문의 정보
        <Table variant="white" bordered >
          <colgroup>
            <col width="25%" />
            <col width="25%" />
            <col width="25%" />
            <col width="25%" />
          </colgroup>
          <tbody>
            <tr>
              <td >구분 </td>
              <td>
                <Form.Label aria-label="Default select example">
                  {categoryName}
                </Form.Label>
              </td>
              <td >답변 상태 </td>
              <td>
                <Form.Label aria-label="Default select example">
                  {status === "COMPLETE" ? "답변 완료" : "답변 전"}
                </Form.Label>
              </td>
            </tr>
            <tr>
              <td >이름 </td>
              <td>
                <Form.Label aria-label="Default select example">
                  {name}
                </Form.Label>
              </td>
              <td >아이디 </td>
              <td>
                <Form.Label aria-label="Default select example">
                  {email}
                </Form.Label>
              </td>
            </tr>
            <tr>
              <td >등록일 </td>
              <td colSpan={3}>
                <Form.Label aria-label="Default select example">
                  {createdAt}
                </Form.Label>
              </td>
            </tr>
            <tr>
              <td >문의 내용 </td>
              <td colSpan={3}>
                <Form.Label aria-label="Default select example">
                  {content}
                </Form.Label>
              </td>
            </tr>
          </tbody>
        </Table>
        {/* <QnaReply
        id={answer?.id}
        name={answer?.name}
        title={answer?.title}
        content={answer?.content}
        createdAt={answer?.createdAt}

        /> */}
        ◎ 답변 정보
        <Table variant="white" bordered >
          <colgroup>
            <col width="25%" />
            <col width="25%" />
            <col width="25%" />
            <col width="25%" />
          </colgroup>
          <tbody>
            <tr>
              <td >작성자 </td>
              <td>
                <Form.Label aria-label="Default select example">
                  {status === "COMPLETE" ? answer.name : ""}
                </Form.Label>
              </td>
              <td >작성일 </td>
              <td>
                <Form.Label aria-label="Default select example">
                  {status === "COMPLETE" ? answer.createdAt : ""}
                </Form.Label>
              </td>
            </tr>
            <tr>
              <td >답변 제목 </td>
              <td colSpan={3}>
                <InputGroup>
                  <FormControl type="text"
                    placeholder="제목을 넣어주세요."
                    value={answer.title}
                    onChange={onChangeAnswerTitle} />
                </InputGroup>
              </td>
            </tr>
            <tr>
              <td >답변 내용 </td>
              <td colSpan={3}>
                <InputGroup>
                  <FormControl as="textarea"
                    style={{ height: '300px' }}
                    placeholder="답변 내용이 없습니다. 답변 내용을 넣어주세요."
                    value={answer.content}
                    onChange={onChangeAnswerContent}
                    aria-label="With textarea" />
                </InputGroup>
              </td>
            </tr>
          </tbody>
        </Table>


        <Row className="justify-content-md-center" style={{ margin: '20px 0' }}>
          <Col md={{ span: 7, offset: 5 }}>
            <Button style={{ marginLeft: '10px' }} variant="outline-primary" onClick={onCancle}>취소</Button>
            <Maybe test={status === "ASK"}>
              <Button style={{ marginLeft: '10px' }} variant="outline-primary" onClick={onSave}>저장</Button>
            </Maybe>
            <Maybe test={status === "COMPLETE"}>
              <Button style={{ marginLeft: '10px' }} variant="outline-primary" onClick={onChange}>수정</Button>
            </Maybe>
          </Col>
        </Row>
      </Container>
    </Container >

  )
}
