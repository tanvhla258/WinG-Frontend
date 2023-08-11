import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { URL } from "../../constant/constant";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import {
  useLoginWithEmailMutation,
  useLoginWithUsernameMutation,
} from "../../services/authApi";
import { useForm, SubmitHandler } from "react-hook-form";
import { useAppDispatch } from "../../hooks";
import { setCredentials } from "./authSlice";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import bg1 from "../../assets/loginBG.jpeg";
import bg4 from "../../assets/loginBG4.jpg";
import bg2 from "../../assets/loginBG2.jpg";
import bg3 from "../../assets/loginBG3.jpg";
import logo from "../../assets/svg/logo-no-background.svg";
import Button from "../../components/Button";
import { FcGoogle } from "react-icons/fc";
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
  const backgrounds = [bg1, bg2, bg3, bg4];
  console.log(Math.random() * 3 + 1);
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
      dispatch(setCredentials(loginData));
      localStorage.setItem("accessToken", loginData.accessToken);
      localStorage.setItem("refreshToken", loginData.refreshToken);
      navigate("/");
    }
  }, [isSuccess]);
  useEffect(() => {
    if (isError && error) {
      Swal.fire({
        icon: "error",
        title: "Login failed",
        text: error?.data?.message || "Unknown error",
      });
    }
  }, [isError]);

  const onSubmit: SubmitHandler<LoginSchema> = async (formData) => {
    // const emailRegex = new RegExp("[a-z0-9]+@[a-z]+.[a-z]{2,3}");
    // const phoneRegex = new RegExp("^([0-9]){10,16}$");

    const { email, password } = formData;
    if (email && password) {
      await loginUser({ email, password });
    } else {
      console.log("input wrong");
    }
  };

  return (
    <div className="flex flex-row relative justify-between  m-auto items-center h-screen">
      <div className="bg-white relative h-full basis-1/3 rounded p-4 py-12">
        <div className="flex items-center justify-center mb-3 py-auto">
          <div className="w-14 h-14 ">
            <img className=" rounded" src={logo} alt="app icon" />
            {/* <h1 className=" text-5xl text-center mb-3  font-bold">WinG</h1> */}
          </div>
        </div>
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
            className="text-blue border-blue border-2 hover:bg-blue hover:border-transparent hover:shadow-lg focus:outline-none transition duration-300 hover:text-white mb-5 p-2 w-full rounded"
            type="submit"
          >
            Login
          </button>
        </form>
        <Button
          variant="secondary"
          option="w-full justify-center mb-4"
          icon={<FcGoogle size={24} />}
          onClick={() => handleGoogleLogin()}
        >
          Login with google account
        </Button>
        <Link className="text-blue mb-4  underline block  text-center" to="#">
          Forgotten password?
        </Link>
        <Link
          className="text-blue bottom-3 left-3 right-3 absolute border-blue border-2 hover:bg-blue hover:text-white hover:border-transparent hover:shadow-lg focus:outline-none transition duration-300 p-2 rounded  block text-center"
          to="/signup"
        >
          Create new account
        </Link>
      </div>
      <div className="basis-2/3 h-full">
        <img
          className="object-cover opacity-80 h-full"
          src={backgrounds[Math.floor(Math.random() * 3 + 1)]}
          alt=""
        />
      </div>
    </div>
  );
}

export default Login;
