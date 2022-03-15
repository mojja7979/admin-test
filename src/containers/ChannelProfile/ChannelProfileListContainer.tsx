import React, { useState, useCallback, useEffect } from 'react';
import { Link } from "react-router-dom";
import { useRootState } from '../../lib/hooks/useRootState';
import { inputRegex } from '../../lib/inputRegex';
import { useAppDispatch } from "../../store";
import { useDispatch } from 'react-redux';
import {
  asyncGetProfileList,
  changePage

} from '../../modules/profile';

import { BoardListItem } from '../../components/Board';
import { ProfileSearchItem } from '../../components/Search';
import { Paginations } from '../../components/Pagenation';
import { MenuItem } from '../../components/Menu';


import Container from "react-bootstrap/Container";
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

export const ChannelProfileListContainer = () => {

  const {
    items,
    page,
    size,
    pageMetadata
  } = useRootState((state) => state.profile);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncGetProfileList(
      {
        page,
        size,
        keyword: '',
        keyValue: '',
        startDate: '',
        endDate: '',
        complexCode: ''
      }));
  }, [page])

  console.log("items", items)

  const boardTitle = ['No', '이름', '아이디', '활동 분야', '등록일', '상태'];

  const onSearch = (searchInfo: any) => {
    dispatch(asyncGetProfileList(searchInfo));
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
        title='프로필'
        largeTitle='채널 관리'
        middleTitle='프로필'
      />
      <ProfileSearchItem
        page={page}
        size={size}
        onSearch={onSearch}
      />
      <Row md={4} style={{ marginBottom: '10px', paddingRight: '10px' }}>
        <Col md={{ span: 4, offset: 11 }}>
          <Button variant="outline-secondary"><Link to='/main/profileAdd'>등록</Link></Button>
        </Col>
      </Row>

      <BoardListItem
        boardTitle={boardTitle}
        content={items}
        address='profileDetail'
        listType='profile'
        total={pageMetadata.totalElements}
        size={pageMetadata.size}
        currentPage={page}
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

