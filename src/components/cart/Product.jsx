import React from "react";
import styled from "styled-components";
import minus from "../../img/minus.png";
import plus from "../../img/plus.png";
import { useDispatch } from "react-redux";
import { productAction } from "../../store/productSlice";
export default function Product({ product }) {
  const dispatch = useDispatch();
  // Add product
  const addProductHandler = (cat) => {
    let { id, name, price, pic } = cat;
    // Dispatching product
    dispatch(
      productAction.addProduct({
        id: id,
        name: name,
        price: price,
        img: pic,
      })
    );
  };
  // Remove product
  const removeProductHandler = (cat) => {
    console.log(cat);
    let { id, name, price, pic } = cat;
    dispatch(
      productAction.removeProduct({
        id: id,
        name: name,
        price: price,
        img: pic,
      })
    );
  };
  return (
    <Card key={product.id}>
      <Left>
        <img src={product.img} alt="" />
        <Description>
          <h3>{product.name}</h3>
          <p>Quantity: {product.qty}</p>
          <Btn>
            <img
              src={minus}
              alt=""
              card="red"
              onClick={() => removeProductHandler(product)}
            />
            <img
              src={plus}
              alt=""
              card="blue"
              onClick={() => addProductHandler(product)}
            />
          </Btn>
        </Description>
      </Left>
    </Card>
  );
}
const Card = styled.div`
  background-color: white;
  height: 10rem;
  display: flex;
  align-items: flex-start;
  width: 20rem;
  margin: 1rem;
`;
const Left = styled.div`
  width: 20rem;
  display: flex;
  align-items: center;
  img {
    width: 10rem;
    height: 10rem;
    padding: 0 0 0 0.3rem;
    object-fit: contain;
    border-radius: 1px;
  }
`;
const Description = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-around;
  width: 10rem;
  height: 9rem;
`;
const Btn = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 5.5rem;
  img {
    width: 2.5rem;
    cursor: pointer;
    height: 2.5rem;
    transition: all 0.2s ease;
    &:active {
      filter: drop-shadow(0 0 0.1rem var(--fifth));
    }
  }
`;
