import React, { useCallback, useState } from "react";
import { Form, Button, Image, Container } from 'react-bootstrap'
import { isEmpty } from "../../lib/util";


// 로그인 폼 구성
export const Login = ({ onSignIn }: { onSignIn: any }) => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleChangeUserId = useCallback((e) => {
    setEmail(e.target.value);
  }, []);

  const handleChangePassword = useCallback((e) => {
    setPassword(e.target.value);
  }, []);

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      console.log(email, password);
      onSignIn(email, password);
    },
    [email, password, onSignIn]
  );

  return (
    <Container fluid style={{ display: 'flex', justifyContent: 'center' }}>
      <Form style={{ width: '50%' }} onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <div style={{ textAlign: "center", marginTop: "10%", marginBottom: "30px" }}>
            <Image style={{ width: '40%' }}
              src={require("../../assets/logo/new_tagntagger.png")} />
          </div>
          <div style={{ width: "100%", padding: '40px', border: "1px solid", borderRadius: "20px" }}>
            <div style={{ textAlign: "center" }} >
              <h3>관리자 로그인</h3>
            </div>
            <div style={{ padding: "40px" }}>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                id="emailInput"
                value={email}

                onChange={handleChangeUserId}
                placeholder="Your email adress"
              />
              <Form.Label style={{ marginTop: '50px' }}>비밀번호</Form.Label>
              <Form.Control
                type="password"
                id="pwInput"
                value={password}
                onChange={handleChangePassword}
                placeholder="Your password"
              />
              <div style={{ marginTop: '50px', textAlign: "center" }}>
                <Button style={{ width: '50%' }} variant="outline-primary" type="submit" disabled={!isEmpty(email) && !isEmpty(password) ? false : true}>
                  로그인
                </Button>
              </div>
            </div>
          </div>
        </Form.Group>
      </Form>
    </Container >
  );
}

