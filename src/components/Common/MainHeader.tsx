import React from "react";
import { Link } from "react-router-dom";
import { Container, Stack, Button, Image, Navbar } from 'react-bootstrap';

export interface ImainHeader {
  loginId: string,
  roleId: string,
  onLogout: any
};

export const MainHeader = ({ loginId, roleId, onLogout }: ImainHeader) => {
  return (
    <Stack direction="horizontal" gap={3}>
      <div className="bg-light">
        <Link to="/">
          <Image style={{ width: '150px' }} src={require("../../assets/logo/new_tagntagger.png")} />
        </Link>
      </div>
      <div className="bg-light ms-auto"><span><b>{loginId}</b> 관리자 님, 환영합니다.</span></div>
      {/* <div className="vr" /> */}
      <div className="bg-light">
        <Link to={`/main/myInfo/${roleId}`}>
          <Button style={{ marginLeft: '10px' }} variant="outline-primary">정보수정</Button>
        </Link>{' '}
        <Button style={{ marginLeft: '10px' }} variant="outline-primary" onClick={onLogout}>로그아웃</Button>
      </div>
    </Stack>
  );
}

export default MainHeader;
