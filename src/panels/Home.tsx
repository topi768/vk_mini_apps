import { FC, useState } from "react";

import { Panel, NavIdProps } from "@vkontakte/vkui";
import { UserInfo } from "@vkontakte/vk-bridge";
import { useRouteNavigator } from "@vkontakte/vk-mini-apps-router";
import LargeButton from "../components/ui/buttons/LargeButton";
import { Header } from "../components/Header";
import { Spacing } from "../components/ui/Spacing";
import AchievementsIcon from "@/assets/icons/achievements.svg";

export interface HomeProps extends NavIdProps {
  fetchedUser?: UserInfo;
}

export const Home: FC<HomeProps> = ({ id }) => {
  const routeNavigator = useRouteNavigator();
  const [balance, setBalance] = useState(5);

  return (
    <>
      <Panel id={id}>
        <Header text="Меню" />
        <Spacing />
        <div className="w-full relative">
          <div className="flex  w-full items-center">
            <img
              className="text-black m-4  my-3 w-8 h-8"
              src=".\src\assets\icons\Name=kiskis.svg"
              alt=""
            />
            <p>Баланс</p>
          </div>
          <div className="flex items-center absolute right-0 top-1/2 -translate-y-1/2">
            <p className="text-grey">{balance} кис-кисов</p>
            <img
              src=".\src\assets\icons\ChevronRight.svg"
              className="w-8 h-6 text-grey pointer"
            />
          </div>
        </div>
        <div className="w-full">
          <div className="flex w-full items-center">
            <AchievementsIcon className="text-black m-4  w-8 h-8" />
            <p>Достижения</p>
          </div>
        </div>
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
