import React, { useState, useCallback, useEffect } from 'react';
import { Container, Row, Col, Table } from 'react-bootstrap';


interface IQnaCount {
  total: number;
  ask: number;
  complete: number;

}

export const QnaCount = React.memo(
  ({
    total,
    ask,
    complete
  }: IQnaCount) => {


    return (
      <Container>
        <Table variant="white" bordered style={{ textAlign: "center", width: "300px", border: "1px solid", float: "right" }}>
          <thead>
            <tr>
              <td style={{ width: "100px" }}><b>전체</b></td>
              <td style={{ width: "100px" }}><b>답변 전</b></td>
              <td style={{ width: "100px" }}><b>답변 완료</b></td>
            </tr>
          </thead>
          <tbody>
            <tr>

              <td >{total}</td>
              <td ><div style={{ color: "blue" }}>{ask}</div></td>
              <td ><div style={{ color: "red" }}>{complete}</div></td>

            </tr>
          </tbody>
        </Table>
      </Container>


    );
  },
);
