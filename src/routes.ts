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
  FRIENDS: "Frieends",
} as const;

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
        DEFAULT_VIEW_PANELS.FRIENDS,
        `/${DEFAULT_VIEW_PANELS.FRIENDS}`,
        [],
      ),
    ]),
  ]),
]);

export const router = createHashRouter(routes.getRoutes());
