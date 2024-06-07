import config from "../config";
import EmptyLayout from "../layout/EmptyLayout";
import HomePage from "../pages/Home";
import SudokuPage from "../pages/Sudoku";

const publicRoutes = [
  {
    path: config.routes.root,
    component: SudokuPage,
    layout: EmptyLayout,
    title: "Home Page",
  },
  // {
  //   path: config.routes.sudoku,
  //   component: SudokuPage,
  //   layout: EmptyLayout,
  //   title: "Sudoku Page",
  // },
];

const privateRoutes = [
  // {
  //   path: config.routes.dashboard,
  //   component: HomePage,
  //   layout: EmptyLayout,
  //   title: "Title",
  //   roles: ["STAFF", "MANAGER"],
  // },
];

export { publicRoutes, privateRoutes };
