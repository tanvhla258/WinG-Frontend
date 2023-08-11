import Login from "./features/auth/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./pages/Main";
import Signup from "./features/auth/SignUp";
import AppLayout from "./components/AppLayout";
import Profile from "./pages/Profile";
import CatchLogin from "./components/CatchLogin";
import RequireUser from "./components/RequireUser";
import ProfileInfo from "./pages/ProfileInfo";
import ProfileFriends from "./pages/ProfileFriends";
function App() {
  console.log("app mount");
  return (
    <BrowserRouter>
      <AppLayout>
        <Routes>
          <Route element={<RequireUser />}>
            <Route path="/" element={<Main />} />
            <Route path="/profile" element={<Profile />}>
              <Route index element={<ProfileInfo />} />
              <Route path="friends" element={<ProfileFriends />} />
            </Route>
          </Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/catch_token" element={<CatchLogin />}></Route>
          <Route path="/signup" element={<Signup />}></Route>
        </Routes>
      </AppLayout>
    </BrowserRouter>
  );
}

export default App;
