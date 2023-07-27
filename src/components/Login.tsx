import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { URL } from "../constant/constant";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import {
  useLoginWithEmailMutation,
  useLoginWithUsernameMutation,
} from "../services/authApi";
import { useForm, SubmitHandler } from "react-hook-form";

interface User {
  // Define the structure of the user object
  id: number;
  username: string;
  // Add other properties as needed
}
type FormValues = {
  username: string;
  password: string;
};

function Loader() {
  return <p className="loader">Loading...</p>;
}

interface ErrorMessageProps {
  message: string;
}

function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    <p className="error">
      <span>⛔️</span> {message}
    </p>
  );
}

function Login() {
  const [user, setUser] = useState<User | null>(null); // Set the initial state as null
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [loginUser, { data, isSuccess, isError }] = useLoginWithEmailMutation();
  const { register, handleSubmit } = useForm<FormValues>();
  console.log(loginUser);
  // const handleGoogleLogin = async () => {
  //   try {
  //     setIsLoading(true);
  //     setError("");
  //     // Make a request to the login endpoint with the username and password
  //     const res = await fetch(`${URL}/login/oauth2/google/authorization`, {
  //       method: "GET",
  //     });

  //     if (!res.ok) throw new Error("Login failed");

  //     const data = await res.json();
  //     console.log(data);
  //     const win: Window = window;
  //     win.location = data.message;
  //   } catch (error: any) {
  //     setError(error.message);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };
  useEffect(() => {
    if (isSuccess) {
      Swal.fire({ title: "Success login" });
      navigate("/");
    }
  });

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const emailRegex = new RegExp("[a-z0-9]+@[a-z]+.[a-z]{2,3}");
    const phoneRegex = new RegExp("^([0-9]){10,16}$");

    const { username, password } = data;
    if (username && password) {
      await loginUser({ email: username, password });
    } else {
      console.log("input wrong");
    }

    // try {
    //   setIsLoading(true);
    //   setError("");
    //   // Make a request to the login endpoint with the username and password
    //   const loginURL = `${URL}/login/basic/${
    //     emailRegex.test(username.value) ? "email" : "username"
    //   }-password`;
    //   console.log(loginURL);
    //   const res = emailRegex.test(username.value)
    //     ? await fetch(loginURL, {
    //         method: "POST",
    //         body: JSON.stringify({
    //           email: username.value,
    //           password: password.value,
    //         }),
    //         headers: {
    //           "Content-Type": "application/json",
    //         },
    //       })
    //     : await fetch(loginURL, {
    //         method: "POST",
    //         body: JSON.stringify({
    //           username: username.value,
    //           password: password.value,
    //         }),
    //         headers: {
    //           "Content-Type": "application/json",
    //         },
    //       });

    //   if (!res.ok) throw new Error("Login failed");

    //   const data = await res.json();
    //   setUser(data);
    //   localStorage.setItem("userToken", data.accessToken);
    //   localStorage.setItem("isAuthen", "true");

    //   navigate("/");
    // } catch (error: any) {
    //   console.log(error.message);
    //   Swal.fire({
    //     icon: "error",
    //     title: "Oops...",
    //     text: "Login failed!",
    //   });
    // } finally {
    //   setIsLoading(false);
    // }
  };

  return (
    <div className="flex justify-between max-w-screen-lg m-auto items-center h-screen">
      <div>
        <h1 className=" text-7xl text-blue font-bold">WinG</h1>
      </div>

      <div className="bg-white w-4/12 rounded p-4">
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            className="bg-white w-full border-2 p-2 rounded mb-2"
            type="text"
            required
            id="username"
            {...register("username")}
            placeholder="Email address or username"
          />
          <br />

          <input
            className="bg-white w-full border-2 p-2 rounded mb-2"
            type="password"
            required
            id="password"
            placeholder="Password"
            {...register("password")}
          />
          <br />

          <button
            className="bg-blue text-white mb-3 p-2 w-full rounded"
            type="submit"
          >
            Login
          </button>
        </form>
        <button
          // onClick={() => handleGoogleLogin()}
          className="bg-yellow text-white mb-3 p-2 w-full rounded"
        >
          Login with google account
        </button>
        <Link className="text-blue mb-3  underline block  text-center" to="#">
          Forgotten password?
        </Link>
        <p className="block text-center mb-3">or</p>
        <Link
          className="bg-green-200 p-2 rounded  block text-center"
          to="/signup"
        >
          Create new account
        </Link>
      </div>
    </div>
  );
}

export default Login;
