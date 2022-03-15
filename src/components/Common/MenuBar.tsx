import React from "react";
import { Nav, Accordion } from "react-bootstrap";

function MenuBar() {
  return (
    <Nav className="flex-column pt-2">
      <div style={{ marginLeft: '0', border: '1px solid', width: '250px', background: '#354052', color: '#adb5bd', transition: 'all 0.5s' }}>
        {/* 대시보드 */}
        <Nav.Item className="active">
          <Nav.Link href="/">
            <li>대시보드</li>
          </Nav.Link>
        </Nav.Item>

        {/* 회원관리 */}
        <Accordion>
          <Accordion.Item eventKey="1">
            <Accordion.Header>회원 관리</Accordion.Header>
            <Accordion.Body>
              <Nav.Item className="active">
                <Nav.Link href="/main/member">
                  회원 관리
                </Nav.Link>
              </Nav.Item>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>

        {/* 채널관리 */}
        <Accordion>
          <Accordion.Item eventKey="0">
            <Accordion.Header>채널 관리</Accordion.Header>
            <Accordion.Body>
              <Nav.Item className="active">
                <Nav.Link href="/main/profile">
                  프로필
                </Nav.Link>
              </Nav.Item>
              <Nav.Item className="active">
                <Nav.Link href="/main/snapshot">
                  스냅샷
                </Nav.Link>
              </Nav.Item>
              <Nav.Item className="active">
                <Nav.Link href="/main/video">
                  영상
                </Nav.Link>
              </Nav.Item>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>


        {/* 모임 관리 */}
        {/* <Accordion>
          <Accordion.Item eventKey="2">
            <Accordion.Header>모임 관리</Accordion.Header>
            <Accordion.Body>
              <Nav.Item className="active">
                <Nav.Link href="#action3">
                  모임 관리
                </Nav.Link>
              </Nav.Item>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion> */}

        {/* 배너 관리 */}
        {/* <Accordion>
          <Accordion.Item eventKey="3">
            <Accordion.Header>배너 관리</Accordion.Header>
            <Accordion.Body>
              <Nav.Item className="active">
                <Nav.Link href="#action3">
                  배너 관리
                </Nav.Link>
              </Nav.Item>
              <Nav.Item className="active">
                <Nav.Link href="#action3">
                  팝업 관리
                </Nav.Link>
              </Nav.Item>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion> */}

        {/* 컨텐츠 관리 */}
        {/* <Accordion>
          <Accordion.Item eventKey="4">
            <Accordion.Header>컨텐츠 관리</Accordion.Header>
            <Accordion.Body>
              <Nav.Item className="active">
                <Nav.Link href="#action3">
                  컨텐츠 관리
                </Nav.Link>
              </Nav.Item>
              <Nav.Item className="active">
                <Nav.Link href="#action3">
                  이벤트 관리
                </Nav.Link>
              </Nav.Item>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion> */}

        {/* 고객 관리 */}
        <Accordion>
          <Accordion.Item eventKey="5">
            <Accordion.Header>고객 관리</Accordion.Header>
            <Accordion.Body>
              {/* <Nav.Item className="active">
                <Nav.Link href="#action3">
                  공지사항
                </Nav.Link>
              </Nav.Item> */}
              <Nav.Item className="active">
                <Nav.Link href="/main/qna">
                  1:1문의
                </Nav.Link>
              </Nav.Item>
              {/* <Nav.Item className="active">
                <Nav.Link href="#action3">
                  FAQ 관리
                </Nav.Link>
              </Nav.Item> */}
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>

        {/* 신고 관리 */}
        <Accordion>
          <Accordion.Item eventKey="6">
            <Accordion.Header>신고 관리</Accordion.Header>
            <Accordion.Body>
              <Accordion>
                <Accordion.Item eventKey="7">
                  <Accordion.Header>채널 관리</Accordion.Header>
                  <Accordion.Body>
                    <Nav.Item className="active">
                      <Nav.Link href="/main/report">
                        게시물 신고 관리
                      </Nav.Link>
                    </Nav.Item>
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
              {/* <Accordion>
                <Accordion.Item eventKey="8">
                  <Accordion.Header>모임 관리</Accordion.Header>
                  <Accordion.Body>
                    <Nav.Item className="active">
                      <Nav.Link href="#action3">
                        게시물 신고 관리
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item className="active">
                      <Nav.Link href="#action3">
                        댓글 신고 관리
                      </Nav.Link>
                    </Nav.Item>
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion> */}
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>

        {/* 통계 관리 */}
        {/* <Accordion>
          <Accordion.Item eventKey="5">
            <Accordion.Header>통계 관리</Accordion.Header>
            <Accordion.Body>
              <Nav.Item className="active">
                <Nav.Link href="#action3">
                  채널 통계
                </Nav.Link>
              </Nav.Item>
              <Nav.Item className="active">
                <Nav.Link href="#action3">
                  회원 통계
                </Nav.Link>
              </Nav.Item>
              <Nav.Item className="active">
                <Nav.Link href="#action3">
                  모임 통계
                </Nav.Link>
              </Nav.Item>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion> */}

        {/* 운영 관리 */}
        <Accordion>
          <Accordion.Item eventKey="5">
            <Accordion.Header>운영 관리</Accordion.Header>
            <Accordion.Body>
              <Nav.Item className="active">
                <Nav.Link href="/main/admin">
                  운영자 관리
                </Nav.Link>
              </Nav.Item>
              {/* <Nav.Item className="active">
                <Nav.Link href="#action3">
                  권한 관리
                </Nav.Link>
              </Nav.Item> */}
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>

        {/* </Nav> */}

      </div>
    </Nav >
  );
}

export default MenuBar;
