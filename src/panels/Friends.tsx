import { FC, useState, useRef } from "react";
import {
  Panel,
  Button,
  Div,
  NavIdProps,
  ModalRoot,
  ModalPage,
  SplitLayout,
} from "@vkontakte/vkui";
import { UserInfo } from "@vkontakte/vk-bridge";
import { Icon20Pause } from "@vkontakte/icons";
import { TimerReverse } from "../components/GameScreen/TimerReverse";
import { PrestartModal } from "../components/GameScreen/PrestartModal";
import { HintBtn } from "../components/GameScreen/HintBtn";
import { PauseBtn } from "../components/GameScreen/PauseBtn";
import { Header } from "../components/Header";
import { useRouteNavigator } from "@vkontakte/vk-mini-apps-router";
import { Spacing } from "../components/ui/Spacing";

export interface FriendsProps extends NavIdProps {
  fetchedUser?: UserInfo;
}

export const Friends: FC<FriendsProps> = ({ id }) => {
  const routeNavigator = useRouteNavigator();
  interface Friend {
    name: string;
    avatar: string;
    rank: string;
  }
  const [friendsList, setFriendsList] = useState<Friend[]>([
    // {
    //   name: "Владимир Котов",
    //   avatar: "src/assets/base/avatar.svg",
    //   rank: "Сержант Кискисенко",
    // },
    // {
    //   name: "Владимир Котов",
    //   avatar: "src/assets/base/avatar.svg",
    //   rank: "Сержант Кискисенко",
    // },
    // {
    //   name: "Владимир Котов",
    //   avatar: "src/assets/base/avatar.svg",
    //   rank: "Сержант Кискисенко",
    // },
  ]);

  return (
    <>
      <Panel id={id} className="w-full h-full">
        <Header text="Друзья" />
        <Spacing />

        {friendsList.length > 0 ? ( // Проверяем длину массива
          friendsList.map((friend) => (
            <div>
              <div className="flex my-3 ">
                <img className="mr-2" src={friend.avatar} alt="" />
                <div className="flex flex-col  gap-2">
                  <h3 className=" text-[1.0625rem] mt-3 font-bold leading-[1.375rem]">
                    {friend.name}
                  </h3>
                  <p className=" text-[#8484f0] leading-[1.125rem]">
                    {friend.rank}
                  </p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="w-full h-full flex justify-center items-center">
            <div>
              <p className="text-center">Ваши друзья не в тусовке.</p>
              <p className="text-center">Исправим?</p>
            </div>
          </div>
        )}
      </Panel>
    </>
  );
};
