import React, { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../hooks";
import { setCredentials } from "../features/auth/authSlice";
function CatchLogin() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const accessToken = searchParams.get("accessToken");
  const refreshToken = searchParams.get("refreshToken");
  console.log(accessToken);
  const dispatch = useAppDispatch();

  localStorage.setItem("accessToken", accessToken);
  localStorage.setItem("refreshToken", refreshToken);
  useEffect(function () {
    navigate("/");
    dispatch(setCredentials({ accessToken, refreshToken }));
  }, []);
  return (
    <div>
      <h1>Token</h1>
    </div>
  );
}

export default CatchLogin;
