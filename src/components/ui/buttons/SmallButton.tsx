import React from "react";

interface SmallButtonProps {
  text: string;
  onClick?: () => void;
  disabled?: boolean;
}
const SmallButton: React.FC<SmallButtonProps> = ({
  text,
  onClick,
  disabled = false,
}) => (
  <button
    onClick={onClick}
    className={`inline-flex cursor-pointer justify-center items-center gap-2.5 pt-[0.1875rem] pb-[0.1875rem] px-4 rounded-full  text-white leading-[1.375rem] ${
      disabled ? "bg-btnDisabled" : "bg-primary"
    }`}
  >
    {text}
  </button>
);

export default SmallButton;
