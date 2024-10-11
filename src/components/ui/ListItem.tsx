import React, { Suspense, lazy, useMemo } from "react";
import { useRouteNavigator } from "@vkontakte/vk-mini-apps-router";
interface RankingItemProps {
  iconName: string;
  route: string;
  text: string;
  value: string;
}
const iconCache: {
  [key: string]: React.LazyExoticComponent<
    React.ComponentType<Record<string, never>>
  >;
} = {};

export const ListItem: React.FC<RankingItemProps> = ({
  iconName,
  route,
  text,
  value,
}) => {
  const IconComponent = useMemo(() => {
    if (iconCache[iconName]) {
      return iconCache[iconName];
    }
    const Icon = lazy(() => import(`../../assets/icons/${iconName}.svg`));
    iconCache[iconName] = Icon;

    return Icon;
  }, [iconName]);
  const routeNavigator = useRouteNavigator();

  return (
    <div className="w-full">
      <div
        className="flex w-full items-center"
        onClick={route != "" ? () => routeNavigator.push(route) : () => {}}
      >
        <Suspense fallback={<div className="w-8 h-8" />}>
          <div className=" text-black mr-4 my-2 w-8 h-8">
            <IconComponent />
          </div>
        </Suspense>
        <p>{text}</p>
        <p className="ml-auto">{value}</p>
      </div>
    </div>
  );
};
