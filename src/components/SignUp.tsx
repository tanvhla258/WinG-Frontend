import React, { useState, useEffect } from "react";
import { URL } from "../constant/constant";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
interface User {
  // Define the structure of the user object
  id: number;
  fullName: string;
  email: string;

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

function Signup() {
  const [user, setUser] = useState<User | null>(null); // Set the initial state as null
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { password, email, fullName } = event.currentTarget
      .elements as unknown as {
      password: { value: string };
      email: { value: string };
      fullName: { value: string };
    };

    try {
      setIsLoading(true);
      setError("");
      // Make a request to the login endpoint with the username and password
      const res = await fetch(`${URL}/register/basic`, {
        method: "POST",
        body: JSON.stringify({
          password: password.value,
          email: email.value,
          full_name: fullName.value,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) throw new Error("Signup failed");

      const data = await res.json();
      setUser(data);
      localStorage.setItem("userToken", data.accessToken);
      localStorage.setItem("isAuthen", "true");
      navigate("/");
    } catch (error: any) {
      setError(error.message);
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
              type="fullName"
              required
              id="fullName"
              name="fullName"
              placeholder="FullName"
            />
            <input
              className="bg-white w-full border-2 p-2 rounded mb-2"
              type="email"
              required
              id="email"
              name="email"
              placeholder="Email"
            />

            <input
              className="bg-white w-full border-2 p-2 rounded mb-2"
              type="password"
              required
              id="password"
              name="password"
              placeholder="Password"
            />

            <button
              className="bg-blue text-white mb-3 p-2 w-full rounded"
              type="submit"
            >
              Sign up
            </button>

            <p className="block text-center mb-3">or</p>
            <Link
              className="bg-green-200 p-2 rounded  block text-center"
              to="/login"
            >
              Back to Log in
            </Link>
          </form>
        </div>
      )}
      {error && <ErrorMessage message={error} />}
    </div>
  );
}

export default Signup;
