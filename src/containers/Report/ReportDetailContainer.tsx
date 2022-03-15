import React, { useState, useCallback, useEffect } from 'react';
import { useRootState } from '../../lib/hooks/useRootState';
import { useAppDispatch } from "../../store";
import { useHistory } from 'react-router-dom';
import {
  asyncGetReportInfo,
} from '../../modules/report';
import { MenuItem } from '../../components/Menu';
import Container from "react-bootstrap/Container";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import InputGroup from 'react-bootstrap/InputGroup'

export const ReportDetailContainer = ({ match }: any) => {
  const { id } = match.params;

  const {

    reportId,
    reporter,
    createdAt,
    feedResponseDTO

  } = useRootState((state) => state.report);
  const dispatch = useAppDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(asyncGetReportInfo({ id }));
  }, [])

  return (
    <Container>
      <MenuItem
        title='신고 관리'
        largeTitle='신고 관리'
        middleTitle='신고 관리'
        smallTitle='상세'
      />
      <Container >
        ◎ 게시물 정보
        <Table variant="white" bordered >
          <colgroup>
            <col width="25%" />
            <col width="25%" />
            <col width="25%" />
            <col width="25%" />
          </colgroup>
          <tbody>
            <tr>
              <td>구분</td>
              <td colSpan={3}>
                <Form.Control plaintext readOnly defaultValue='-'></Form.Control>
              </td>
            </tr>
            <tr>
              <td> 게시물 내용</td>
              <td colSpan={3}>
                <Form.Control plaintext readOnly defaultValue={feedResponseDTO.content} />
              </td>
            </tr>
            <tr>
              <td>사진</td>
              <td colSpan={3}>
                {feedResponseDTO.channelFeedImageList?.map((item, index) => {
                  return (
                    <Image key={index} src={item} width={150} height={150} style={{ marginRight: "10px" }} />
                  )
                })}
              </td>
            </tr>
            <tr>
              <td>작성회원</td>
              <td>
                <Form.Control plaintext readOnly defaultValue={feedResponseDTO.name} />
              </td>
              <td>작성일</td>
              <td>
                <Form.Control plaintext readOnly defaultValue={feedResponseDTO.createdAt} />
              </td>
            </tr>
          </tbody>
        </Table>
        ◎ 신고 정보
        <Table variant="white" bordered >
          <colgroup>
            <col width="25%" />
            <col width="25%" />
            <col width="25%" />
            <col width="25%" />
          </colgroup>
          <tbody>
            <tr>
              <td>신고 사유</td>
              <td colSpan={3}>
                <Form.Control plaintext readOnly defaultValue='-'></Form.Control>
              </td>
            </tr>
            <tr>
              <td>신고 내용</td>
              <td colSpan={3}>
                <Form.Control plaintext readOnly defaultValue='-' />
              </td>
            </tr>
            <tr>
              <td>신고 멤버</td>
              <td>
                <Form.Control plaintext readOnly defaultValue={reporter} />
              </td>
              <td>신고일</td>
              <td>
                <Form.Control plaintext readOnly defaultValue={createdAt} />
              </td>
            </tr>
          </tbody>
        </Table>
        <Row className="justify-content-md-center" style={{ margin: '20px 0' }}>
          <Col>
            <Button style={{ marginLeft: '10px' }} variant="outline-primary" onClick={() => history.goBack()}>목록</Button>
          </Col>
        </Row>
      </Container>

    </Container>

  )

}