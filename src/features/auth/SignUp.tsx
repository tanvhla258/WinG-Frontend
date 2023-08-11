import React, { useState, useEffect } from "react";
import { URL } from "../../constant/constant";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { useAppDispatch } from "../../hooks";
import { setCredentials } from "./authSlice";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRegisterMutation } from "../../services/authApi";
import Swal from "sweetalert2";
import bg1 from "../../assets/loginBG.jpeg";
import bg4 from "../../assets/loginBG4.jpg";
import bg2 from "../../assets/loginBG2.jpg";
import bg3 from "../../assets/loginBG3.jpg";
import logo from "../../assets/svg/logo-no-background.svg";

const registerSchema = z
  .object({
    fullName: z.string().min(1, "Full name is required").max(100),
    email: z.string().min(1, { message: "Email is required" }).email({
      message: "Must be a valid email",
    }),
    password: z
      .string()
      .min(1, "Password is required")
      .min(4, "Password must be more than 4 characters")
      .max(32, "Password must be less than 32 characters"),
    passwordConfirm: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    path: ["passwordConfirm"],
    message: "Passwords do not match",
  });
type RegisterSchema = z.infer<typeof registerSchema>;

function Signup() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const backgrounds = [bg1, bg2, bg3, bg4];

  const [registerUser, { data: registerData, isSuccess, isError, error }] =
    useRegisterMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
  });
  useEffect(() => {
    if (isSuccess) {
      Swal.fire({ icon: "success", title: "Register successfully" });
      localStorage.setItem("accessToken", registerData.accessToken);
      localStorage.setItem("refreshToken", registerData.refreshToken);

      dispatch(setCredentials(registerData));
      navigate("/");
    }
  }, [isSuccess]);
  useEffect(() => {
    if (isError && error) {
      Swal.fire({
        icon: "error",
        title: "Register failed",
        text: error?.data?.message || "Unknown error",
      });
    }
  }, [isError]);

  const onSubmit: SubmitHandler<RegisterSchema> = async (formData) => {
    const { fullName: full_name, email, password } = formData;
    if (full_name && email && password) {
      await registerUser({ full_name, email, password });
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
            className="bg-white w-full border-2 p-2 rounded mb-4"
            type="fullName"
            id="fullName"
            {...register("fullName")}
            placeholder="Full Name"
          />
          {errors.fullName && (
            <span className="mb-5 text-red">{errors.fullName.message}</span>
          )}
          <input
            className="bg-white w-full border-2 p-2 rounded mb-4"
            type="email"
            id="email"
            {...register("email")}
            placeholder="Email"
          />
          {errors.email && (
            <span className="mb-5 text-red">{errors.email.message}</span>
          )}
          <input
            className="bg-white w-full border-2 p-2 rounded mb-4"
            type="password"
            id="password"
            {...register("password")}
            placeholder="Password"
          />
          {errors.password && (
            <span className="mb-5 text-red">{errors.password.message}</span>
          )}
          <input
            className="bg-white w-full border-2 p-2 rounded mb-4"
            type="password"
            id="passwordConfirm"
            placeholder="Confirm password"
            {...register("passwordConfirm")}
          />
          {errors.passwordConfirm && (
            <span className="mb-5 text-red">
              {errors.passwordConfirm.message}
            </span>
          )}

          <button
            className=" border-green border-2 text-black hover:bg-green hover:border-transparent hover:shadow-lg focus:outline-none transition duration-300 hover:text-white mb-5 p-2 w-full rounded"
            type="submit"
          >
            Sign up
          </button>

          <Link
            className="hover:bg-green transition duration-300  text-black bottom-3 bg-transparent border-green border-2 left-3 right-3 absolute p-2 rounded  block text-center"
            to="/login"
          >
            Back to Log in
          </Link>
        </form>
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

export default Signup;
