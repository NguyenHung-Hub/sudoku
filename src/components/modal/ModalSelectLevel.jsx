import React from "react";
import ModalBase from "./ModalBase";

const ModalSelectLevel = ({ isOpen, setLevel, className = "" }) => {
  const handleSetLevel = (level) => {
    setLevel(level);
  };
  return (
    <ModalBase
      className={`flex w-[400px] flex-col items-center justify-center rounded-lg bg-white  py-8 ${className}`}
      isOpen={isOpen}
    >
      <div className="select-none py-2 text-5xl">Select level</div>
      <div
        onClick={() => handleSetLevel(5)}
        className="mt-4 w-2/3 rounded-lg bg-[#B2B47E] px-8 py-4 text-center text-2xl font-bold uppercase tracking-wide text-[#FFFCF9] hover:cursor-pointer"
      >
        Easy
      </div>
      <div
        onClick={() => handleSetLevel(20)}
        className="mt-4 w-2/3 rounded-lg bg-[#B2B47E] px-8 py-4 text-center text-2xl font-bold uppercase tracking-wide text-[#FFFCF9] hover:cursor-pointer"
      >
        Medium
      </div>
      <div
        onClick={() => handleSetLevel(50)}
        className="mt-4 w-2/3 rounded-lg bg-[#B2B47E] px-8 py-4 text-center text-2xl font-bold uppercase tracking-wide text-[#FFFCF9] hover:cursor-pointer"
      >
        Hard
      </div>
    </ModalBase>
  );
};

export default ModalSelectLevel;
