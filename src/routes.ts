import {
  createHashRouter,
  createPanel,
  createRoot,
  createView,
  RoutesConfig,
} from "@vkontakte/vk-mini-apps-router";

export const DEFAULT_ROOT = "default_root";

export const DEFAULT_VIEW = "default_view";

export const DEFAULT_VIEW_PANELS = {
  HOME: "home",
  GAMESCREEN: "GameScreen",
  FRIENDS: "Friends",
  FRIEND: "Friend",
  SCORELIST: "ScoreList",
} as const;

const PARAMETER_ROUTE = "/friend/:id";

export const routes = RoutesConfig.create([
  createRoot(DEFAULT_ROOT, [
    createView(DEFAULT_VIEW, [
      createPanel(DEFAULT_VIEW_PANELS.HOME, "/", []),
      createPanel(
        DEFAULT_VIEW_PANELS.GAMESCREEN,
        `/${DEFAULT_VIEW_PANELS.GAMESCREEN}`,
        [],
      ),
      createPanel(
        DEFAULT_VIEW_PANELS.SCORELIST,
        `/${DEFAULT_VIEW_PANELS.SCORELIST}`,
        [],
      ),
      createPanel(
        DEFAULT_VIEW_PANELS.FRIENDS,
        `/${DEFAULT_VIEW_PANELS.FRIENDS}`,
        [],
      ),
      createPanel(DEFAULT_VIEW_PANELS.FRIEND, PARAMETER_ROUTE, []),
    ]),
  ]),
]);

export const router = createHashRouter(routes.getRoutes());
