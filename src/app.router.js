import { useRoutes } from "react-router-dom";
import Home from "./home/home.component";
import Layout from "./layout/layout.component";
import PoiRouter from "./poi/poi.router";
import PageNotFound from "./common/components/page-not-found.component";

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
                path: "poi/*",
                element: <PoiRouter />
            },
            {
                path:"*",
                element: <PageNotFound />
            }
        ]
    },

];

const AppRouter = () => useRoutes(appRoutes);

export default AppRouter;