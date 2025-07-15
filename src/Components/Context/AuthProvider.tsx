import axios from "axios";
import { createContext, useState } from "react";
import type { ReactNode } from "react";

// Define the shape of the user
interface User {
  id: number | null;
  username: string;
  email: string;
}

// Define the shape of authorization
interface AuthContextType {
  user: User | null;
  accessToken: string | null;
  login: (accessToken: string) => Promise<void>;
  logout: () => void;
  verifyUser: (accessToken: string) => Promise<void>;
}

// Create context that defaults to null if AuthContextType does not exist
const AuthContext = createContext<AuthContextType | null>(null);

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);

  const verifyUser = async (token: string) => {
    try {
      const response = await axios.get("http://localhost:3000/auth", {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });

      setAccessToken(token);
      setUser(response.data.user);
    } catch (error) {
      console.error("Could not verify user.", error);

      setAccessToken(null);
      setUser(null);
    }
  };

  const login = async (token: string) => {
    await verifyUser(token);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, accessToken, verifyUser, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
