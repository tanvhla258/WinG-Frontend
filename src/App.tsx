import "./App.css";
import Login from "./components/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./components/Main";
import { useState, useContext } from "react";
import Signup from "./components/SignUp";
import AppLayout from "./components/AppLayout";
import Profile from "./components/Profile";
import CatchLogin from "./components/CatchLogin";
import TopBar from "./components/TopBar";

function App() {
  // const [isAuth, setIsAuth] = useState(() =>
  //   window.localStorage.getItem("isAuthen")
  // );
  return (
    <BrowserRouter>
      <AppLayout>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/catch_token" element={<CatchLogin />}></Route>

          <Route path="/login" element={<Login />}></Route>
          <Route path="/signup" element={<Signup />}></Route>
        </Routes>
      </AppLayout>
    </BrowserRouter>
  );
}

export default App;
