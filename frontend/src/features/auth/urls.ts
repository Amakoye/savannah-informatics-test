import { joinPaths } from "utils/navigation";

const root = "/auth/" as const;

const authUrls = {
  root: () => root,
  login: () => joinPaths(root, "login"),
  register: () => joinPaths(root, "register"),
} as const;

export { authUrls };
