import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { URL } from "../constant/constant";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
interface User {
  // Define the structure of the user object
  id: number;
  username: string;
  // Add other properties as needed
}

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
  const handleGoogleLogin = async () => {
    try {
      setIsLoading(true);
      setError("");
      // Make a request to the login endpoint with the username and password
      const res = await fetch(`${URL}/login/oauth2/google/authorization`, {
        method: "GET",
      });

      if (!res.ok) throw new Error("Login failed");

      const data = await res.json();
      console.log(data);
      const win: Window = window;
      win.location = data.message;
    } catch (error: any) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };
  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { username, password } = event.currentTarget.elements as unknown as {
      username: { value: string };
      password: { value: string };
    };

    try {
      setIsLoading(true);
      setError("");
      // Make a request to the login endpoint with the username and password
      const res = await fetch(`${URL}/login/basic`, {
        method: "POST",
        body: JSON.stringify({
          username: username.value,
          password: password.value,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) throw new Error("Login failed");

      const data = await res.json();
      setUser(data);
      localStorage.setItem("userToken", data.accessToken);
      localStorage.setItem("isAuthen", "true");
      // Swal.fire({
      //   icon: "error",
      //   title: "Oops...",
      //   text: "Login failed!",
      // });
      navigate("/");
    } catch (error: any) {
      console.log(error.message);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Login failed!",
      });
    } finally {
      setIsLoading(false);
    }
  };

  console.log(user);

  return (
    <div className="flex justify-between max-w-screen-lg m-auto items-center h-screen">
      <div>
        <h1 className=" text-7xl text-blue font-bold">WinG</h1>
      </div>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="bg-white w-4/12 rounded p-4">
          <form onSubmit={handleFormSubmit}>
            <input
              className="bg-white w-full border-2 p-2 rounded mb-2"
              type="text"
              required
              id="username"
              name="username"
              placeholder="Email address or phone number"
            />
            <br />

            <input
              className="bg-white w-full border-2 p-2 rounded mb-2"
              type="password"
              required
              id="password"
              name="password"
              placeholder="Password"
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
            onClick={() => handleGoogleLogin()}
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
      )}
      {error && <ErrorMessage message={error} />}
    </div>
  );
}

export default Login;
