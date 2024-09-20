import { FC } from "react";

import { Panel, NavIdProps } from "@vkontakte/vkui";
import { UserInfo } from "@vkontakte/vk-bridge";
import { useRouteNavigator } from "@vkontakte/vk-mini-apps-router";
import LargeButton from "../components/ui/buttons/LargeButton";
import { Header } from "../components/Header";

export interface HomeProps extends NavIdProps {
  fetchedUser?: UserInfo;
}

export const Home: FC<HomeProps> = ({ id }) => {
  const routeNavigator = useRouteNavigator();

  return (
    <>
      <Panel id={id}>
        <Header text="Меню" />
        <div>
          <div>
            <LargeButton
              text={"Друзья"}
              onClick={() => routeNavigator.push("/Friends")}
            />
          </div>
          <LargeButton
            className="absolute bottom-1 left-1/2 -translate-x-1/2 "
            text={"Начать"}
            onClick={() => routeNavigator.push("/gameScreen")}
          />
        </div>
      </Panel>
    </>
  );
};
