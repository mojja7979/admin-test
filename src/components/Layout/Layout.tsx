import React from "react";
import { MainHeaderContainer, MenuBarContainer } from "../../containers/Common";
import { Container, Row, Col } from 'react-bootstrap';
import {
  Route,
  Switch
} from "react-router-dom";
import { DashBoardContainer } from "../../containers/DashBoard";
import {
  AdminListContainer,
  AdminAddContainer,
  AdminDetailContainer
} from '../../containers/Admin';
import { MyInfoModifyContainer } from "../../containers/Auth";
import { ReportDetailContainer, ReportListContainer } from "../../containers/Report";
import { MemberDetailContainer, MemberListContainer } from "../../containers/Member";
import {
  ChannelProfileListContainer,
  ChannelProfileDetailContainer,
  ChannelProfileAddContainer
} from '../../containers/ChannelProfile';
import { QnaListContainer } from "../../containers/Qna/QnaListContainer";
import { QnaDetailContainer } from "../../containers/Qna/QnaDetailContainer";
import { ChannelVideoDetailContainer, ChannelVideoListContainer, ChannelVideoAddContainer } from "../../containers/ChannelVideo";
import {
  ChannelSnapshotListContainer,
  ChannelSnapshotDetailContainer,
  ChannelSnapshotAddContainer
} from '../../containers/ChannelSnapshot';

export const Layout = () => {
  return (
    <Container fluid>
      <Row style={{ marginTop: "10px" }}>
        <Col>
          <MainHeaderContainer />
        </Col>

      </Row>
      <hr />
      <Row style={{ justifyContent: 'start' }}>
        <Col sm={2} >
          <MenuBarContainer />
        </Col>

        <Col sm={10} >
          <Switch>
            {/* dashboard */}
            <Route path="/main/dashboard" component={DashBoardContainer} />
            <Route path="/main/myInfo/:id" component={MyInfoModifyContainer} />
            {/* admin */}
            <Route path="/main/admin" component={AdminListContainer} />
            <Route path="/main/adminRegister" component={AdminAddContainer} />
            <Route path="/main/adminDetail/:id" component={AdminDetailContainer} />
            {/* member */}
            <Route path="/main/member" component={MemberListContainer} />

            {/* report */}
            <Route path="/main/reportDetail/:id" component={ReportDetailContainer} />
            <Route path="/main/report" component={ReportListContainer} />
            <Route path="/main/memberDetail/:id" component={MemberDetailContainer} />
            {/* profile */}
            <Route path="/main/profile" component={ChannelProfileListContainer} />
            <Route path="/main/profileDetail/:email" component={ChannelProfileDetailContainer} />
            <Route path="/main/profileAdd" component={ChannelProfileAddContainer} />

            <Route path="/main/memberDetail/:id" component={MemberDetailContainer} />
            {/* report */}
            <Route path="/main/reportDetail/:id" component={ReportDetailContainer} />
            <Route path="/main/report" component={ReportListContainer} />
            {/* qna */}
            <Route path="/main/qna" component={QnaListContainer} />
            <Route path="/main/qnaDetail/:id" component={QnaDetailContainer} />
            {/* video */}
            <Route path="/main/video" component={ChannelVideoListContainer} />
            <Route path="/main/videoDetail/:id" component={ChannelVideoDetailContainer} />
            <Route path="/main/videoadd" component={ChannelVideoAddContainer} />

            {/* snapshot */}
            <Route path="/main/snapshot" component={ChannelSnapshotListContainer} />
            <Route path="/main/snapshotDetail/:id" component={ChannelSnapshotDetailContainer} />
            <Route path="/main/snapshotAdd" component={ChannelSnapshotAddContainer} />


          </Switch>
        </Col>
      </Row>
    </Container>
  );
}