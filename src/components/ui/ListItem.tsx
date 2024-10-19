import React from "react";
import { useRouteNavigator } from "@vkontakte/vk-mini-apps-router";
interface RankingItemProps {
  iconName: string;
  route: string;
  text: string;
  value: string;
}

export const ListItem: React.FC<RankingItemProps> = ({
  iconName,
  route,
  text,
  value,
}) => {
  const routeNavigator = useRouteNavigator();

  return (
    <div className="w-full">
      <div
        className="flex w-full items-center"
        onClick={route != "" ? () => routeNavigator.push(route) : () => {}}
      >
        <img
          className="text-black mr-4 my-2 w-8 h-8"
          src={`/src/assets/icons/${iconName}.svg`}
        />

        <p>{text}</p>
        <p className="ml-auto">{value}</p>
      </div>
    </div>
  );
};
