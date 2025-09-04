import axios from "axios";
import { createContext, useState } from "react";
import type { ReactNode } from "react";

const base_url = "api";

// Define the shape of the user

// IMPORTANT TODO: Figure out if putting hashed_pw or refresh_token in user's shape would compromise users during production!!
interface User {
  id: number | null;
  username: string;
  email: string;
  hashed_pw: string;
  profile_img_url: string | null;
  bio: string | null;
  refresh_token: string;
  time_created: string;
}

// Define the shape of authorization
interface AuthContextType {
  user: User | null;
  accessToken: string | null;
  login: (accessToken: string) => Promise<void>;
  logout: () => void;
  verifyUser: (accessToken: string) => Promise<void>;
  updateUser: (updated: Partial<User>) => void;
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
      const response = await axios.get(`${base_url}/auth`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });

      console.log("Verification successful.");

      setAccessToken(token);
      setUser(response.data.user);
    } catch (error) {
      console.error("Verification failed. Use has been logged out.", error);

      setAccessToken(null);
      setUser(null);
    }
  };

  const updateUser = (updated: Partial<User>) => {
    setUser((prevUser) => (prevUser ? { ...prevUser, ...updated } : prevUser));
  };

  const login = async (token: string) => {
    await verifyUser(token);
  };

  const logout = () => {
    setUser(null);
    setAccessToken(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, accessToken, verifyUser, updateUser, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
