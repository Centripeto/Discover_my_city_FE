import { useRoutes } from "react-router-dom";
import PageNotFound from "../common/components/page-not-found.component";
import ProtectedRoute from "../common/components/protected-route.component";
import { ROLE } from "../common/constants";
import Municipality from "./municipality.component";
import CreateMunicipality from "./pages/create-municipality/create-municipality.component";

const municipalityRoutes = [
    {
      path: "/",
      element: <Municipality />,
      children: [
        {
          path: "create",
          element: (
            <ProtectedRoute
              roles={[ROLE.ADMIN]}
            >
              <CreateMunicipality />
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
  
  const MunicipalityRouter = () => useRoutes(municipalityRoutes);
  
  export default MunicipalityRouter;
  