import { Spacing } from "./ui/Spacing";
import {
  Icon12Add,
  Icon12ArrowDownLeft,
  Icon12ChevronLeft,
} from "@vkontakte/icons";
import { TimerReverse } from "./GameScreen/TimerReverse";
import { createPortal } from "react-dom";
const portal = document.getElementById("portal")!;

interface PrestartModalProps {
  className?: string;
  onClick?: () => void;
  text: string;
}

export const Header: React.FC<PrestartModalProps> = ({
  className,
  onClick,
  text,
}) => {
  return (
    <>
      <div className={className}>
        <header className="p-3 h-12 w-full flex align-center">
          <button className=" left-0  flex justify-center items-center py-1 px-2 w-8 h-8 rounded-full bg-black  ">
            <Icon12ChevronLeft className="text-white" onClick={onClick} />
          </button>
          <div className="w-full h-full flex justify-center items-center ">
            <h1 className="font-NauryzRedKeds text-black  text-[1.375rem] font-bold leading-[1.625rem] justify-center -translate-x-4">
              {text}
            </h1>
          </div>
        </header>
      </div>
    </>
  );
};
