import React, { useEffect } from "react";
import { useAppSelector } from "../../hooks";
import { useForm, SubmitHandler } from "react-hook-form";
import Swal from "sweetalert2";
import { useGlobalContext } from "../../components/AppLayout";
import { useEditPasswordMutation } from "../../services/userApi";
import VerifiCodeForm from "./VerifyCodeForm";
import Loader from "../../components/Loader";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
// interface FormValues {
//   //   currentPassword: string;
//   newPassword: string;
//   //   email: string;
// }
const changePassSchema = z
  .object({
    newPassword: z
      .string()
      .min(1, "Password is required")
      .min(6, "Password must be more than 6 characters")
      .max(32, "Password must be less than 32 characters"),
    passwordConfirm: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.newPassword === data.passwordConfirm, {
    path: ["passwordConfirm"],
    message: "Passwords do not match",
  });
type ChangePassSchema = z.infer<typeof changePassSchema>;

function ChangePasswordForm() {
  const { setModalActive, setModalContent } = useGlobalContext();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ChangePassSchema>({
    resolver: zodResolver(changePassSchema),
  });
  const [changePassword, { data: res, isLoading, isSuccess, isError, error }] =
    useEditPasswordMutation();
  const onSubmit: SubmitHandler<ChangePassSchema> = async (data) => {
    const password = new FormData();
    await changePassword(data.newPassword);
  };
  useEffect(
    function () {
      console.log(isLoading, isSuccess, isError, error);
      if (isSuccess) {
        setModalContent(<VerifiCodeForm />);
      }
    },
    [isSuccess, isLoading, isError, error]
  );
  const user = useAppSelector((state) => state.user.user);
  return (
    <div className="h-[320px] overflow-y-scroll no-scrollbar">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3 flex flex-col ">
          <h2 className="text-xl font-bold mb-4">Change password</h2>
          <h2 className="text-md  mb-3">
            Your password must be at least 6 characters
          </h2>

          <input
            type="password"
            placeholder="New Password"
            id="fullName"
            className="border-slate-200 border-2  p-4  mb-2 rounded-lg "
            {...register("newPassword")}
          />
          {errors.newPassword && (
            <span className="mb-2 text-red">{errors.newPassword.message}</span>
          )}
          <input
            type="password"
            placeholder="Comfirm Password"
            id="username"
            className="border-slate-200 border-2  p-4  rounded-lg mb-2"
            {...register("passwordConfirm")}
          />
          {errors.passwordConfirm && (
            <span className="mb-2 text-red">
              {errors.passwordConfirm.message}
            </span>
          )}
        </div>
        {isLoading && <Loader />}
        <div className="absolute right-8 flex gap-3 bottom-8">
          <button
            onClick={() => setModalActive(false)}
            className="bg-slate-200 p-2 rounded"
          >
            Cancel
          </button>
          <button className="bg-blue text-white p-2 rounded" type="submit">
            Send
          </button>
        </div>
      </form>
    </div>
  );
}

export default ChangePasswordForm;
