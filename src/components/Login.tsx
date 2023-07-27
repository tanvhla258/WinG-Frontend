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
import { useAppDispatch } from "../hooks";
import { setCredentials } from "../features/auth/authSlice";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().min(1, { message: "Email is required" }).email({
    message: "Must be a valid email",
  }),
  password: z
    .string()
    .min(6, { message: "Password must be atleast 6 characters" }),
});

type LoginSchema = z.infer<typeof loginSchema>;
function Login() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [loginUser, { data: loginData, isSuccess, isError, error }] =
    useLoginWithEmailMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  });

  const handleGoogleLogin = async () => {
    try {
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
      console.log(error);
    }
  };
  useEffect(() => {
    if (isSuccess) {
      Swal.fire({ icon: "success", title: "Success login" });
      localStorage.setItem("token", loginData.accessToken);
      dispatch(setCredentials(loginData));
      navigate("/");
    }
  }, [isSuccess]);
  useEffect(() => {
    if (isError && error) {
      Swal.fire({
        icon: "error",
        title: "Login failed",
        text: error?.data.message || "Unknown error",
      });
    }
  }, [isError]);

  const onSubmit: SubmitHandler<LoginSchema> = async (formData) => {
    const emailRegex = new RegExp("[a-z0-9]+@[a-z]+.[a-z]{2,3}");
    const phoneRegex = new RegExp("^([0-9]){10,16}$");

    const { email, password } = formData;
    if (email && password) {
      await loginUser({ email, password });
    } else {
      console.log("input wrong");
    }
  };

  return (
    <div className="flex justify-between max-w-screen-lg m-auto items-center h-screen">
      <div>
        <h1 className=" text-7xl text-blue font-bold">WinG</h1>
      </div>

      <div className="bg-white w-4/12  rounded p-4">
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            className={`bg-white w-full border-2 focus:outline-blue p-2 rounded mb-5 `}
            type="text"
            required
            id="email"
            {...register("email")}
            placeholder="Email address "
          />

          {errors.email && (
            <span className="mb-5 text-red">{errors.email.message}</span>
          )}
          <input
            className={`bg-white w-full focus:outline-blue border-2 p-2 rounded mb-5 `}
            type="password"
            required
            id="password"
            placeholder="Password"
            {...register("password")}
          />
          {errors.password && (
            <span className="mb-5 text-red">{errors.password.message}</span>
          )}

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
    </div>
  );
}

export default Login;
