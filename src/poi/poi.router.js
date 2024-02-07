import { useRoutes } from "react-router-dom";
import CreatePoi from "./pages/create-poi/create-poi.component";
import PageNotFound from "../common/components/page-not-found.component";
import ProtectedRoute from "../common/components/protected-route.component";
import { ROLE } from "../common/constants";
import PoiList from "./pages/list-poi/list-poi.component";
import Poi from "./poi.component";
import ApprovePoi from "./pages/approve-poi/approve-poi.component";

const poiRoutes = [
  {
    path: "/",
    element: <Poi />,
    children: [
      {
        index: true,
        element: <PoiList />,
      },
      {
        path: "create",
        element: (
          <ProtectedRoute
            roles={[ROLE.CONTRIBUTOR, ROLE.AUTH_CONTRIBUTOR, ROLE.CURATORE]}
          >
            <CreatePoi />
          </ProtectedRoute>
        ),
      },
      {
        path: "approve",
        element: (
          <ProtectedRoute roles={[ROLE.CURATORE]}>
            <ApprovePoi />
          </ProtectedRoute>
        ),
      },
      {
        path: "*",
        element: <PageNotFound />,
      },
    ],
  },
];

const PoiRouter = () => useRoutes(poiRoutes);

export default PoiRouter;
