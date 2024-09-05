import { useState, useEffect, ReactNode } from 'react';
 import { View, SplitLayout, SplitCol, ScreenSpinner } from '@vkontakte/vkui';
import { useActiveVkuiLocation } from '@vkontakte/vk-mini-apps-router';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

import { Home, GameScreen } from './panels';
import { DEFAULT_VIEW_PANELS } from './routes';

import "./App.css"
export const App = () => {
  const { panel: activePanel = DEFAULT_VIEW_PANELS.HOME } = useActiveVkuiLocation();
  const [fetchedUser, setUser] = useState<UserInfo | undefined>();
  const [popout, setPopout] = useState<ReactNode | null>(<ScreenSpinner size="large" />);

  // useEffect(() => {
  //   async function fetchData() {
  //     const user = await bridge.send('VKWebAppGetUserInfo');
  //     setUser(user);
  //     setPopout(null);
  //   }
  //   fetchData();
  // }, []);

  return (
    <SplitLayout>
      <SplitCol>
        <View activePanel={activePanel}>
          <Home id="home"/>
          <GameScreen id="GameScreen" />

        </View>
      </SplitCol>
    </SplitLayout>
  );
};
