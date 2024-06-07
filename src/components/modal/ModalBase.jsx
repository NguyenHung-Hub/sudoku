import React from "react";
import PropType from "prop-types";

const ModalBase = ({ isOpen, className, children }) => {
  if (!isOpen) return null;
  return (
    <div className="z-max fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div
        className={`transform overflow-hidden shadow-xl transition-all ${className}`}
      >
        {children}
      </div>
    </div>
  );
};

ModalBase.propType = {
  children: PropType.node.isRequired,
};

export default ModalBase;
