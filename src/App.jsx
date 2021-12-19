import "./App.css";
import Login from "./components/login/Login";
import Header from "./components/header/Header";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Routes, Route } from "react-router-dom";
import Category from "./components/category/Category";
import { uiAction } from "./store/uiSlice";

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
    const sendProductData = async () => {
      dispatch(
        uiAction.errorNot({
          status: null,
          message: null,
        })
      );
      const response = await fetch(
        "https://coffeestore-2ff4a-default-rtdb.europe-west1.firebasedatabase.app/data.json",
        {
          method: "PUT",
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        // If response not ok
        dispatch(
          uiAction.errorNot({
            status: response.status,
            message: response.statusText,
          })
        );
      }
    };

    // Stops sendProductData on reload to prevent data to be overwritten
    if (isInitial) {
      isInitial = false;
      return;
    }

    sendProductData().catch((error) => {
      // Handling errors
      dispatch(
        uiAction.errorNot({
          status: "",
          message: error.message,
        })
      );
    });
  }, [data, dispatch]);

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
