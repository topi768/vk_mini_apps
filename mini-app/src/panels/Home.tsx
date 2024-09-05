import { FC } from 'react';
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
} from '@vkontakte/vkui';
import { UserInfo } from '@vkontakte/vk-bridge';
import { useRouteNavigator  } from '@vkontakte/vk-mini-apps-router';
import { Icon20RefreshOutline, Icon20ShareExternalAndroid, Icon20ShareOutline, Icon20User, Icon24VoiceOutline } from '@vkontakte/icons';
import styles from './Home.module.css'


export interface HomeProps extends NavIdProps {
  fetchedUser?: UserInfo;
}

export const Home: FC<HomeProps> = ({ id, fetchedUser }) => {
  const routeNavigator = useRouteNavigator();

  return (
    <>

    <Panel id={id}>
      {/* <PanelHeader >


      </PanelHeader> */}
        <Flex justify={'space-between'} className={styles.header}>
          <div className={styles.itemWrapper} >
          <Icon20User/>
          </div>
          <div className={styles.itemWrapper} >
          <Icon20ShareExternalAndroid/>
          </div>
          
          
        </Flex>
        <Button onClick={() => routeNavigator.push('/onboarding')}  className={styles.startBtn}>Начать</Button  >
        <Button className={styles.leaderListBtn}>Топ искателей</Button>
      {/* <Group header={<Header mode="secondary">Navigation Example</Header>}>
        <Div>
          <Button stretched size="l" mode="secondary" onClick={() => routeNavigator.push('persik')}>
            Покажите Персика, пожалуйста!
          </Button>
        </Div>
      </Group> */}
    </Panel>
    </>
  );
};
