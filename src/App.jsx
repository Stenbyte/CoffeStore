import "./App.css";
import Login from "./components/login/Login";
import Header from "./components/header/Header";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Routes, Route } from "react-router-dom";
import Category from "./components/category/Category";
import { sendProductData, fetchProductData } from "./store/productSlice";

let isInitial = true;

function App() {
  // let Api = process.env.REACT_APP_API_KEY;
  const [user, setUser] = useState(true);
  const load = useSelector((state) => state.user.load);

  const dispatch = useDispatch();
  // Fetching  productSlice data for Firebase
  const data = useSelector((state) => state.product);
  // Sending to Firebase
  useEffect(() => {
    // Stops sendProductData on reload to prevent data to be overwritten
    if (isInitial) {
      isInitial = false;
      return;
    }
    dispatch(sendProductData(data));
  }, [data, dispatch]);
  // Fetching Data from firebase
  useEffect(() => {
    dispatch(fetchProductData());
  }, [dispatch]);
  // User check
  useEffect(() => {
    // Checking user from session storage
    const user1 = sessionStorage.getItem("load");

    if (user1) {
      setUser(JSON.parse(user1));
    }
  }, [user]);
  return (
    <div className="App">
      {user && load ? (
        <Login />
      ) : (
        <Routes>
          <Route path="/" element={<Header />}>
            <Route index element={<Category />} />
            <Route path="*" element={<p>Nothing here</p>} />
          </Route>
        </Routes>
      )}
    </div>
  );
}

export default App;
