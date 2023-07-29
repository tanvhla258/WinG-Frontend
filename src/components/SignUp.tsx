import React, { useState, useEffect } from "react";
import { URL } from "../constant/constant";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { useAppDispatch } from "../hooks";
import { setCredentials } from "../features/auth/authSlice";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRegisterMutation } from "../services/authApi";
import Swal from "sweetalert2";

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
      localStorage.setItem("token", registerData.refreshToken);
      dispatch(setCredentials(registerData));
      navigate("/");
    }
  }, [isSuccess]);
  useEffect(() => {
    if (isError && error) {
      Swal.fire({
        icon: "error",
        title: "Register failed",
        text: error?.data.message || "Unknown error",
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
    <div className="flex justify-between max-w-screen-lg m-auto items-center h-screen">
      <div>
        <h1 className=" text-7xl text-blue font-bold">WinG</h1>
      </div>

      <div className="bg-white w-4/12 rounded p-4">
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            className="bg-white w-full border-2 p-2 rounded mb-2"
            type="fullName"
            id="fullName"
            {...register("fullName")}
            placeholder="FullName"
          />
          {errors.fullName && (
            <span className="mb-5 text-red">{errors.fullName.message}</span>
          )}
          <input
            className="bg-white w-full border-2 p-2 rounded mb-2"
            type="email"
            id="email"
            {...register("email")}
            placeholder="Email"
          />
          {errors.email && (
            <span className="mb-5 text-red">{errors.email.message}</span>
          )}
          <input
            className="bg-white w-full border-2 p-2 rounded mb-2"
            type="password"
            id="password"
            {...register("password")}
            placeholder="Password"
          />
          {errors.password && (
            <span className="mb-5 text-red">{errors.password.message}</span>
          )}
          <input
            className="bg-white w-full border-2 p-2 rounded mb-2"
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
    </div>
  );
}

export default Signup;
