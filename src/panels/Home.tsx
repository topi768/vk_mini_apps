import { FC } from "react";

import { Panel, NavIdProps } from "@vkontakte/vkui";
import { UserInfo } from "@vkontakte/vk-bridge";
import { useRouteNavigator } from "@vkontakte/vk-mini-apps-router";
import { LargeButton } from "../components/ui/buttons/LargeButton";
import { Header } from "../components/Header";
import { Spacing } from "../components/ui/Spacing";
import IconScore from "@/assets/icons/score.svg";
import IconTop from "@/assets/icons/top.svg";
import IconSearch from "@/assets/icons/search.svg";
import { Avatar } from "../components/Avatar";
import { Footer } from "../components/Footer";
import { TimerReverse } from "../components/TimerReverse";

export interface HomeProps extends NavIdProps {
  fetchedUser?: UserInfo;
}

export const Home: FC<HomeProps> = ({ id }) => {
  const routeNavigator = useRouteNavigator();

  return (
    <>
      <Panel id={id} className="px-6">
        <Header text="Меню" />

        <div className="px-6">
          <Spacing />
          <div>
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
          <div>
            <div className="w-full">
              <div
                className="flex w-full items-center"
                onClick={() => routeNavigator.push("/Friends")}
              >
                <IconScore className="text-black mr-4 my-4  w-8 h-8" />
                <p>Счет</p>
                <p className="ml-auto">{"2 005 568"}</p>
              </div>
            </div>
            <div className="w-full">
              <div
                className="flex w-full items-center"
                onClick={() => routeNavigator.push("/Friends")}
              >
                <IconTop className="text-black mr-4 my-4  w-8 h-8" />
                <p>Место в рейтинге</p>
                <p className="ml-auto">{25}</p>
              </div>
            </div>
            <div className="w-full">
              <div
                className="flex w-full items-center"
                onClick={() => routeNavigator.push("/Friends")}
              >
                <IconScore className="text-black mr-4 my-4  w-8 h-8" />
                <p>Найдено котиков</p>
                <p className="ml-auto">{256}</p>
              </div>
            </div>
            <div className="w-full">
              <div
                className="flex w-full items-center"
                onClick={() => routeNavigator.push("/Achievements")}
              >
                <IconSearch className="text-black mr-4 my-4  w-8 h-8" />
                <p>Открыто достижений</p>
                <p className="ml-auto">{5}</p>
              </div>
            </div>
            <LargeButton
              className=""
              text={"Играть за 10 кис-кисов"}
              onClick={() => routeNavigator.push("/gameScreen")}
            />
            <div className="flex justify-center text-primary">
              <p>или через </p>
              <TimerReverse
                isPause={false}
                startTime={86400}
                onEnd={() => {
                  console.log("1");
                }}
                className="ml-3"
              />
            </div>
          </div>
          <Footer />
        </div>
      </Panel>
    </>
  );
};
