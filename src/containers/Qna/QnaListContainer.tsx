import React, { useEffect, } from 'react'
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { useRootState } from '../../lib/hooks/useRootState';
import { asyncGetQnaList, asyncGetQnaCategory, changePage, asyncGetQnaCount } from '../../modules/qna';
import { MenuItem } from '../../components/Menu';
import { QnaSearchItem } from '../../components/Search';
import { BoardListItem } from '../../components/Board';
import { Paginations } from '../../components/Pagenation';
import { QnaCount } from '../../components/Qna';

import { Container, Row, Col, Button } from 'react-bootstrap';

export const QnaListContainer = () => {
  const {
    items,
    page,
    size = 20,
    pageMetadata,
    keyword,
    keyValue,
    startDate,
    endDate,
    qnaCategory,
    qnaCategoryList,
    total,
    ask,
    complete
  } = useRootState((state) => state.qna);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncGetQnaList({ page, size, keyword, keyValue, startDate, endDate, qnaCategory }));
    dispatch(asyncGetQnaCategory());
    dispatch(asyncGetQnaCount());
  }, [page])

  const boardTitle = ['No', '구분', '문의내용', '이름', '아이디', '등록일', '답변 상태'];

  const onSearch = (searchInfo: any) => {
    dispatch(asyncGetQnaList(searchInfo));
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
        title='1:1 문의'
        largeTitle='고객 관리'
        middleTitle='1:1 문의'
      />
      {/* <Row md={4} style={{marginBottom:'10px', paddingRight:'10px'}}>
         <Col md={{ span: 4, offset: 11 }}>
          <Button variant="outline-secondary">조회</Button>
         </Col>
       </Row> */}
      <QnaSearchItem
        onSearch={onSearch}
        qnaCategoryList={qnaCategoryList}
      />
      <QnaCount
        total={total}
        ask={ask}
        complete={complete} />

      <BoardListItem
        boardTitle={boardTitle}
        content={items}
        address='qnaDetail'
        listType='qna'
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

