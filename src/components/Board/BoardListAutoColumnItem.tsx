import React, { useState, useCallback, useEffect } from 'react';
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Table from 'react-bootstrap/Table'
import { Maybe } from '../Maybe';


interface IBoardListAutoColumnItem {
  boardTitle: string[];
  content: any[];
  address: string;
  contentName: string[];
}

export const BoardListAutoColumnItem = React.memo(
  ({
    boardTitle,
    content,
    address,
    contentName
  }: IBoardListAutoColumnItem) => {
    return (
      <Container>
        <Table variant="white" bordered >
          <thead>
            <tr>
              {boardTitle?.map((item, index) => {
                return (
                  <td key={`BoardListItem-Title-${index}`}>{item}</td>
                )
              })}
            </tr>
          </thead>
          <tbody>
            {content?.map((item, index) => {
              console.log(content);
              return (
                <tr key={`BoardListItem-List-${index}`}>
                  {contentName?.map((itemName, itemIndex) => {
                    return (
                      <>
                        <Maybe test={itemIndex === 0} >
                          <td key={`BoardListItem-content-${itemIndex}`}>
                            <Link to={`${address}/${itemName}}`}>{index + 1}</Link>
                          </td>
                        </Maybe>
                        <Maybe test={itemIndex !== 0} >
                          <td key={`BoardListItem-content-${itemIndex}`}>{eval(itemName)}</td>
                        </Maybe>
                      </>
                    )
                  })}
                  {/* <td><Link to={`${address}/${item.id}`}>{index + 1}</Link></td>
                  <td>{item.authority}</td>
                  <td>{item.departmentName}</td>
                  <td>{item.loginId}</td>
                  <td>{item.name}</td>
                  <td>{item.id}</td> */}
                </tr>
              )
            })}

            {/* <tr>
                  <td>3</td>
                  <td colSpan={2}>Larry the Bird</td>
                  <td>@twitter</td>
                </tr> */}
          </tbody>
        </Table>

      </Container>
    );
  },
);
