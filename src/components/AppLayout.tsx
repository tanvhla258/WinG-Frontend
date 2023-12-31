import { createContext, useContext } from "react";
type Props = {
  children: string | JSX.Element | JSX.Element[];
};
import { useState } from "react";
import ModalLayout from "./ModalLayout";
import TopBar from "./TopBar";
import bg from "../assets/loginBG.jpeg";
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
  return (
    <div
      className={`${
        modalActive ? "relative   overflow-y-scroll  w-full h-full" : ""
      } m-auto min-h-screen font-poppins  bg-slate-200`}
      style={{
        position: "relative",
        backgroundColor: "rgba(0, 0, 0, 0.05)", // Fallback color in case the image doesn't load
      }}
    >
      <div
        style={{
          backgroundImage: `url(${bg})`,
          backgroundRepeat: "repeat",
          backgroundSize: "contain",
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          opacity: 0.1,
          zIndex: -10,
        }}
      />
      <MyGlobalContext.Provider
        value={{ modalContent, setModalContent, modalActive, setModalActive }}
      >
        {/* <img className="absolute opacity-20   " src={bg}></img> */}
        <TopBar />
        {children}
        {
          <div
            onClick={() => setModalActive(false)}
            className={`abolute z-40 bg-gray-600 opacity-50 absolute inset-0 ${
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
