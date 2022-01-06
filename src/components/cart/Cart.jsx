import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import Product from "./Product";
export default function Cart() {
  // Fetching product details
  const product = useSelector((state) => state.product.product);
  // Fetching totalPrice
  const totalPrice = useSelector((state) => state.product.totalPrice);

  return (
    <Box>
      {totalPrice === 0 ? (
        <Typography empty>Empty Cart. Start by adding products</Typography>
      ) : (
        product.map((product) => <Product product={product} key={product.id} />)
      )}
      <Right>
        {totalPrice === 0 ? (
          ""
        ) : (
          <>
            <h3>Products preview</h3>
            <div style={{ display: "flex", width: "15rem", gap: "5rem" }}>
              <p>Name</p>
              <p>Total price</p>
            </div>
            {product.map((product) => (
              <RightBox key={product.id}>
                <div>
                  <p>
                    {product.name}({product.price}$){" "}
                  </p>

                  <p>{product.totalPrice}$</p>
                </div>
              </RightBox>
            ))}
            <Typography1>
              Total:
              <span>{totalPrice}$</span>
            </Typography1>

            <Button type="submit">CHECKOUT</Button>
          </>
        )}
      </Right>
    </Box>
  );
}

const Box = styled.div`
  position: absolute;
  top: 4rem;
  right: 1rem;
  width: 40rem;
  min-height: 5rem;
  max-height: 30rem;
  border-radius: 5px;
  background-color: var(--third);
  overflow: auto;
`;
const Right = styled.div`
  width: 19rem;
  min-height: 10rem;
  position: absolute;
  top: 1rem;
  right: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
`;
const RightBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 15rem;
  div {
    display: flex;
    width: 17rem;
    p {
      width: 10rem;
    }
  }
`;
const Typography = styled.p`
  padding: 1rem;
  color: ${(props) => (props.empty ? "var(--fifth)" : "var(--main)")};
  font-weight: 500;
  font-size: 1.5rem;
`;
const Typography1 = styled(Typography)`
  display: flex;
  background-color: var(--second);
  border-radius: 3px;
  min-width: 13rem;
  max-width: 15rem;
  justify-content: space-between;
  align-items: center;
  span {
    background-color: white;
    padding: 0.4rem;
    border-radius: 3px;
  }
`;

const Button = styled.button`
  border: none;
  background-color: var(--green);
  padding: 1rem;
  color: white;
  border-radius: 1px;
  transition: all 0.2s ease;
  cursor: pointer;
  &:active {
    box-shadow: inset 1px 0 1px var(--main), inset -1px 0 1px var(--main);
  }
`;
