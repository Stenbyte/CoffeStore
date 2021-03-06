import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { getAuth, signOut } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { userAction } from "../../store/userSlice";
import { uiAction } from "../../store/uiSlice";
import Slider from "../slider/Slider";
import { Link } from "react-router-dom";
import { names } from "../../data";
import { Outlet, useSearchParams } from "react-router-dom";
import cartImg from "../../img/cart.png";
import Cart from "../cart/Cart";
import Notification from "../notification/Notification";
import Not from "../notification/Not";
import Modal from "../checkout/Modal";

export default function Header() {
  const auth = getAuth();
  const dispatch = useDispatch();
  // Fetching product
  const product = useSelector((state) => state.product);
  // Cart display state
  const showCart = useSelector((state) => state.ui.showCart);
  const showConfirm = useSelector((state) => state.ui.confirmPurchase);
  // Notification display state
  const NotificationError = useSelector((state) => state.ui.notification);
  const NotError = useSelector((state) => state.product.QtyError);
  // Getting user
  const [user, setUser] = useState("");
  // Display Cart
  const showCartHandler = () => {
    dispatch(uiAction.showCart());
  };
  // LogOut
  const logOut = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
        alert(error.message);
      });
    dispatch(
      userAction.logOut({
        token: "",
        load: true,
      })
    );
    // Clearing session Storage
    sessionStorage.clear();
  };
  // Link styling if Active
  function CatLink({ name, children, props }) {
    let [searchParams] = useSearchParams();
    let isActive = searchParams.get("cat") === name;

    return (
      <Link
        to={`/?cat=${name}`}
        {...props}
        style={{ color: isActive ? `var(--violet)` : `var(--third)` }}
      >
        {children}
      </Link>
    );
  }
  useEffect(() => {
    let data = sessionStorage.getItem(
      "firebase:authUser:AIzaSyBwn84bG5mccscURCBdFJJ8c10Y9ee5WsI:[DEFAULT]"
    );

    setUser(JSON.parse(data));
  }, []);

  return (
    <Container>
      {NotificationError?.message && <Notification />}
      {showConfirm && <Modal />}
      <Card>
        <Logo>
          <Link to="/">
            <img src="/beens.png" alt="" />
          </Link>
        </Logo>
        <Wrapper>
          <p style={{ color: "white" }}>Welcome {user.email}</p>
          <Button onClick={showCartHandler}>
            <img src={cartImg} alt="" />
            {product.qty === 0 ? "" : <span>{product.qty}</span>}
          </Button>
          <Button
            cart
            onClick={logOut}
            style={{ color: "white", letterSpacing: "3px" }}
          >
            LOGOUT
          </Button>
          {showCart && <Cart />}
        </Wrapper>
        {NotError && <Not />}
      </Card>
      <Slider />
      <UL>
        <h3>Filter by category:</h3>
        <li>
          <Link to="/">ALL</Link>
        </li>
        {names.map((cat) => (
          <li key={cat}>
            <CatLink name={cat}>{cat.toUpperCase()}</CatLink>
          </li>
        ))}
        <Span>Created By: Sten Scheifel</Span>
      </UL>

      <Outlet />
    </Container>
  );
}

const Container = styled.div`
  position: relative;
`;

const Card = styled.div`
  background-color: var(--main);
  height: 10vh;
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: sticky;
  top: 0;
  z-index: 10;
`;
const Logo = styled.div`
  cursor: pointer;
  img {
    width: 42px;
  }
`;
const Wrapper = styled.div`
  min-width: 27vw;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
`;

const Button = styled.button`
  padding: 0.1rem;
  border: none;
  border-radius: 3px;
  min-width: 7vw;
  height: 2.5rem;
  transition: all 0.2s ease;
  position: relative;
  cursor: pointer;
  background-color: ${(props) =>
    props.cart ? `var(--second)` : `var(--third)`};
  &:active {
    box-shadow: inset 0px 1px 1px var(--main), inset 1px 0px 1px var(--main),
      inset 0 -1px 2px var(--main), inset -1px 0 2px var(--main);
  }
  img {
    width: 32px;
    height: 32px;
  }
  span {
    position: absolute;
    top: 0.5vh;
    right: 1vw;
    background-color: var(--violet);
    min-width: 17px;
    padding: 1px;
    color: var(--third);
    border-radius: 3px;
  }
`;
const UL = styled.ul`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 45vw;
  margin: 0.3rem 0 1rem 1rem;
  padding: 1rem;
  border-radius: 1px;
  list-style-type: none;
  position: relative;
  background-color: var(--second);
  h3 {
    color: var(--main);
    font-weight: 400;
  }
  li {
    color: var(--third);
    a {
      color: var(--third);
      text-decoration: none;
      letter-spacing: 2px;
      &:focus {
        color: var(--violet);
      }
    }
  }
`;
const Span = styled.span`
  position: absolute;
  top: 3%;
  right: -53vw;
  font-weight: 300;
`;
