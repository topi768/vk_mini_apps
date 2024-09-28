import { useState, useEffect, ReactNode } from "react";
import { View, SplitLayout, ScreenSpinner } from "@vkontakte/vkui";
import { useActiveVkuiLocation } from "@vkontakte/vk-mini-apps-router";
import bridge, { UserInfo } from "@vkontakte/vk-bridge";
import { Home } from "./panels/Home";
import { GameScreen } from "./panels/GameScreen";
import { Friends } from "./panels/Friends";
import { Friend } from "./panels/Friend";
import { ScoreList } from "./panels/ScoreList";

import { DEFAULT_VIEW_PANELS } from "./routes";

import "./App.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export const App = () => {
  const { panel: activePanel = DEFAULT_VIEW_PANELS.HOME } =
    useActiveVkuiLocation();
  const [, setUser] = useState<UserInfo | undefined>();
  const [, setPopout] = useState<ReactNode | null>(
    <ScreenSpinner size="large" />,
  );

  useEffect(() => {
    if (activePanel == DEFAULT_VIEW_PANELS.HOME) {
      console.log(activePanel);
    }

    async function fetchData() {
      const user = await bridge.send("VKWebAppGetUserInfo");
      setUser(user);
      setPopout(null);
    }
    fetchData();
  }, [activePanel]);

  const queryClient = new QueryClient();

  return (
    <>
      <SplitLayout className="">
        <QueryClientProvider client={queryClient}></QueryClientProvider>
        {/* <SplitCol> */}
        <View activePanel={activePanel}>
          <Home id="home" />
          <GameScreen id="GameScreen" />
          <Friends id="Friends" />
          <Friend id="Friend" />
          <ScoreList id="ScoreList" />
        </View>
        {/* </SplitCol> */}
      </SplitLayout>
    </>
  );
};
