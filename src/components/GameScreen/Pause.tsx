import {} from "@vkontakte/icons";
import { createPortal } from "react-dom";
import { LargeButton } from "../ui/buttons/LargeButton";
import SleepCat from "@/assets/GameScreen/sleepCat.svg";
import { useRouteNavigator } from "@vkontakte/vk-mini-apps-router";

const portal = document.getElementById("portal")!;

interface PauseModalProps {
  isOpen: boolean;
  onClose: () => void;
}
import {
  Panel,
  Button,
  NavIdProps,
  ModalRoot,
  ModalPage,
  SplitLayout,
} from "@vkontakte/vkui";

export const PauseModal: React.FC<PauseModalProps> = ({ isOpen, onClose }) => {
  const ondoarding = (
    <ModalRoot activeModal="ondoarding">
      <ModalPage
        className=" w-full h-full"
        id="ondoarding"
        hideCloseButton
      ></ModalPage>
    </ModalRoot>
  );
  const routeNavigator = useRouteNavigator();

  const onExit = () => {
    routeNavigator.push("/");
  };

  if (isOpen) {
    return createPortal(
      <div className={`" w-full h-full absolute left-0 top-0 px-6  bg-black `}>
        <div className="relative w-full h-full  z-10">
          <SleepCat className="absolute left-1/2 -translate-x-1/2 top-0 z-0 " />
          <div className="bg-white px-7 py-10 rounded-2xl z-10 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full">
            <h3 className="text-center text-[20px] font-bold mb-4">Пауза</h3>
            <p className="text-[#6D7885]">
              Устал? Не страшно. Продолжим, как отдохешь.
            </p>
            <LargeButton onClick={onClose} className="mt-8" text="Продолжить" />
          </div>
          <LargeButton
            onClick={onExit}
            className="absolute  bottom-4 left-1/2 -translate-x-1/2"
            text="Выйти"
            isPrimary={false}
            color="#FE4202"
          />
        </div>
      </div>,

      portal,
    );
  }

  // return (

  //   //
  // );
};
