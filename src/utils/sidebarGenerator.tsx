import { NavLink } from "react-router-dom";
import { TSidebarItem, TUserPaths } from "../types";

/**
 * ------------ dynamic sidebar items generator --------------
 * @param paths paths common array of object
 * @param role user role
 * @returns return sidebar items array
 */
const sidebarGenerator = (paths: TUserPaths[], role: string) => {
  const result = paths.reduce((acc: TSidebarItem[], item) => {
    if (item.name && item.path) {
      acc.push({
        key: item.name,
        label: <NavLink to={`/${role}/${item.path}`}>{item.name}</NavLink>,
      });
    } else if (item?.children) {
      acc.push({
        key: item.name!,
        label: item.name,
        children: item.children.map((child) => ({
          key: child.name!,
          label: <NavLink to={`/${role}/${child.path}`}>{child.name}</NavLink>,
        })),
      });
    }

    return acc;
  }, []);

  return result;
};

export default sidebarGenerator;
