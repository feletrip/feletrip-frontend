"use client";

import { IUserProfile } from "@/types/user/user";
import { createContext, useContext, useState } from "react";

interface AuthContextType {
  user: IUserProfile | null;
  setUser: (user: IUserProfile | null) => void;
  isLoggedIn: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({
  children,
  initialUser,
}: {
  children: React.ReactNode;
  initialUser: IUserProfile | null;
}) {
  const [user, setUser] = useState<IUserProfile | null>(initialUser);

  const isLoggedIn = !!user;

  return (
    <AuthContext.Provider value={{ user, setUser, isLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
}
