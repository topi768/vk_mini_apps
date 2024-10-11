import React, { Suspense, lazy } from "react";
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
  const IconComponent = lazy(
    () => import(`../../assets/icons/${iconName}.svg`),
  );
  const routeNavigator = useRouteNavigator();

  return (
    <div className="w-full">
      <div
        className="flex w-full items-center"
        onClick={() => routeNavigator.push(route)}
      >
        <Suspense fallback={<div className="w-8 h-8" />}>
          <IconComponent className="text-black mr-4 my-2 w-8 h-8" />
        </Suspense>
        <p>{text}</p>
        <p className="ml-auto">{value}</p>
      </div>
    </div>
  );
};
