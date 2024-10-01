import { FC, useState, useRef } from "react";
import { UserInfo } from "@vkontakte/vk-bridge";
import { TimerReverse } from "../components/GameScreen/GameTimer";
import { PrestartModal } from "../components/GameScreen/PrestartModal";
import { HintBtn } from "../components/GameScreen/HintBtn";
import { PauseBtn } from "../components/GameScreen/PauseBtn";
import { Onboarding } from "../components/GameScreen/Onboarding";
import { PauseModal } from "../components/GameScreen/Pause";
import { Results } from "../components/GameScreen/Results";
import { HintCircle } from "../components/GameScreen/HintCircle";
import {
  Panel,
  NavIdProps,
  ModalRoot,
  ModalPage,
  SplitLayout,
} from "@vkontakte/vkui";

export interface OnboardingProps extends NavIdProps {
  fetchedUser?: UserInfo;
}

export const GameScreen: FC<OnboardingProps> = ({ id }) => {
  const [countHints, setCountHints] = useState(3);
  const [isOpenOnboarding, setIsOpenOnboarding] = useState(true);
  const [isOpenPrestartModal, setIsOpenPrestartModal] = useState(false);
  const [isOpenPausetModal, setIsOpenPauseModal] = useState(false);
  const [startSeconds, setStartSeconds] = useState(30);
  const [isOpenResults, setIsOpenResults] = useState(false);

  const handleClickHint = () => {
    if (countHints >= 1) {
      setCountHints(countHints - 1);
    } else {
      return;
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

  const handleEndTimer = () => {
    setIsOpenResults(true);
  };

  const onClosePrestartModal = () => {
    setIsPause(false);
    setIsOpenPrestartModal(false);
  };

  const timerEL = useRef<HTMLDivElement>(null);
  const hintButtonEL = useRef<HTMLDivElement>(null);
  const pauseButtonEL = useRef<HTMLButtonElement>(null);

  const handleHighlightChange = (highlighted: string) => {
    switch (highlighted) {
      case "timer":
        setStartSeconds(30);

        if (timerEL.current && hintButtonEL.current && pauseButtonEL.current) {
          timerEL.current.style.zIndex = "0";
          hintButtonEL.current.style.zIndex = "0";
          pauseButtonEL.current.style.zIndex = "0";
        }

        if (timerEL.current) {
          timerEL.current.style.zIndex = "50000";
        }

        break;
      case "timerDangerous":
        setStartSeconds(10);

        if (timerEL.current && hintButtonEL.current && pauseButtonEL.current) {
          timerEL.current.style.zIndex = "0";
          hintButtonEL.current.style.zIndex = "0";
          pauseButtonEL.current.style.zIndex = "0";
        }

        if (timerEL.current) {
          timerEL.current.style.zIndex = "50000";
        }

        break;
      case "hintButton":
        setStartSeconds(30);

        if (timerEL.current && hintButtonEL.current && pauseButtonEL.current) {
          timerEL.current.style.zIndex = "0";
          hintButtonEL.current.style.zIndex = "0";
          pauseButtonEL.current.style.zIndex = "0";
        }

        if (hintButtonEL.current) {
          hintButtonEL.current.style.zIndex = "50000";
        }

        break;
      case "pauseButton":
        if (timerEL.current && hintButtonEL.current && pauseButtonEL.current) {
          timerEL.current.style.zIndex = "0";
          hintButtonEL.current.style.zIndex = "0";
          pauseButtonEL.current.style.zIndex = "0";
        }

        if (pauseButtonEL.current) {
          pauseButtonEL.current.style.zIndex = "50000";
        }

        break;
      default:
        if (timerEL.current && hintButtonEL.current && pauseButtonEL.current) {
          timerEL.current.style.zIndex = "0";
          hintButtonEL.current.style.zIndex = "0";
          pauseButtonEL.current.style.zIndex = "0";
        }

        break;
    }
  };
  const ondoarding = (
    <ModalRoot activeModal="ondoarding">
      <ModalPage
        className=" w-full h-full"
        id="ondoarding"
        hideCloseButton
      ></ModalPage>
    </ModalRoot>
  );

  return (
    <Panel id={id} className=" h-full relative ">
      <SplitLayout modal={isOpenOnboarding && ondoarding}></SplitLayout>
      <div>
        <Onboarding
          isOpen={isOpenOnboarding}
          onHighlightChange={handleHighlightChange}
          onEnd={() => setIsOpenOnboarding(false)}
        />
        <PauseModal
          onClose={handleClosePauseModel}
          isOpen={isOpenPausetModal}
        />
        <TimerReverse
          className="absolute top-9 left-1/2 -translate-x-1/2   translate-y-5"
          isPause={isPause || isOpenOnboarding}
          startTime={startSeconds}
          key={startSeconds}
          onEnd={handleEndTimer}
          ref={timerEL}
        />
        <div className=" w-full flex justify-between items-end absolute bottom-5 left-0 px-6 ">
          <HintBtn
            ref={hintButtonEL}
            className="translate-y-[6px]"
            countHint={countHints}
            onClick={handleClickHint}
          />
          <PauseBtn ref={pauseButtonEL} onClick={handleClickPause} />
        </div>

        <PrestartModal
          onClosePrestartModal={onClosePrestartModal}
          isOpen={isOpenPrestartModal}
        />
        <Results
          isOpen={isOpenResults}
          results={{ score: 123, amountCat: 5, timeLeft: "00:05" }}
          onClose={() => setIsOpenResults(false)}
        />
        <HintCircle
          countHints={countHints}
          posHintCircleX={200}
          posHintCircleY={200}
        />
      </div>
    </Panel>
  );
};
