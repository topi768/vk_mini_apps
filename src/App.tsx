import { useState, useEffect, ReactNode } from "react";
import { View, SplitLayout, SplitCol, ScreenSpinner } from "@vkontakte/vkui";
import { useActiveVkuiLocation } from "@vkontakte/vk-mini-apps-router";
import bridge, { UserInfo } from "@vkontakte/vk-bridge";
import { Home, GameScreen } from "./panels";
import { DEFAULT_VIEW_PANELS } from "./routes";

import "./App.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useGetHealth } from "./hooks/useGetHealth";

export const App = () => {
  const { panel: activePanel = DEFAULT_VIEW_PANELS.HOME } =
    useActiveVkuiLocation();
  const [, setUser] = useState<UserInfo | undefined>();
  const [, setPopout] = useState<ReactNode | null>(
    <ScreenSpinner size="large" />,
  );

  useEffect(() => {
    async function fetchData() {
      const user = await bridge.send("VKWebAppGetUserInfo");
      setUser(user);
      setPopout(null);
    }
    fetchData();
  }, []);

  const queryClient = new QueryClient();

  return (
    <SplitLayout>
      <QueryClientProvider client={queryClient}>
        {/* <Example /> */}
      </QueryClientProvider>
      <SplitCol>
        <View activePanel={activePanel}>
          <Home id="home" />
          <GameScreen id="GameScreen" />
        </View>
      </SplitCol>
    </SplitLayout>
  );
};

function Example() {
  const { isPending, error, data } = useGetHealth();

  if (isPending) return "Loading...";

  if (error) return "An error has occurred: " + error.message;
  console.log(data);

  return (
    <div>
      <h1>{data}</h1>
    </div>
  );
}
