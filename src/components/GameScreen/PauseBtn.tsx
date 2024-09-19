import { Div } from "@vkontakte/vkui";

import {} from "@vkontakte/icons";
import { TimerReverse } from "./TimerReverse";
import { createPortal } from "react-dom";
const portal = document.getElementById("portal")!;

interface PauseBtnProps {
  onClick: () => void;
}

export const PauseBtn: React.FC<PauseBtnProps> = ({ onClick }) => {
  return (
    <>
      <button
        onClick={onClick}
        className=" relative w-16 h-16 rounded-full bg-[#8484f0]"
        style={{
          backgroundImage: "url('/src/assets/GameScreen/PauseBtn.svg')",
        }}
      ></button>
    </>
  );
  // return (

  //   //
  // );
};
