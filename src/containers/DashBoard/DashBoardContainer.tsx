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

export const DashBoardContainer = () => {
  const {
    items,
    page,
    size = 5,
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
    dispatch(asyncGetQnaList({ page, size: 8, keyword, keyValue, startDate, endDate, qnaCategory }));
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
    <Container >
      <Container>
        <div>
          <b style={{ float: "left" }}>| 1:1 문의 현황</b>
          <Link to={"/main/qna"}><b style={{ float: "right" }}> 더보기&gt;</b></Link>
        </div>
      </Container>
      <br />
      <Container style={{ marginTop: "50px" }}>
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

      </Container>
    </Container >



  )
};

