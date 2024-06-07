import React from "react";
import ModalBase from "./ModalBase";

const ModalWin = ({ children, isOpen, className }) => {
  return (
    <ModalBase
      className={`rounded-lg bg-white sm:w-full md:w-[400px] ${className}`}
      isOpen={isOpen}
    >
      {children}
    </ModalBase>
  );
};

export default ModalWin;
