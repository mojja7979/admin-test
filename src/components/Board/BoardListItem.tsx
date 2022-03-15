import React from 'react';
import { Link } from "react-router-dom";
import { Container, Form } from "react-bootstrap";
import Table from 'react-bootstrap/Table'
import { Maybe } from '../Maybe';
import { emailMasking } from '../../lib/util'
interface IBoardListItem {
  boardTitle: string[];
  content: any[];
  address: string;
  listType: string;
  total?: number;
  currentPage?: number;
  size?: number;
}

export const BoardListItem = React.memo(
  ({
    boardTitle,
    content,
    address,
    listType,
    total,
    currentPage,
    size,
  }: IBoardListItem) => {
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
            <Maybe test={listType === "member"}>
              {content?.map((item, index) => {
                return (
                  <tr key={`BoardListItem-MemberList-${index}`}>
                    <td>{(total ?? 0) - index - ((size ?? 0) * (currentPage ?? 0))}</td>
                    <td>{item.channelActive ? "채널회원" : "일반회원"}{item.state === "DELETED" ? "(탈퇴)" : ""}</td>
                    <td><Link to={`${address}/${item.id}`}>{emailMasking(item.email)}</Link></td>
                    <td><Link to={`${address}/${item.id}`}>{item.nickName}</Link></td>
                    <td>{item.createdAt}</td>
                  </tr>
                )
              })}
            </Maybe>
            <Maybe test={listType === "profile"}>
              {content?.map((item, index) => {
                return (
                  <tr key={`BoardListItem-ProfileList-${index}`}>
                    <td>{(total ?? 0) - index - ((size ?? 0) * (currentPage ?? 0))}</td>
                    <td style={{ display: 'flex', alignItems: 'center' }}>
                      <Link to={`${address}/${item.email}`}>
                        <img
                          src={item.profileImg}
                          className='img-thumbnail'
                          style={{ maxWidth: '5rem', marginRight: '10px' }}
                        /></Link>
                      <Link to={`${address}/${item.email}`}>
                        <div >{item.name}</div></Link>
                    </td>
                    <td><Link to={`${address}/${item.email}`}>{emailMasking(item.email)}</Link></td>
                    <td>

                      {item.chUserActiveList?.map((active: any) => {
                        return (
                          <span>{active.codeName} </span>

                        )
                      })}
                    </td>
                    <td>{item.createdAt}</td>
                    <td>{item.reporter}</td>
                  </tr>
                )
              })}
            </Maybe>
            <Maybe test={listType === "profileSnapshotList"}>
              {content?.map((item, index) => {
                return (
                  <tr key={`BoardListItem-ProfileSnapshotList-${index}`}>
                    <td>{(total ?? 0) - index - ((size ?? 0) * (currentPage ?? 0))}</td>
                    <td>
                      <img
                        src={item.coverImg}
                        className='img-thumbnail'
                        style={{ maxWidth: '5rem', marginRight: '10px' }}

                      />
                      <Form.Label>{item.title}</Form.Label>
                    </td>
                    <td>{item.snapshotCount}개</td>
                    <td>
                      {item.workName && item.workName.join(',')}
                    </td>
                    <td>{item.createdAt}</td>
                    <td>{item.reporter}</td>
                  </tr>
                )
              })}
            </Maybe>
            <Maybe test={listType === "profileVideoList"}>
              {content?.map((item, index) => {
                return (
                  <tr key={`BoardListItem-ProfileVideoList-${index}`}>
                    <td>{(total ?? 0) - index - ((size ?? 0) * (currentPage ?? 0))}</td>
                    <td>{item.title}</td>
                    <td><a href={`https://youtu.be/${item.videoUrl}`} target='_blank'>{`https://youtu.be/${item.videoUrl}`}</a></td>
                    <td>{item.createdAt}</td>
                    <td>{item.createdAt}</td>
                  </tr>
                )
              })}
            </Maybe>
            <Maybe test={listType === "video"}>
              {content?.map((item, index) => {
                return (
                  <tr key={`BoardListItem-videoList-${index}`}>
                    <td>{(total ?? 0) - index - ((size ?? 0) * (currentPage ?? 0))}</td>
                    <td><Link to={`${address}/${item.portfolioId}`}>{item.title}</Link></td>
                    <td><Link to={`${address}/${item.portfolioId}`}>{"https://youtu.be/" + item.videoUrl}</Link></td>
                    <td><Link to={`${address}/${item.portfolioId}`}>{item.name}</Link></td>
                    <td><Link to={`${address}/${item.portfolioId}`}>{emailMasking(item.email)}</Link></td>
                    <td>{item.createdAt}</td>
                  </tr>
                )
              })}
            </Maybe>
            <Maybe test={listType === "qna"}>
              {content?.map((item, index) => {
                return (
                  <tr key={`BoardListItem-qnaList-${index}`}>
                    <td>{item.id}</td>
                    <td>{item.categoryName}</td>
                    <td><Link to={`${address}/${item.id}`}>{item.content?.substr(0, 20)}{'...'}</Link></td>
                    <td><Link to={`${address}/${item.id}`}>{item.name}</Link></td>
                    <td>{emailMasking(item.email)}</td>
                    <td>{item.createdAt}</td>
                    <td>{item.status === "COMPLETE" ? "답변 완료" : "답변 전"}</td>
                  </tr>
                )
              })}
            </Maybe>
            <Maybe test={listType === "report"}>
              {content?.map((item, index) => {
                return (
                  <tr key={`BoardListItem-ReportList-${index}`}>
                    <td>{item.id}</td>
                    <td>-</td>
                    <td><Link to={`${address}/${item.id}`}>{item.content?.substr(0, 20)}{'...'}</Link></td>
                    <td>{item.defendant}</td>
                    <td>{item.createdAt}</td>
                    <td>{item.reporter}</td>
                    <td>{item.contentCreateAt}</td>
                  </tr>
                )
              })}
            </Maybe>
            <Maybe test={listType === "admin"}>
              {content?.map((item, index) => {
                return (
                  <tr key={`BoardListItem-List-${index}`}>
                    <td>{item.id}</td>
                    <td>{item.authority}</td>
                    <td><Link to={`${address}/${item.id}`}>{item.departmentName}</Link></td>
                    <td><Link to={`${address}/${item.id}`}>{emailMasking(item.loginId)}</Link></td>
                    <td><Link to={`${address}/${item.id}`}>{item.name}</Link></td>
                    <td>{item.createdAt}</td>
                  </tr>
                )
              })}
            </Maybe>
            <Maybe test={listType === "snapshot"}>
              {content?.map((item, index) => {
                return (
                  <tr key={`BoardListItem-videoList-${index}`}>
                    <td>{item.portfolioId}</td>
                    <td><Link to={`${address}/${item.portfolioId}`}>
                      <img
                        src={item.coverImg}
                        className='img-thumbnail'
                        style={{ maxWidth: '5rem', marginRight: '10px' }}

                      />
                      <Form.Label>{item.title}</Form.Label>
                    </Link>
                    </td>
                    <td>{`${item.snapshotCount}개`}</td>
                    <td><Link to={`${address}/${item.portfolioId}`}>{item.workName && item.workName?.join(',')}</Link></td>
                    <td><Link to={`${address}/${item.portfolioId}`}>{item.name}</Link></td>
                    <td><Link to={`${address}/${item.portfolioId}`}>{emailMasking(item.email)}</Link></td>
                    <td>{item.createdAt}</td>
                    <td>Y</td>
                  </tr>
                )
              })}
            </Maybe>
          </tbody>
        </Table>
      </Container>
    );
  },
);
