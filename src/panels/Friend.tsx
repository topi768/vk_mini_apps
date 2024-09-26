import { FC } from "react";
import { Panel, NavIdProps } from "@vkontakte/vkui";
import { UserInfo } from "@vkontakte/vk-bridge";
import { Header } from "../components/Header";
import { Spacing } from "../components/ui/Spacing";
import IconSearch from "@/assets/icons/search.svg";
import IconAchievement from "@/assets/icons/achievements.svg";
import { Avatar } from "../components/Avatar";

export interface FriendProps extends NavIdProps {
  fetchedUser?: UserInfo;
}

export const Friend: FC<FriendProps> = ({ id }) => {
  return (
    <Panel id={id} className="w-full h-fullx">
      <div className="w-full h-full">
        <div className="px-6">
          <Header text="Друзья" />
          <Spacing />
          <div className="">
            <div className="flex relative my-7 ">
              <Avatar className="mr-6" />
              <div className="h-full flex flex-col  gap-2">
                <h3 className=" text-[1.0625rem] mt-3 font-bold leading-[1.375rem]">
                  {"Владимир Котов"}
                </h3>
                <p className=" text-[#8484f0] leading-[1.125rem]">
                  {"Сержант Кискисенко "}
                </p>
              </div>
            </div>
          </div>
          <Spacing />
          <div className="flex m-3 items-center">
            <IconSearch />
            <p className="ml-3">Найдено котиков</p>
            <span className="ml-auto">{256}</span>
          </div>
          <div className="flex m-3 items-center">
            <IconAchievement />
            <p className="ml-3">Найдено котиков</p>
            <span className="ml-auto">{5}</span>
          </div>
        </div>
      </div>
    </Panel>
  );
};
