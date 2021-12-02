import "./App.css";
import Login from "./components/login/Login";
import Header from "./components/header/Header";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

function App() {
  // let Api = process.env.REACT_APP_API_KEY;
  const [user, setUser] = useState(true);
  const load = useSelector((state) => state.user.load);

  useEffect(() => {
    // Checking user from session storage
    const user1 = sessionStorage.getItem("load");

    if (user1) {
      setUser(JSON.parse(user1));
    }
    // console.log(user1);
    console.log("user", user);
  }, [user]);
  return <div className="App">{user && load ? <Login /> : <Header />}</div>;
}

export default App;
