import React, { useState, useRef } from "react";
import styled from "styled-components";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  setPersistence,
  browserSessionPersistence,
} from "firebase/auth";
import { app } from "../../firebase";
import { useDispatch } from "react-redux";
import { userAction } from "../../store/userSlice";

export default function Login() {
  const [text, setText] = useState(true);
  // Error message display
  const [load, setLoad] = useState("");
  //
  const dispatch = useDispatch();
  const mailRef = useRef();
  const passwordRef = useRef();
  const auth = getAuth();
  let email;
  let password;
  let valid;

  console.log("app", app.automaticDataCollectionEnabled);
  // Changing LogIn || Sign UP
  const textHandler = () => {
    setText(!text);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    password = passwordRef.current?.value;
    email = mailRef.current?.value;
    // validating refs
    valid = email.includes("@") || password < 5;
    if (!valid) {
      alert(
        "email adress should include @, password length more than 5 charecters"
      );
    } else {
      if (text && valid) {
        // Login
        signInWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            // Dispatch token
            dispatch(
              userAction.logIn({
                token: user.accessToken,
                load: false,
              })
            );
            // creating session storage for loading LogIn & LogOut
            sessionStorage.setItem("load", false);
            // ...
          })
          .catch((error) => {
            const errorMessage = error.message;

            setLoad(errorMessage);
            // alert(errorMessage);
          });
        // Creating sessionStorage for user
        setPersistence(auth, browserSessionPersistence)
          .then(() => {
            return signInWithEmailAndPassword(auth, email, password);
          })
          .catch((error) => {
            // Handle Errors here.
            const errorMessage = error.message;
            // alert(errorMessage);
            setLoad(errorMessage);
          });
      } else if (valid) {
        //creating new account
        createUserWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            // Dispatch token
            dispatch(
              userAction.logIn({
                token: user.accessToken,
                load: false,
              })
            );
            // creating session storage for loading LogIn & LogOut
            sessionStorage.setItem("load", false);
            // ...
          })
          .catch((error) => {
            const errorMessage = error.message;
            // alert(errorMessage);

            setLoad(errorMessage);
            // ..
          });
      }
    }
  };
  const ErrorComponent = () => {
    return <ErrComp>{load}</ErrComp>;
  };

  return (
    <Card>
      <Wrap>
        <ErrorComponent />
        <Form onSubmit={submitHandler}>
          <Title>{text ? "LOGIN" : "SIGN UP"}</Title>
          <Label htmlFor="name">Email*</Label>
          <input
            type="email"
            placeholder="Enter email"
            id="name"
            ref={mailRef}
            onChange={(e) => setLoad("")}
          />
          <Label htmlFor="pas">Password*</Label>
          <input
            type="password"
            placeholder="Enter password"
            id="pas"
            minLength="5"
            ref={passwordRef}
            onChange={(e) => setLoad("")}
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
  cursor: pointer;
  color: ${(props) => (props.col ? `var(--third)` : `var(--main)`)};
`;
//Error Handler
const ErrComp = styled.div`
  color: white;
  background-color: var(--fifth);
  min-width: 10rem;
  max-width: 30rem;
  position: absolute;
  top: 3rem;
`;
