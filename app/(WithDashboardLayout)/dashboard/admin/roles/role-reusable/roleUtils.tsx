import { Crown, Building2, User, Shield } from "lucide-react";
import React from "react";

type RoleConfigType = {
  icon: React.ElementType;
  color: string;
};

const roleConfig: Record<string, RoleConfigType> = {
  admin: {
    icon: Crown,
    color: "bg-purple-500/10 text-purple-500 border-purple-500/20",
  },
  host: {
    icon: Building2,
    color: "bg-blue-500/10 text-blue-500 border-blue-500/20",
  },
  user: {
    icon: User,
    color: "bg-green-500/10 text-green-500 border-green-500/20",
  },
};

const defaultRole: RoleConfigType = {
  icon: Shield,
  color: "bg-gray-500/10 text-gray-500 border-gray-500/20",
};

// JSX return (FIXED)
export const getRoleIcon = (type: string) => {
  const Icon = roleConfig[type.toLowerCase()]?.icon || defaultRole.icon;
  return <Icon className="h-5 w-5" />;
};

export const getRoleColor = (type: string) => {
  return roleConfig[type.toLowerCase()]?.color || defaultRole.color;
};