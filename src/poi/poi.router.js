import { Outlet, useRoutes } from "react-router-dom";
// import Poi from "./poi.component";
import CreatePoi from "./pages/create-poi/create-poi.component";

const poiRoutes = [
    {
        path: '/',
        element: <Outlet />,
        children: [
            {
                path: "create",
                element: <CreatePoi />
            }
        ]
    }
];

const AuthRouter = () => useRoutes(poiRoutes);

export default AuthRouter;