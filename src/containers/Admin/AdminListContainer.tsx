import React, { useState, useCallback, useEffect } from 'react';
import { Link } from "react-router-dom";
import { useRootState } from '../../lib/hooks/useRootState';
import { inputRegex } from '../../lib/inputRegex';
import { useAppDispatch } from "../../store";
import { useDispatch } from 'react-redux';
import {
  asyncGetAdminList, changePage
} from '../../modules/admin';

import { BoardListItem } from '../../components/Board';
import { AdminSearchItem } from '../../components/Search';
import { Paginations } from '../../components/Pagenation';
import { MenuItem } from '../../components/Menu';


import Container from "react-bootstrap/Container";
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

export const AdminListContainer = () => {

  const {
    items,
    page,
    size,
    pageMetadata,
    keyword,
    keyValue,
    startDate,
    endDate
  } = useRootState((state) => state.admin);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncGetAdminList({ page, size, keyword, keyValue, startDate, endDate }));
  }, [page])


  const boardTitle = ['No', '구분', '부서', '아이디', '이름', '등록일'];

  const onSearch = (searchInfo: any) => {
    dispatch(asyncGetAdminList(searchInfo));
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
        title='운영자 관리'
        largeTitle='운영 관리'
        middleTitle='운영자 관리'
      />
      {/* <Row md={4} style={{marginBottom:'10px', paddingRight:'10px'}}>
             <Col md={{ span: 4, offset: 11 }}>
              <Button variant="outline-secondary">조회</Button>
             </Col>
           </Row> */}

      <AdminSearchItem
        page={page}
        size={size}
        onSearch={onSearch}
      />
      <Row md={4} style={{ marginBottom: '10px', paddingRight: '10px' }}>
        <Col md={{ span: 4, offset: 11 }}>
          <Button variant="outline-secondary"><Link to='/main/adminRegister' style={{ textDecorationLine: "none" }}>등록</Link></Button>
        </Col>
      </Row>

      <BoardListItem
        boardTitle={boardTitle}
        content={items}
        address='adminDetail'
        listType='admin'
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

