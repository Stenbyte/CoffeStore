import "./App.css";
import Login from "./components/login/Login";
import Header from "./components/header/Header";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Routes, Route } from "react-router-dom";
import Category from "./components/category/Category";

function App() {
  // let Api = process.env.REACT_APP_API_KEY;
  const [user, setUser] = useState(true);
  const load = useSelector((state) => state.user.load);
  // Fetching  productSlice data for Firebase
  const data = useSelector((state) => state.product);
  // Sending to Firebase
  useEffect(() => {
    fetch(
      "https://coffeestore-2ff4a-default-rtdb.europe-west1.firebasedatabase.app/data.json",
      {
        method: "PUT",
        body: JSON.stringify(data),
      }
    );
  }, [data]);
  useEffect(() => {
    // Checking user from session storage
    const user1 = sessionStorage.getItem("load");

    if (user1) {
      setUser(JSON.parse(user1));
    }
    // console.log(user1);
    // console.log("user", user);
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
