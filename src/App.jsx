import "./App.css";
import Login from "./components/login/Login";
import Header from "./components/header/Header";
import { useState } from "react";

function App() {
  let Api = process.env.REACT_APP_API_KEY;
  const [user, setUser] = useState(
    JSON.parse(sessionStorage.getItem(`firebase:authUser:${Api}:[DEFAULT]`))
  );
  console.log(user);
  return <div className="App">{user ? <Header /> : <Login />}</div>;
}

export default App;
