import IconTop from "@/assets/icons/top.svg";
import IconAchievements from "@/assets/icons/achievements.svg";
import IconBalance from "@/assets/icons/balance.svg";
import IconFriends from "@/assets/icons/friends.svg";
import { useRouteNavigator } from "@vkontakte/vk-mini-apps-router";
import { Avatar } from "../components/Avatar";

interface FooterProps {
  className?: string;
}

export const Footer: React.FC<FooterProps> = ({ className }) => {
  const routeNavigator = useRouteNavigator();

  return (
    <>
      <div className={className}>
        <footer className=" w-full flex align-center text-[10px] absolute bottom-4 left-0">
          <nav className="w-full h-full flex justify-between items-center">
            <div className="relative  ">
              <IconBalance className="text-black w-8 h-8" />
              <p className="text-nowrap absolute left-1/2 -translate-x-1/2">
                Кис-Кисы
              </p>
            </div>
            <div className="relative  ">
              <IconAchievements className="text-black  w-8 h-8" />
              <p className="absolute left-1/2 -translate-x-1/2">Достижения</p>
            </div>
            <Avatar />
            <div
              className="relative  "
              onClick={() => routeNavigator.push("/Friends")}
            >
              <IconFriends className="text-blackw-8 h-8" />
              <p className="absolute left-1/2 -translate-x-1/2">Друзья</p>
            </div>
            <div
              className="relative  "
              onClick={() => routeNavigator.push("/ScoreList")}
            >
              <IconTop className="text-black w-8 h-8" />
              <p className="absolute left-1/2 -translate-x-1/2">Топ</p>
            </div>
          </nav>
        </footer>
      </div>
    </>
  );
};
