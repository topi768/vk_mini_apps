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
import { TimerReverse } from "./TimerReverse";
import { createPortal } from "react-dom";
const portal = document.getElementById("portal");
import styles from "./PrestartModal.module.css";

export const PrestartModal = ({ isOpen, onClosePrestartModal }) => {
  const handleEndTimer = () => {
    onClosePrestartModal();
  };

  if (isOpen) {
    return createPortal(
      <div className={styles.overlay}>
        <div className={styles.prestartModal}>
          <p>СТАРТ ЧЕРЕЗ</p>
          <TimerReverse isPause={false} startTime={3} onEnd={handleEndTimer} />
        </div>
      </div>,

      portal,
    );
  }

  // return (

  //   //
  // );
};
