import { useGlobalContext } from "../../components/AppLayout";
import VerificationInput from "react-verification-input";
import { useVerifyCodePasswordMutation } from "../../services/userApi";
import { useEffect } from "react";
import Swal from "sweetalert2";
import Loader from "../../components/Loader";

export default function VerifiCodeForm() {
  const { setModalActive, setModalContent } = useGlobalContext();
  const [verify, { data: res, isLoading, isSuccess, isError, error }] =
    useVerifyCodePasswordMutation();
  const onSubmit = async (data: string) => {
    await verify(data);
  };
  useEffect(
    function () {
      if (isSuccess) {
        Swal.fire("Your new password has been apply");
        setModalActive(false);
      }
      if (isError) {
        Swal.fire({ title: error?.data.message, icon: "error" });
        setModalActive(false);
      }
    },
    [isSuccess, isError, isLoading]
  );
  return (
    <form>
      <div className="text-xl font-bold">Please enter verify code</div>
      <div className="mb-3">Check your gmail</div>
      {isError && <span className="text-red">Wrong verify code</span>}
      {isLoading && <Loader />}
      <VerificationInput
        autoFocus
        length={6}
        onComplete={(value) => {
          onSubmit(value);
          // setModalActive(false);
        }}
      />
    </form>
  );
}
