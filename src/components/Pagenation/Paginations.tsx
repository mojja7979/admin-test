import React, { useState, useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Pagination, PageItem, Row, Col } from 'react-bootstrap';
import { isNumber } from 'util';
import {
  changePage
} from '../../modules/admin';
import { Maybe } from '../Maybe';




interface IPaginations {
  postsPerPage: number;
  totalPosts: number;
  onCurrentPage: (page: number) => void;
  prev: any;
  next: any;
  currentPage: number;

}

export const Paginations = React.memo(
  ({
    postsPerPage,
    totalPosts,
    onCurrentPage,
    prev,
    next,
    currentPage,
  }: IPaginations) => {

    const dispatch = useDispatch();
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
      pageNumbers.push(i);
    }

    // const currentPage = (number: number) => {
    //   dispatch(changePage(number))
    // }
    // const prev = () => {
    //   dispatch(changePage(getCurrentPage - 1))

    // }
    // const next = () => {
    //   dispatch(changePage(getCurrentPage + 1))

    // }
    const indexOfLast = Math.ceil(totalPosts / postsPerPage);

    return (
      <Row className="justify-content-md-center">
        <Col md={{ span: 7, offset: 3 }}>
          <Pagination>
            <Pagination.First
              onClick={() => onCurrentPage(0)}
            />
            <Pagination.Prev
              onClick={prev}
            />
            {pageNumbers.map(number => (
              <Pagination.Item
                key={`Pagination-${number}`}
                onClick={() => onCurrentPage(number - 1)}
              >
                <Maybe test={number === currentPage + 1}><b style={{ color: "red" }}>{number}</b></Maybe>
                <Maybe test={number !== currentPage + 1}>{number}</Maybe></Pagination.Item>
            ))}
            <Pagination.Next
              onClick={next}
            />
            <Pagination.Last
              onClick={() => onCurrentPage(indexOfLast - 1)}

            />
          </Pagination>
        </Col>
      </Row>


    );
  },
);
