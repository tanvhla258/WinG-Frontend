import React from "react";
type Props = {
  children: string | JSX.Element | JSX.Element[];
};
function ModalLayout({ children }: Props) {
  return (
    <div className="bg-white w-fit h-fit min-w-[500px] shadow-lg rounded z-50 fixed	inset-10 p-4  mx-auto">
      {children}
    </div>
  );
}

export default ModalLayout;
