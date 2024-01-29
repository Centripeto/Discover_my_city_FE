import { useRoutes } from "react-router-dom";
import Home from "./home/home.component";
import Layout from "./layout/layout.component";
import AuthRouter from "./authentication/autentication.router";

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
                path: "auth/*",
                element: <AuthRouter />
            },
        ]
    }
];

const AppRouter = () => useRoutes(appRoutes);

export default AppRouter;