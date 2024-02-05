import { Outlet, useRoutes } from "react-router-dom";
// import Poi from "./poi.component";
import CreatePoi from "./pages/create-poi/create-poi.component";
import PageNotFound from "../common/components/page-not-found.component";
import ProtectedRoute from "../common/components/protected-route.component";
import { ROLE } from "../common/constants";

const poiRoutes = [
    {
        path: '/',
        element: <Outlet />,
        children: [
            {
                path: "create",
                element: <ProtectedRoute roles={[ROLE.CONTRIBUTOR, ROLE.AUTH_CONTRIBUTOR, ROLE.CURATORE]}><CreatePoi /></ProtectedRoute>
            },
            {
                path:"*",
                element: <PageNotFound />
            }
        ]
    }
];

const AuthRouter = () => useRoutes(poiRoutes);

export default AuthRouter;