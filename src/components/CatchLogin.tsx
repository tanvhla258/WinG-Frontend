import React, { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

function CatchLogin() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  console.log(searchParams);
  const accessToken = searchParams.get("accessToken");
  const refreshToken = searchParams.get("refreshToken");
  console.log(accessToken);
  console.log(refreshToken);

  localStorage.setItem(
    "userToken",
    JSON.stringify({ accessToken, refreshToken })
  );
  localStorage.setItem("isAuthen", "true");
  useEffect(function () {
    navigate("/");
  }, []);
  return (
    <div>
      <h1>Token</h1>
    </div>
  );
}

export default CatchLogin;
