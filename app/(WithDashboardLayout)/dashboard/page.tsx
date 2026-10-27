"use client";

import { useAuth } from "@/providers/authProvider";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

type Role = "CUSTOMER" | "VENDOR" | "ADMIN";

const Dashboard = () => {
  const router = useRouter();
  const { user } = useAuth();

  const role: Role = (user?.role?.name ?? "CUSTOMER") as Role;

  useEffect(() => {
    if (role === "ADMIN") router.push("/dashboard/admin");
    else if (role === "VENDOR") router.push("/dashboard/host");
    else router.push("/dashboard/user");
  }, [role, router]);

  return;
};

export default Dashboard;
