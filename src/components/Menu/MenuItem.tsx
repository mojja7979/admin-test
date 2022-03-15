import React, { useState, useCallback, useEffect } from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';



interface IMenuItem {
  title: string;
  largeTitle: string;
  middleTitle: string;
  smallTitle?: string;

}

export const MenuItem = React.memo(
  ({
    title,
    largeTitle,
    middleTitle,
    smallTitle

  }: IMenuItem) => {
    return (
      <Row style={{ borderBottom: '2px solid #f7F7F7', margin: '50px 0' }}>
        <Col xs={12} md={9}>
          <h5>{title}</h5>
        </Col>
        <Col xs={6} md={3}>
          <h5>{largeTitle} &gt; {middleTitle} {smallTitle && smallTitle ? `> ${smallTitle}` : null}</h5>
        </Col>
      </Row>
    );
  },
);
