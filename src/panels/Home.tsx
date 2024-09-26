import { FC, useState } from "react";

import { Panel, NavIdProps } from "@vkontakte/vkui";
import { UserInfo } from "@vkontakte/vk-bridge";
import { useRouteNavigator } from "@vkontakte/vk-mini-apps-router";
import LargeButton from "../components/ui/buttons/LargeButton";
import { Header } from "../components/Header";
import { Spacing } from "../components/ui/Spacing";
import IconTop from "@/assets/icons/top.svg";
import IconAchievements from "@/assets/icons/achievements.svg";
import IconBalance from "@/assets/icons/balance.svg";
import IconFriends from "@/assets/icons/friends.svg";
import IconInvite from "@/assets/icons/invite.svg";
import IconSettings from "@/assets/icons/settings.svg";
import IconHelp from "@/assets/icons/help.svg";
import ChevronRight from "@/assets/icons/chevronRight.svg";
import { Avatar } from "../components/Avatar";

export interface HomeProps extends NavIdProps {
  fetchedUser?: UserInfo;
}

export const Home: FC<HomeProps> = ({ id }) => {
  const routeNavigator = useRouteNavigator();
  const [balance] = useState(5);

  return (
    <>
      <Panel id={id} className="px-6">
        {/* <Avatar /> */}
        <Header text="Меню" />
        <Spacing />
        <div className="px-6">
          <div className="w-full flex">
            <div className="flex  w-full items-center">
              <IconBalance className="text-black mr-4 my-4  my-3 w-8 h-8" />
              <p>Баланс</p>
            </div>
            <div className=" flex items-center flex-nowrap ">
              <p className="text-grey whitespace-nowrap">{balance} кис-кисов</p>
              <ChevronRight className="w-2 h-3 ml-4 text-grey pointer" />
            </div>
          </div>
          <div className="w-full">
            <div className="flex w-full items-center">
              <IconAchievements className="text-black mr-4 my-4  w-8 h-8" />
              <p>Достижения</p>
              <ChevronRight className="w-2 h-3  ml-auto text-grey pointer" />
            </div>
          </div>
          <Spacing />
          <div className="w-full">
            <div
              className="flex w-full items-center"
              onClick={() => routeNavigator.push("/ScoreList")}
            >
              <IconTop className="text-black mr-4 my-4  w-8 h-8" />
              <p>Топ 5 искателей</p>
              <ChevronRight className="w-2 h-3  ml-auto text-grey pointer" />
            </div>
          </div>
          <div>
            <div className="w-full">
              <div
                className="flex w-full items-center"
                onClick={() => routeNavigator.push("/Friends")}
              >
                <IconFriends className="text-black mr-4 my-4  w-8 h-8" />
                <p>Друзья</p>
                <ChevronRight className="w-2 h-3  ml-auto text-grey pointer" />
              </div>
            </div>
            <div className="w-full">
              <div
                className="flex w-full items-center"
                onClick={() => routeNavigator.push("/Friends")}
              >
                <IconInvite className="text-black mr-4 my-4  w-8 h-8" />
                <p>Пригласить</p>
                <ChevronRight className="w-2 h-3  ml-auto text-grey pointer" />
              </div>
            </div>
            <Spacing />
            <div className="w-full">
              <div
                className="flex w-full items-center"
                onClick={() => routeNavigator.push("/Friends")}
              >
                <IconSettings className="text-black mr-4 my-4  w-8 h-8" />
                <p>Настройки</p>
                <ChevronRight className="w-2 h-3  ml-auto text-grey pointer" />
              </div>
            </div>
            <div className="w-full">
              <div
                className="flex w-full items-center"
                onClick={() => routeNavigator.push("/Friends")}
              >
                <IconHelp className="text-black mr-4 my-4  w-8 h-8" />
                <p>Помощь</p>
                <ChevronRight className="w-2 h-3  ml-auto text-grey pointer" />
              </div>
            </div>
            <LargeButton
              className="absolute bottom-1 left-1/2 -translate-x-1/2 "
              text={"Начать"}
              onClick={() => routeNavigator.push("/gameScreen")}
            />
          </div>
        </div>
      </Panel>
    </>
  );
};
