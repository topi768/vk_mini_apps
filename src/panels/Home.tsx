import { FC } from 'react'
import React from 'react'

import { Panel, Button, NavIdProps, Flex } from '@vkontakte/vkui'
import { UserInfo } from '@vkontakte/vk-bridge'
import { useRouteNavigator } from '@vkontakte/vk-mini-apps-router'
import { Icon20ShareExternalAndroid, Icon20User } from '@vkontakte/icons'
import styles from './Home.module.css'

export interface HomeProps extends NavIdProps {
  fetchedUser?: UserInfo
}

export const Home: FC<HomeProps> = ({ id }) => {
  const routeNavigator = useRouteNavigator()

  return (
    <>
      <Panel id={id}>
        {/* <PanelHeader >


      </PanelHeader> */}
        <Flex justify={'space-between'} className={styles.header}>
          <div className={styles.itemWrapper}>
            <Icon20User />
          </div>
          <div className={styles.itemWrapper}>
            <Icon20ShareExternalAndroid />
          </div>
        </Flex>
        <div className="hiden">
          <Button
            onClick={() => routeNavigator.push('/gameScreen')}
            className={styles.startBtn}
          >
            Начать
          </Button>
        </div>
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
  )
}
