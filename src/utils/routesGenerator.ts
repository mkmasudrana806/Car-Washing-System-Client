import { TRoute, TUserPaths } from "../types";

// routes generator
const routesGenerator = (paths: TUserPaths[]) => {
  const result = paths.reduce((acc: TRoute[], item) => {
    if ((item.name && item.path) || (item.path && item.element)) {
      acc.push({
        path: item.path,
        element: item.element,
      });
    } else if (item.name && item.index) {
      acc.push({
        index: item.index,
        element: item.element,
      });
    } else if (item.children) {
      item.children.forEach((child) =>
        acc.push({
          path: child.path as string,
          element: child.element,
        })
      );
    }
    return acc;
  }, []);

  return result;
};

export default routesGenerator;
