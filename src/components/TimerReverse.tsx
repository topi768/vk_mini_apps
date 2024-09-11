import { FC, useState, useEffect, useRef } from "react";
import {
  Panel,
  PanelHeader,
  Header,
  Button,
  Group,
  Cell,
  Div,
  Avatar,
  NavIdProps,
  Flex,
  ModalRoot,
  ModalPage,
  ModalCard,
  SplitLayout,
} from "@vkontakte/vkui";
import { UserInfo } from "@vkontakte/vk-bridge";
import { useRouteNavigator } from "@vkontakte/vk-mini-apps-router";
import {
  Icon20Pause,
  Icon20RefreshOutline,
  Icon20ShareExternalAndroid,
  Icon20ShareOutline,
  Icon20User,
  Icon24VoiceOutline,
} from "@vkontakte/icons";
import styles from "../panels/GameScreen.module.css";
import "../App.css";

export const TimerReverse = ({ isPause, startTime, onEnd }) => {
  // const [isPause, setIsPause]= useState(false);
  const [secondsRemaining, setSecondsRemaining] = useState(startTime);

  useEffect(() => {
    let intervalId: number | undefined;

    const startTimer = (isPause: boolean) => {
      intervalId = setInterval(() => {
        if (secondsRemaining <= 0 && !isPause) {
          onEnd();
        }
        if (isPause || secondsRemaining <= 0) {
          clearInterval(intervalId);
          return;
        }

        setSecondsRemaining((prevSeconds: number) => prevSeconds - 1);
      }, 1000);
    };

    if (!isPause) {
      startTimer();
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [isPause, secondsRemaining]);

  return (
    <>
      <p className={styles.timer}>{secondsRemaining}</p>
    </>

    //
  );
};
