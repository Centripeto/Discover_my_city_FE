import { useRoutes } from "react-router-dom";
import Authentication from "./authentication.component";
import Login from "./pages/login/login.component";

const authRoutes = [
    {
        path: '/',
        element: <Authentication />,
        children: [
            {
                path: "/login",
                element: <Login />
            }
        ]
    }
];

const AuthRouter = () => useRoutes(authRoutes);

export default AuthRouter;