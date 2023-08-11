import React, { useEffect } from "react";
import SetAvatarForm from "./SetAvatarForm";
import Avatar from "./Avatar";
import { useAppSelector } from "../../hooks";
import { useForm, SubmitHandler } from "react-hook-form";
import Swal from "sweetalert2";
import { useGlobalContext } from "../../components/AppLayout";
import { useEditEmailMutation } from "../../services/userApi";
import VerifiCodeForm from "./VerifyCodeForm";
import Loader from "../../components/Loader";
import Button from "../../components/Button";
interface FormValues {
  //   currentPassword: string;
  newPassword: string;
  //   email: string;
  newEmail: string;
  password: string;
}

function ChangeEmailForm() {
  const { setModalActive, setModalContent } = useGlobalContext();
  const { register, handleSubmit } = useForm<FormValues>();
  const [changeEmail, { data: res, isLoading, isSuccess, isError, error }] =
    useEditEmailMutation();

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    await changeEmail({ email: data.newEmail, password: data.password });
  };
  useEffect(
    function () {
      if (isSuccess) {
        Swal.fire({ title: "Change Email successfully" });
        setModalActive(false);
      }
      if (isError) {
        Swal.fire({
          title: "Change Email failed",
          icon: "error",
          text: error?.data.message,
        });
        setModalActive(false);
      }
    },

    [isSuccess, isLoading]
  );
  const user = useAppSelector((state) => state.user.user);
  return (
    <div className="h-[300px] overflow-y-scroll no-scrollbar">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3 flex flex-col ">
          <h2 className="text-xl font-bold mb-4">Change email</h2>
          <h2 className="text-md  mb-3">
            Your password must be at least 6 characters
          </h2>
          {/* <input
            type="email"
            placeholder="Email"
            id="email"
            className="border-slate-200 border-2  p-4  rounded-lg mb-4"
            {...register("email")}
          /> */}

          <input
            type="text"
            placeholder="New Email"
            id="email"
            className="border-slate-200 border-2  p-4  mb-4 rounded-lg "
            {...register("newEmail")}
          />
          <input
            type="password"
            placeholder="Your Password"
            id="password"
            className="border-slate-200 border-2  p-4  rounded-lg mb-4"
            {...register("password")}
          />
        </div>
        <div className="absolute right-8 flex gap-3 bottom-8">
          <Button onClick={() => setModalActive(false)} variant="secondary">
            Cancel
          </Button>
          <Button type="submit">Send</Button>
        </div>
      </form>
    </div>
  );
}

export default ChangeEmailForm;
