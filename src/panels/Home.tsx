import { FC } from "react";
import { Panel, NavIdProps } from "@vkontakte/vkui";
import { UserInfo } from "@vkontakte/vk-bridge";
import { useRouteNavigator } from "@vkontakte/vk-mini-apps-router";
import { LargeButton } from "../components/ui/buttons/LargeButton";
import { Header } from "../components/Header";
import { Spacing } from "../components/ui/Spacing";
import { Avatar } from "../components/Avatar";
import { Footer } from "../components/Footer";
import { TimerReverse } from "../components/TimerReverse";
import { ListItem } from "../components/ui/ListItem";

export interface HomeProps extends NavIdProps {
  fetchedUser?: UserInfo;
}

export const Home: FC<HomeProps> = ({ id }) => {
  const routeNavigator = useRouteNavigator();

  const rankingData = [
    {
      iconName: "score",
      route: "/Friends",
      text: "Счет",
      value: "2 005 568",
    },
    {
      iconName: "top",
      route: "/Friends",
      text: "Место в рейтинге",
      value: "25",
    },
    {
      iconName: "score",
      route: "/Friends",
      text: "Найдено котиков",
      value: "256",
    },
    {
      iconName: "achievements",
      route: "/Achievements",
      text: "Открыто достижений",
      value: "5",
    },
  ];

  return (
    <>
      <Panel id={id} className="px-6">
        <Header text="Меню" />

        <div className="px-6">
          <Spacing />
          <div>
            <div className="flex relative my-7 ">
              <Avatar className="mr-6" />
              <div className="h-full flex flex-col gap-2">
                <h3 className="text-[1.0625rem] mt-3 font-bold leading-[1.375rem]">
                  {"Владимир Котов"}
                </h3>
                <p className="text-[#8484f0] leading-[1.125rem]">
                  {"Сержант Кискисенко "}
                </p>
              </div>
            </div>
          </div>

          <Spacing />
          <div>
            {rankingData.map((item, index) => (
              <ListItem
                key={index}
                iconName={item.iconName}
                route={item.route}
                text={item.text}
                value={item.value}
              />
            ))}

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
