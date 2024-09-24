import React from "react";

interface LargeButtonProps {
  text: string;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
}
const LargeButton: React.FC<LargeButtonProps> = ({
  text,
  onClick,
  disabled = false,
  className = "",
}) => (
  <div className={className}>
    <button
      onClick={onClick}
      className={`flex justify-center items-center gap-2.5 p-2 w-[18.3125rem] rounded-full bg-primary  text-white  font-medium leading-[1.375rem] ${disabled ? "bg-btnDisabled" : "bg-primary"}`}
    >
      {text}
    </button>
  </div>
);

export default LargeButton;
