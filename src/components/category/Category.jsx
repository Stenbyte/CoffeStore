import React from "react";
import styled from "styled-components";
import { useSearchParams } from "react-router-dom";
import { category, filterByCategory } from "../../data";
import { useDispatch } from "react-redux";
import { productAction } from "../../store/productSlice";

export default function Category() {
  let [searchParams] = useSearchParams();
  let search = searchParams.get("cat");
  const dispatch = useDispatch();

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

  // Category filter function
  const list = React.useMemo(() => {
    if (!search) return category;

    return filterByCategory(search);
  }, [search]);
  return (
    <Box>
      {list.map((cat) => (
        <Container key={cat.id}>
          <img src={cat.pic} alt="" />
          <Card>
            <Left>
              <h3>
                {cat.name.slice(0, 1).toUpperCase()}
                {cat.name.slice(1)}
              </h3>
              <p>Price: {cat.price}$</p>
              <p>Quantity: {cat.qty}</p>
            </Left>
            <Right>
              {cat.qty === "Not available" ? (
                <p>Sorry you can't add this product</p>
              ) : (
                <>
                  <Button type="button" onClick={() => addProductHandler(cat)}>
                    Add to Cart
                  </Button>
                </>
              )}
            </Right>
          </Card>
        </Container>
      ))}
    </Box>
  );
}

const Box = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  gap: 3.5rem;
  padding: 1rem;
`;
const Container = styled.div`
  width: 30vw;
  height: 40vh;
  background-color: white;
  border-radius: 0 0 10px 10px;
  box-shadow: 3px 0 2px var(--third), -3px 0 2px var(--third);
  transition: all 1s ease;
  &:hover {
    transform: translateY(11px);
  }
  img {
    width: 30vw;
    height: 20vh;
    object-fit: cover;
  }
`;
const Card = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const Left = styled.div`
  width: 15rem;
  h3 {
    padding: 1rem;
  }
  p {
    padding: 0.5rem;
  }
`;
const Right = styled.div`
  width: 8rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1rem 0 0;
`;
const Button = styled.button`
  padding: 0.7rem;
  border: none;
  border-radius: 5px;
  background-color: var(--green);
  color: white;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.2s ease;
  &:active {
    box-shadow: 1px 0 1px var(--second), -1px 0 1px var(--second);
  }
`;
