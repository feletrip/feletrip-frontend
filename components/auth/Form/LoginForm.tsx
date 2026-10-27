"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import InputField from "@/components/Reuseable/auth/InputField";

import {
  loginSchema,
  LoginType,
} from "@/components/auth/Auth_Schema/login.schema";

import { loginAction } from "@/Server/Auth/auth.actions";
import { useAuth } from "@/providers/authProvider";
import { toast } from "@/components/Reuseable/common/toast";
import AuthSectionTitle from "./AuthSectionTitle";

type AuthView = "login" | "register" | "reset" | "verify";

interface LoginFormProps {
  setAuthView: React.Dispatch<React.SetStateAction<AuthView>>;
  setUserEmail: React.Dispatch<React.SetStateAction<string>>;
  userEmail: string;
}

export default function LoginForm({
  setAuthView,
  setUserEmail,
  userEmail,
}: LoginFormProps) {
  const { setUser } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginType>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      remember: false,
    },
  });

  const onSubmit = async (data: LoginType) => {
    toast.loading(
      "Logging in...",
      "Please wait while we verify your credentials",
    );

    try {
      const formData = new FormData();

      formData.append("email", data.email);
      formData.append("passwordHash", data.password);

      formData.append("remember", String(!!data.remember));

      const result = await loginAction(formData);
      toast.close();

      if (!result.success) {
        toast.error(
          "Login failed",
          result.message || "Invalid email or password",
        );
        return;
      }

      setUser(result.user ?? null);
      toast.success(
        "Login successful",
        `Welcome back ${result.user?.name ?? "User"}`,
      );
      setUserEmail(result.user?.email ?? "");
      setAuthView("login");
    } catch (error: unknown) {
      toast.close();

      toast.error(
        "Login failed",
        error instanceof Error
          ? error.message
          : "Server Error. Please try again later",
      );
    }
  };

  return (
    <section className="w-full">
      <div className="space-y-6">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {/* Credentials */}
          <div className="space-y-4">
            <AuthSectionTitle title="Login Credentials" />

            <InputField
              label="Email"
              type="email"
              placeholder="example@gmail.com"
              error={errors.email?.message}
              defaultValue={userEmail}
              {...register("email")}
              isSubmitting={isSubmitting}
            />

            <InputField
              label="Password"
              type="password"
              placeholder="••••••••"
              error={errors.password?.message}
              {...register("password")}
              isSubmitting={isSubmitting}
            />

            {/* Optional remember */}
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <div className="relative flex items-center justify-center">
                  <input
                    type="checkbox"
                    {...register("remember")}
                    className="peer h-5 w-5 appearance-none rounded-full border-2 border-default-400 checked:border-primary checked:bg-primary cursor-pointer transition-colors"
                  />
                  {/* SVG Checkmark Icon */}
                  <svg
                    className="pointer-events-none absolute h-3.5 w-3.5 text-white opacity-0 peer-checked:opacity-100 transition-opacity"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={3}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <span className="text-default-600 text-sm">Remember me</span>
              </label>

              <span
                onClick={() => setAuthView("reset")}
                className="text-primary hover:opacity-80 transition cursor-pointer font-medium"
              >
                Forgot password?
              </span>
            </div>
          </div>

          {/* Submit */}
          <Button
            type="submit"
            className={`w-full ${isSubmitting ? "cursor-not-allowed pointer-events-none" : "cursor-pointer"}`}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Logging in..." : "Login"}
          </Button>
        </form>

        {/* Switch */}
        <p className="text-center text-sm">
          Don’t have an account?{" "}
          <span
            onClick={() => setAuthView("register")}
            className={`text-primary hover:opacity-80 transition font-medium ${isSubmitting ? "cursor-not-allowed pointer-events-none" : "cursor-pointer"}`}
          >
            Create one
          </span>
        </p>
      </div>
    </section>
  );
}
