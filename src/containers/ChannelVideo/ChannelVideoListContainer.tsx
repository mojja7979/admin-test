import React, { useEffect, } from 'react'
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { useRootState } from '../../lib/hooks/useRootState';
import { MenuItem } from '../../components/Menu';
import { VideoSearchItem } from '../../components/Search';
import { BoardListItem } from '../../components/Board';
import { Paginations } from '../../components/Pagenation';
import { asyncGetVideoList, changePage } from '../../modules/video';

import { Container, Row, Col, Button } from 'react-bootstrap';

export const ChannelVideoListContainer = () => {
  const {
    items,
    page,
    size = 10,
    pageMetadata,
    keyword,
    keyValue,
    startDate,
    endDate,
  } = useRootState((state) => state.video);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncGetVideoList({ page, size, keyword, keyValue, startDate, endDate }));
  }, [page])


  const boardTitle = ['No', '제목', '유튜브 URL', '이름', '아이디', '등록일'];

  const onSearch = (searchInfo: any) => {
    dispatch(asyncGetVideoList(searchInfo));
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
        title='영상'
        largeTitle='채널 관리'
        middleTitle='영상'
      />
      {/* <Row md={4} style={{marginBottom:'10px', paddingRight:'10px'}}>
         <Col md={{ span: 4, offset: 11 }}>
          <Button variant="outline-secondary">조회</Button>
         </Col>
       </Row> */}
      <VideoSearchItem
        onSearch={onSearch}
      />

      <Row md={4} style={{ marginBottom: '10px', paddingRight: '10px' }}>
        <Col md={{ span: 4, offset: 11 }}>
          <Button variant="outline-primary"><Link to='/main/videoadd' style={{ textDecorationLine: "none" }}>등록</Link></Button>
        </Col>
      </Row>
      <BoardListItem
        boardTitle={boardTitle}
        content={items}
        address='videoDetail'
        listType='video'
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
};

