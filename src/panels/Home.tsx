import { FC } from "react";

import { Panel, Button, NavIdProps, Flex } from "@vkontakte/vkui";
import { UserInfo } from "@vkontakte/vk-bridge";
import { useRouteNavigator } from "@vkontakte/vk-mini-apps-router";
import { Icon20ShareExternalAndroid, Icon20User } from "@vkontakte/icons";

export interface HomeProps extends NavIdProps {
  fetchedUser?: UserInfo;
}

export const Home: FC<HomeProps> = ({ id }) => {
  const routeNavigator = useRouteNavigator();

  return (
    <>
      <Panel id={id}>
        {/* <PanelHeader >

      </PanelHeader> */}
        <Flex justify={"space-between"} className="mx-8 my-8">
          <div className="p-3 text-black bg-gray-300 cursor-pointer">
            <Icon20User />
          </div>
          <div className="p-3 text-black bg-gray-300 cursor-pointer">
            <Icon20ShareExternalAndroid />
          </div>
        </Flex>
        <div>
          <Button
            onClick={() => routeNavigator.push("/gameScreen")}
            className="p-3 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-inter font-medium text-4xl leading-tight"
          >
            Начать
          </Button>
        </div>
        <Button className="font-inter font-medium text-4xl leading-tight text-black p-3 absolute bottom-0 left-1/2 -translate-x-1/2">
          Топ искателей
        </Button>
        {/* <Group header={<Header mode="secondary">Navigation Example</Header>}>
        <Div>
          <Button stretched size="l" mode="secondary" onClick={() => routeNavigator.push('persik')}>
            Покажите Персика, пожалуйста!
          </Button>
        </Div>
      </Group> */}
      </Panel>
    </>
  );
};
