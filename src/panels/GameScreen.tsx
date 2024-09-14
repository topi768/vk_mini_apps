import { FC, useState, useEffect, useRef } from "react";
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
import { TimerReverse } from "../components/TimerReverse";
import { PrestartModal } from "../components/PrestartModal";

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

  const hintCircleRef = useRef<HTMLDivElement>(null);

  const handleClickHint = () => {
    setCountHints(countHints - 1);

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
  const [secondsRemaining, setSecondsRemaining] = useState(30);

  useEffect(() => {
    let intervalId: number | undefined;

    const startTimer = () => {
      intervalId = setInterval(() => {
        if (isPause || secondsRemaining <= 0) {
          clearInterval(intervalId);

          return;
        }

        setSecondsRemaining((prevSeconds) => prevSeconds - 1);
      }, 1000);
    };

    if (!isPause) {
      startTimer();
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [isPause, secondsRemaining]);

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

  return (
    <Panel id={id} className="w-full h-full">
      <SplitLayout
        modal={!isOpenPausetModal || modalPauseElement}
        className="w-full h-full"
      ></SplitLayout>
      <Div className="flex justify-center w-full h-full">
        <Button
          className="max-w-[200px]"
          disabled={isHindBtnDisabled}
          onClick={handleClickHint}
        >
          {countHints} Подсказки
        </Button>
      </Div>
      <TimerReverse isPause={isPause} startTime={30} onEnd={handleEndTimer} />

      <Button
        onClick={handleClickPause}
        className="max-w-[40px] absolute bottom-5 left-1/2 -translate-x-1/2 -translate-y-5"
      >
        <Icon20Pause></Icon20Pause>
      </Button>
      <div
        className="absolute rounded-full border border-red-500"
        ref={hintCircleRef}
      ></div>
      <PrestartModal
        onClosePrestartModal={onClosePrestartModal}
        isOpen={isOpenPrestartModal}
      />
    </Panel>
  );
};
