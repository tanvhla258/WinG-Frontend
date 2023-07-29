import React from "react";
type Props = {
  children: string | JSX.Element | JSX.Element[];
};
function ModalLayout({ children }: Props) {
  return (
    <div className="bg-white w-fit h-fit inset-0 rounded z-50	 p-4 absolute mt-20 mx-auto">
      {children}
    </div>
  );
}

export default ModalLayout;
