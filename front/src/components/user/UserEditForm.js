import React, { useState, useContext } from "react";
import { useNavigate } from 'react-router-dom'
import { DispatchContext } from '../../App'
import { Button, Form, Card, Col, Row } from "react-bootstrap";
import * as Api from "../../api";

function UserEditForm({ user, setIsEditing, setUser }) {
  const navigate = useNavigate()
  const dispatch = useContext(DispatchContext)
  //useState로 name 상태를 생성함.
  const [name, setName] = useState(user.name);
  //useState로 email 상태를 생성함.
  const [email, setEmail] = useState(user.email);
  //useState로 description 상태를 생성함.
  const [description, setDescription] = useState(user.description);
  //useState로 password 상태를 생성함.
  const [changePw, setChangePassword] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault();

    await Api.post(`user/password`, {
      password: changePw
    })

    // "users/유저id" 엔드포인트로 PUT 요청함.
    const res = await Api.put(`users/${user.id}`, {
      name,
      email,
      description
    });
    // 유저 정보는 response의 data임.
    const updatedUser = res.data;
    // 해당 유저 정보로 user을 세팅함.
    setUser(updatedUser);

    // isEditing을 false로 세팅함.
    setIsEditing(false);
  };

  const handleUserWithdraw = async () => {
    const pwInput = prompt("비밀번호를 입력해주세요")
    try {
      await Api.post('user/withdraw', {
        password: pwInput
      })
      sessionStorage.removeItem("userToken");
      dispatch({ type: "LOGOUT" })
      navigate("/login")
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <Card className="mb-2">
      <Card.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="useEditName" className="mb-3">
            <Form.Control
              type="text"
              placeholder="이름"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="userEditEmail" className="mb-3">
            <Form.Control
              type="email"
              placeholder="이메일"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="userEditDescription" className="mb-3">
            <Form.Control
              type="text"
              placeholder="정보, 인사말"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="userEditPw" className="mb-3">
            <Form.Control
              type="password"
              placeholder="변경할 비밀번호를 입력하세요"
              value={changePw}
              onChange={(e) => setChangePassword(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="userWithdraw">
            <Button
              type="button"
              variant="danger"
              onClick={handleUserWithdraw}
            >회원 탈퇴</Button>
          </Form.Group>

          <Form.Group as={Row} className="mt-3 text-center">
            <Col sm={{ span: 20 }}>
              <Button variant="primary" type="submit" className="me-3">
                확인
              </Button>
              <Button variant="secondary" onClick={() => setIsEditing(false)}>
                취소
              </Button>
            </Col>
          </Form.Group>
        </Form>
      </Card.Body>
    </Card>
  );
}

export default UserEditForm;
