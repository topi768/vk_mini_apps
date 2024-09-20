import { FC, useState, useRef } from "react";
import {
  Panel,
  Button,
  Div,
  NavIdProps,
  ModalRoot,
  ModalPage,
  SplitLayout,
} from "@vkontakte/vkui";
import { UserInfo } from "@vkontakte/vk-bridge";
import { Icon20Pause } from "@vkontakte/icons";
import { TimerReverse } from "../components/GameScreen/TimerReverse";
import { PrestartModal } from "../components/GameScreen/PrestartModal";
import { HintBtn } from "../components/GameScreen/HintBtn";
import { PauseBtn } from "../components/GameScreen/PauseBtn";
import { Header } from "../components/Header";
import { useRouteNavigator } from "@vkontakte/vk-mini-apps-router";

export interface OnboardingProps extends NavIdProps {
  fetchedUser?: UserInfo;
}

export const GameScreen: FC<OnboardingProps> = ({ id }) => {
  const [countHints, setCountHints] = useState(3);
  const [isHindBtnDisabled, setIsHindBtnDisabled] = useState(false);

  const stepSizeCircle = useRef(80);
  const [posHintCircleX, setPosHintCircleX] = useState(120);
  const [posHintCircleY, setPosHintCircleY] = useState(130);
  const [radiusHintCircle, setRadiusHintCircle] = useState(
    (3 + 1) * stepSizeCircle.current,
  );
  const [isOpenPrestartModal, setIsOpenPrestartModal] = useState(false);
  const [isOpenPausetModal, setIsOpenPauseModal] = useState(false);

  const hintCircleRef = useRef<HTMLImageElement>(null);

  const handleClickHint = () => {
    if (countHints >= 1) {
      setCountHints(countHints - 1);
    } else {
      return;
    }

    if (countHints - 1 <= 0) {
      setIsHindBtnDisabled(true);
    }

    setRadiusHintCircle(countHints * stepSizeCircle.current);
    setPosHintCircleX(stepSizeCircle.current / 2 + posHintCircleX);
    setPosHintCircleY(stepSizeCircle.current / 2 + posHintCircleY);

    if (hintCircleRef.current) {
      hintCircleRef.current.style.display = "block";
      hintCircleRef.current.style.transform = `translate(${posHintCircleX}px, ${posHintCircleY}px)`;
      hintCircleRef.current.style.width = `${radiusHintCircle}px`;
      hintCircleRef.current.style.height = `${radiusHintCircle}px`;
    }
  };

  const [isPause, setIsPause] = useState(false);

  const handleClickPause = () => {
    setIsPause(true);
    setIsOpenPauseModal(true);
  };

  const handleClosePauseModel = () => {
    setIsOpenPauseModal(false);
    setIsOpenPrestartModal(true);
  };

  const handleEndTimer = () => {};

  const modalPauseElement = (
    <ModalRoot activeModal="pause">
      <ModalPage
        style={{ minHeight: "200px" }}
        id="pause"
        dynamicContentHeight
        hideCloseButton
      >
        <Div className="p-[120px] relative">
          <h3 className="absolute w-full top-5 left-0 text-center">Пауза</h3>
          <Button
            onClick={handleClosePauseModel}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-5 "
          >
            Продолжить
          </Button>
        </Div>
      </ModalPage>
    </ModalRoot>
  );

  const onClosePrestartModal = () => {
    setIsPause(false);
    setIsOpenPrestartModal(false);
  };
  const routeNavigator = useRouteNavigator();

  return (
    <Panel id={id} className="w- h-full  ">
      <Header text="Найди котика" onClick={() => routeNavigator.push("/")} />

      <SplitLayout
        modal={!isOpenPausetModal || modalPauseElement}
      ></SplitLayout>

      <TimerReverse
        className="absolute top-9 left-1/2 -translate-x-1/2   translate-y-5"
        isPause={isPause}
        startTime={30}
        onEnd={handleEndTimer}
      />
      <div className="flex flex-col absolute bottom-5 left-5">
        <HintBtn
          className="my-2"
          countHint={countHints}
          onClick={handleClickHint}
        />
        <PauseBtn onClick={handleClickPause} />
      </div>
      <img
        src="src/assets/GameScreen/HintCircle.svg"
        ref={hintCircleRef}
        style={{
          display: "none",
        }}
      />
      {/* <div
        className="absolute rounded-full border border-red-500"
        ref={hintCircleRef}
      ></div> */}
      <PrestartModal
        onClosePrestartModal={onClosePrestartModal}
        isOpen={isOpenPrestartModal}
      />
    </Panel>
  );
};
