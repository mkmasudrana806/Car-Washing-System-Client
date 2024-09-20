import { ReactNode } from "react";

// each route
export type TRoute = {
  path?: string;
  index?: boolean;
  element: ReactNode;
};

// each sidebar item
export type TSidebarItem = {
  key: string;
  label: ReactNode;
  children?: TSidebarItem[];
};

// paths
export type TUserPaths = {
  name?: string;
  path?: string;
  index?: boolean;
  element?: ReactNode;
  children?: TUserPaths[];
};
