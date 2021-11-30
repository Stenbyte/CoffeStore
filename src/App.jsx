import "./App.css";
import Login from "./components/login/Login";
import Header from "./components/header/Header";
import { useState } from "react";

function App() {
  const [user, setUser] = useState(
    JSON.parse(
      sessionStorage.getItem(
        "firebase:authUser:AIzaSyBwn84bG5mccscURCBdFJJ8c10Y9ee5WsI:[DEFAULT]"
      )
    )
  );
  console.log(user);
  return <div className="App">{user ? <Header /> : <Login />}</div>;
}

export default App;
