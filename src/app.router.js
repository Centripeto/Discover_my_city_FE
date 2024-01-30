import { useRoutes } from "react-router-dom";
import Home from "./home/home.component";
import Layout from "./layout/layout.component";
import AuthRouter from "./authentication/autentication.router";
import Poi from "./poi/poi.component";

const appRoutes = [
    {
        path: '/',
        element: <Layout />,
        children: [
            {
                index: true,
                element: <Home />
            },
            {
                path: "poi/",
                element: <Poi />
            },
            {
                path: "auth/*",
                element: <AuthRouter />
            },
        ]
    }
];

const AppRouter = () => useRoutes(appRoutes);

export default AppRouter;