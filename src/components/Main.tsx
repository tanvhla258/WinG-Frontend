import reactLogo from "../assets/react.svg";
import { useEffect, useState } from "react";
import { URL } from "../constant/constant";
import TopBar from "./TopBar";
import Sidebar from "./Sidebar";
import Profile from "./Profile";
import CreatePost from "./CreatePost";
import Post from "./Post";

interface User {
  username: string;
  password: string;
  role: string;
  fullname: string;
  email: string;
}
function Main() {
  const [user, setUser] = useState<User>({
    username: "",
    password: "",
    role: "",
    fullname: "",
    email: "",
  });
  const [userToken, setUserToken] = useState<string | null>(() =>
    localStorage.getItem("userToken")
  );

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!userToken) return;
    const getUserInfo = async () => {
      setIsLoading(true);
      setError("");
      try {
        const res = await fetch(`${URL}/user/me`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            token: "Bearer " + userToken,
          },
        });
        if (!res.ok) throw new Error("get user failed");
        const data = await res.json();
        console.log(data);
        setUser(data);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    getUserInfo();
  }, []);

  return (
    <div className="m-auto">
      <TopBar />
      <div className=" max-w-screen-lg flex gap-4 py-4  flex-row m-auto">
        <div className="basis-1/4">
          <Sidebar />
        </div>
        <div className="basis-3/4">
          <CreatePost />
          <div className="mb-3"></div>
          <Post />
        </div>
      </div>
    </div>
  );
}

export default Main;
