import axios from "axios";

export const instance = axios.create({
  baseURL: "https://fc.nxt.zbc.su/",
  timeout: 3000,
  headers: {
    authorization: `Bearer ${window.location.search?.replace("?", "") || ""}`,
  },
});

export const apiUrls = {
  admin: {
    login: "/admin/api/auth/login", //post
  },
  user: {
    data: "/api/findcat/rating/top5", //get
  },
  rating: {
    top5: "/api/findcat/rating/top5", //get
  },
  game: {
    lvls: "/api/findcat/game/lvls", //get
  },
} as const;
