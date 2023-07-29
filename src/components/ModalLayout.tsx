import React from "react";
type Props = {
  children: string | JSX.Element | JSX.Element[];
};
function ModalLayout({ children }: Props) {
  return (
    <div className="bg-white w-fit h-fit inset-0 rounded z-1000	 p-4 absolute m-auto">
      {children}
    </div>
  );
}

export default ModalLayout;
