import { FC, useState, useEffect, useRef } from 'react';
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
  SplitLayout

} from '@vkontakte/vkui';
import { UserInfo } from '@vkontakte/vk-bridge';
import { useRouteNavigator } from '@vkontakte/vk-mini-apps-router';
import { Icon20Pause, Icon20RefreshOutline, Icon20ShareExternalAndroid, Icon20ShareOutline, Icon20User, Icon24VoiceOutline } from '@vkontakte/icons';
import styles from './Game.module.css'
import { TimerReverse } from '../components/TimerReverse';
import { PrestartModal } from '../components/PrestartModal';
import axios from 'axios';

export interface OnboardingProps extends NavIdProps {
  fetchedUser?: UserInfo;
}

export const GameScreen: FC<OnboardingProps> = ({ id, fetchedUser }) => {
const routeNavigator = useRouteNavigator();
const [countHints, setCountHints] = useState(3);
const [isHindBtnDisabled, setIsHindBtnDisabled]= useState(false);

const [posHintCircleX, setPosHintCircleX]= useState(120);
const [posHintCircleY, setPosHintCircleY]= useState(130);
const [radiusHintCircle, setRadiusHintCircle]= useState(0);
const [isDisplayHint, setIsDisplayHint]= useState(false);
const [isOpenPrestartModal, setIsOpenPrestartModal]= useState(false);
const [isOpenPausetModal, setIsOpenPauseModal]= useState(false);


const stepSizeCircle = useRef(80)

const handleClickHint = () => {
  setCountHints(countHints - 1)
  if (countHints - 1 <= 0) {
    setIsHindBtnDisabled(true)
  }
  
  setIsDisplayHint(true)
  setRadiusHintCircle(countHints * stepSizeCircle.current)
  setPosHintCircleX(stepSizeCircle.current / 2 + posHintCircleX)
  setPosHintCircleY(stepSizeCircle.current/ 2 + posHintCircleY)

};


const [isPause, setIsPause]= useState(false);
const [secondsRemaining, setSecondsRemaining] = useState(30);

// const fetchCat = async () => {
//   axios.get('https://showtime.app-dich.com/api/findcat/')
//   .then(res => {
//     console.log(res.data);
    
//   }).catch(err => {
//     console.log(err);
    
//   })

// };

fetchCat()
  useEffect(() => {
    let intervalId: number | undefined
    const startTimer = () => {
      intervalId = setInterval(() => {
        if (isPause || secondsRemaining <= 0) {
          clearInterval(intervalId);
          return;
        }
    
        setSecondsRemaining(prevSeconds => prevSeconds - 1);
      }, 1000);
      
    };
  
    if (!isPause ) {
      startTimer();
    }
  
    return () => {
      clearInterval(intervalId);
    };
  }, [isPause, secondsRemaining]);
  
const handleClickPause = () => { 
  setIsPause(true);
  setIsOpenPauseModal(true)
};
  
const handleClosePauseModel = () => {
  setIsOpenPauseModal(false)
  setIsOpenPrestartModal(true)
}

const handleEndTimer = () => {}
const hintCircleCSS = {
  transform: `translate(${posHintCircleX}px, ${posHintCircleY}px)`, 
  width: radiusHintCircle + 'px', 
  height: radiusHintCircle + 'px', 
  display: isDisplayHint ? 'block': 'none'
}



  const modalPauseElement = (
    <ModalRoot activeModal= 'pause'  >
      
      <ModalPage  style={{minHeight: '200px'}}   id="pause" dynamicContentHeight hideCloseButton>
      <div className={styles.pauseWrapperModal}>
        <h3 className={styles.pauseTitleModal} >Пауза</h3>
        <Button onClick={handleClosePauseModel} className={styles.pauseBtnModal} >Продолжить</Button>
      </div>
        
      </ModalPage>

    </ModalRoot>
  );
  const onClosePrestartModal = () => {
    setIsPause(false)
    setIsOpenPrestartModal(false)
  }
  return (
    <Panel id={id} style={{width: '100%', height: "100%"}} >
 <SplitLayout modal={ !isOpenPausetModal || modalPauseElement } style={{width: '100%', height: '100%'}}>
 </SplitLayout>
    <div style={{display: 'flex', justifyContent: "center", width: '100%', height: '100%'}} >
      <Button style={{maxWidth:' 200px'}} disabled={isHindBtnDisabled}  onClick={handleClickHint} >{countHints} Подсказки </Button>
    </div>
      {/* <div className={styles.timer}> {secondsRemaining} </div> */}
      <TimerReverse isPause={isPause} startTime={30}  onEnd={handleEndTimer}  />

      <Button onClick={handleClickPause} className={styles.pauseBtn}>
        <Icon20Pause></Icon20Pause>
      </Button>  
      <div className={styles.hintCircle} style={hintCircleCSS}></div>
      
      <PrestartModal onClosePrestartModal={onClosePrestartModal} isOpen={isOpenPrestartModal}  />
    </Panel>
  );
};
