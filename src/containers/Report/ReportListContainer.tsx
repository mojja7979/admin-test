import React, { useState, useCallback, useEffect } from 'react';
import { Link } from "react-router-dom";
import { useRootState } from '../../lib/hooks/useRootState';
import { inputRegex } from '../../lib/inputRegex';
import { useAppDispatch } from "../../store";
import { useDispatch } from 'react-redux';
import {
  asyncGetReportList, changePage
} from '../../modules/report';

import { BoardListItem } from '../../components/Board';
import { ReportSearchItem } from '../../components/Search';
import { Paginations } from '../../components/Pagenation';
import { MenuItem } from '../../components/Menu';


import Container from "react-bootstrap/Container";
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

export const ReportListContainer = () => {

  const {
    items,
    page,
    size,
    pageMetadata,
    keyword,
    keyValue,
    startDate,
    endDate
  } = useRootState((state) => state.report);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncGetReportList({ page, size: 10, keyword, keyValue, startDate, endDate }));
  }, [page])

  const boardTitle = ['No', '구분', '게시물 내용', '작성 회원', '작성일', '신고 회원', '신고일'];

  const onSearch = (searchInfo: any) => {
    dispatch(asyncGetReportList(searchInfo));
  }

  const onCurrentPage = (number: number) => {
    dispatch(changePage(number))
  }
  const prev = () => {
    dispatch(changePage((page - 1) < 0 ? 0 : page - 1))

  }
  const next = () => {
    dispatch(changePage((page + 1) >= Math.ceil(pageMetadata.totalElements / pageMetadata.size) ? page : page + 1));
  }

  return (
    <Container>
      <MenuItem
        title='신고 관리'
        largeTitle='신고 관리'
        middleTitle='신고 관리'
      />
      {/* <Row md={4} style={{marginBottom:'10px', paddingRight:'10px'}}>
             <Col md={{ span: 4, offset: 11 }}>
              <Button variant="outline-secondary">조회</Button>
             </Col>
           </Row> */}
      <ReportSearchItem
        page={page}
        size={size}
        onSearch={onSearch}
      />
      <BoardListItem
        boardTitle={boardTitle}
        content={items}
        address='reportDetail'
        listType='report'
      />
      <Paginations
        postsPerPage={pageMetadata.size}
        totalPosts={pageMetadata.totalElements}
        onCurrentPage={onCurrentPage}
        prev={prev}
        next={next}
        currentPage={page}

      />
    </Container>

  )
}