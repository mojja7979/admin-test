import React, { useState, useCallback, useEffect } from 'react';
import { Link } from "react-router-dom";
import { useRootState } from '../../lib/hooks/useRootState';
import { inputRegex } from '../../lib/inputRegex';
import { useAppDispatch } from "../../store";
import { useDispatch } from 'react-redux';
import {
  asyncGetSnapshotList,
  changePage,
  asyncGetWorktypeList

} from '../../modules/snapshot';

import { BoardListItem } from '../../components/Board';
import { SnapshotSearchItem } from '../../components/Search';
import { Paginations } from '../../components/Pagenation';
import { MenuItem } from '../../components/Menu';


import Container from "react-bootstrap/Container";
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

export const ChannelSnapshotListContainer = () => {

  const {
    items,
    page,
    size,
    workTypeList,
    pageMetadata
  } = useRootState((state) => state.snapshot);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncGetWorktypeList());

  }, [])

  useEffect(() => {
    dispatch(asyncGetSnapshotList(
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

  const boardTitle = ['No', '제목', '사진컷', '작품 분류', '이름', '아이디', '등록일', '상태'];

  const onSearch = (searchInfo: any) => {
    dispatch(asyncGetSnapshotList(searchInfo));
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
        title='스냅샷'
        largeTitle='채널 관리'
        middleTitle='스냅샷'
      />
      <SnapshotSearchItem
        page={page}
        size={size}
        workTypeList={workTypeList}
        onSearch={onSearch}
      />
      <Row md={4} style={{ marginBottom: '10px', paddingRight: '10px' }}>
        <Col md={{ span: 4, offset: 11 }}>
          <Button variant="outline-secondary"><Link to='/main/snapshotAdd'>등록</Link></Button>
        </Col>
      </Row>

      <BoardListItem
        boardTitle={boardTitle}
        content={items}
        address='snapshotDetail'
        listType='snapshot'
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

