import React, { useState, useRef } from "react";
import styled from "styled-components";

export default function Login() {
  const [text, setText] = useState(true);
  const mailRef = useRef();
  const passwordRef = useRef();
  const textHandler = () => {
    setText(!text);
  };
  const submitHandler = (e) => {
    e.preventDefault();
    let password = passwordRef.current.value;
    let email = mailRef.current.value;
    if (!email.includes("@") || password.length < 5) {
      alert(
        "email adress should include @, password length more than 5 charecters"
      );
    } else {
      console.log(email);
      console.log(password);
    }
  };
  return (
    <Card>
      <Wrap>
        <Form onSubmit={submitHandler}>
          <Title>{text ? "LOGIN" : "SIGN UP"}</Title>
          <Label htmlFor="name">Email*</Label>
          <input
            type="text"
            placeholder="Enter email"
            id="name"
            ref={mailRef}
          />
          <Label htmlFor="pas">Password*</Label>
          <input
            type="password"
            placeholder="Enter password"
            id="pas"
            minLength="5"
            ref={passwordRef}
          />
          <Title1 type="submit">{text ? "LOG IN" : "SIGN UP"}</Title1>
          <Title1 green col onClick={textHandler} type="button">
            {text ? "CREATE ACCOUNT" : "LOG IN"}
          </Title1>
        </Form>
      </Wrap>
    </Card>
  );
}

const Card = styled.div`
  height: 100vh;
  background-color: var(--third);
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Wrap = styled.div`
  background-color: var(--main);
  width: 40vw;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  border-radius: 3px;
  height: 70vh;
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 40vw;
  height: 50vh;
  > input {
    padding: 0.9rem;
    width: 15vw;
    border: none;
    ::placeholder {
      color: var(--main);
    }
    &:focus {
      outline: none;
    }
  }
`;
const Label = styled.label`
  width: 15vw;
  color: var(--third);
  font-weight: 300;
`;
const Title = styled.h1`
  color: var(--third);
  font-weight: 300;
`;
const Title1 = styled.button`
  color: var(--third);
  background-color: ${(props) =>
    props.green ? `var(--green)` : `var(--third)`};
  width: 15vw;
  padding: 0.7rem;
  border: none;
  color: ${(props) => (props.col ? `var(--third)` : `var(--main)`)};
`;
