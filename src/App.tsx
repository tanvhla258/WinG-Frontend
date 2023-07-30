import "./App.css";
import Login from "./features/auth/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./components/Main";
import { useState, useContext, useEffect } from "react";
import Signup from "./features/auth/SignUp";
import AppLayout from "./components/AppLayout";
import Profile from "./components/Profile";
import CatchLogin from "./components/CatchLogin";
import TopBar from "./components/TopBar";
import RequireUser from "./components/RequireUser";
import { useGetUserQuery } from "./services/userApi";
import Loader from "./components/Loader";
import { useAppSelector } from "./hooks";
function App() {
  // const [isAuth, setIsAuth] = useState(() =>
  //   window.localStorage.getItem("isAuthen")
  // );

  console.log("app mount");
  return (
    <BrowserRouter>
      <AppLayout>
        <Routes>
          <Route element={<RequireUser />}>
            <Route path="/" element={<Main />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/catch_token" element={<CatchLogin />}></Route>
          </Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/signup" element={<Signup />}></Route>
        </Routes>
      </AppLayout>
    </BrowserRouter>
  );
}

export default App;
