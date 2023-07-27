import { createContext, useContext } from "react";
type Props = {
  children: string | JSX.Element | JSX.Element[];
};
import { useState } from "react";
import ModalLayout from "./ModalLayout";
export type GlobalContent = {
  modalActive: boolean;
  setModalActive: (data: boolean) => void;
  setModalContent: (data: JSX.Element) => void;

  modalContent: JSX.Element;
};
export const MyGlobalContext = createContext<GlobalContent>({
  modalActive: false, // set a default value
  setModalActive: () => {},
  modalContent: <></>,
  setModalContent: () => {},
});
export const useGlobalContext = () => useContext(MyGlobalContext);

function AppLayout({ children }: Props) {
  const [modalActive, setModalActive] = useState<boolean>(false);
  const [modalContent, setModalContent] = useState<JSX.Element>(<></>);
  console.log("app layout work 2");
  return (
    <div
      className={`${
        modalActive ? "relative w-full h-full" : ""
      } m-auto h-screen bg-slate-200`}
    >
      <MyGlobalContext.Provider
        value={{ modalContent, setModalContent, modalActive, setModalActive }}
      >
        {children}
        {
          <div
            onClick={() => setModalActive(false)}
            className={`abolute z-10 bg-gray-600 opacity-50 absolute inset-0 ${
              modalActive ? "block" : "hidden"
            }`}
          ></div>
        }
        {modalActive ? <ModalLayout>{modalContent}</ModalLayout> : ""}
      </MyGlobalContext.Provider>
    </div>
  );
}

export default AppLayout;
