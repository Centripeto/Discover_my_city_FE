import { useContext, createContext, useState } from "react";
import { login as loginApi, whoami } from "../api/authentication";
const AuthContext = createContext({ toggleColorMode: () => {} });

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("whoami")) || null
  );

  const [accessToken, setAccesToken] = useState(
    localStorage.getItem("accessToken") || ""
  );
  const [refreshToken, setRefreshToken] = useState(
    localStorage.getItem("refreshToken") || ""
  );

  const login = async ({ username, password }) => {
    const response = await loginApi({ password, username });
    if (response) {
      const user = await whoami({ token: response.accessToken });
      setUser(user);
      setAccesToken(response.accessToken);
      setRefreshToken(response.refreshToken);
      localStorage.setItem("accessToken", response.accessToken);
      localStorage.setItem("refreshToken", response.refreshToken);
      localStorage.setItem("user", JSON.stringify(user));
    }
  };

  const logout = () => {
    setAccesToken(null);
    setRefreshToken(null);
    setUser(null);
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider
      value={{ refreshToken, accessToken, login, logout, user }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};
