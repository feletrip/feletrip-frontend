"use server";

import { IUserProfile } from "@/types/user/user";
import { cookies } from "next/headers";

const defaultAvatar = "https://i.ibb.co.com/j9P7WfQG/image.png";

// Customer register
export async function registerAction(formData: FormData) {
  try {
    const jsonData = Object.fromEntries(formData.entries());

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/register`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(jsonData),
      },
    );

    const regResult = await res.json();

    if (!res.ok) {
      return {
        success: false,
        message: regResult.message || "Registration failed",
      };
    }

    const email = regResult.data?.email || jsonData.email;

    const otpRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/otp/send`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    const otpResult = await otpRes.json();

    if (!otpRes.ok) {
      return {
        success: false,
        otpSent: false,
        message: otpResult.message || "Failed to send OTP",
      };
    }

    return {
      success: true,
      otpSent: true,
      message: otpResult.message || "OTP sent successfully",
      email,
    };
  } catch (error) {
    console.error("Register Action Error:", error);
    return {
      success: false,
      message: "Something went wrong. Please try again.",
    };
  }
}

// Vendor register
export async function vendorRegisterAction(formData: FormData) {
  try {
    const jsonData = Object.fromEntries(formData.entries());

    // Register vendor
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/register-vendor`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(jsonData),
      },
    );

    const regResult = await res.json();

    if (!res.ok) {
      return {
        success: false,
        message: regResult.message || "Vendor registration failed",
      };
    }

    const email = regResult.data?.email || jsonData.email;

    // Send OTP
    const otpRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/otp/send`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    const otpResult = await otpRes.json();

    // OTP failed
    if (!otpRes.ok) {
      return {
        success: false,
        otpSent: false,
        message: otpResult.message || "Failed to send OTP",
      };
    }

    // All success case
    return {
      success: true,
      otpSent: true,
      message: otpResult.message || "OTP sent successfully",
      email,
    };
  } catch (error) {
    console.error("Vendor Register Error:", error);
    return {
      success: false,
      message: "Server error",
    };
  }
}

// otp verification
export async function verifyOtpAction(formData: FormData) {
  try {
    const jsonData = Object.fromEntries(formData.entries());

    // verification request
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/otp/verify`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(jsonData),
    });

    const result = await res.json();

    // fail response
    if (!res.ok) {
      return {
        success: false,
        message: result?.message || "OTP verification failed",
      };
    }

    // success response
    return {
      success: true,
      message: result?.message || "OTP verified successfully",
    };
  } catch (error) {
    console.error("OTP VERIFY ERROR:", error);
    return {
      success: false,
      message: "Server error",
    };
  }
}

// send otp
export async function resendOtpAction(email: string) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/otp/send`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    const result = await res.json();

    if (!res.ok) {
      return {
        success: false,
        message: result.message || "Failed to resend OTP",
      };
    }

    return {
      success: true,
      data: result,
    };
  } catch {
    return {
      success: false,
      message: "Server error",
    };
  }
}

// login action
export async function loginAction(formData: FormData) {
  try {
    const jsonData = Object.fromEntries(formData.entries());

    // remember me check
    const isRemembered = jsonData.remember === "true";

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(jsonData),
    });

    const result = await res.json();

    if (!res.ok) {
      return {
        success: false,
        message: result?.message || "Login failed",
      };
    }

    const { accessToken, user } = result.data;

    const normalizedUser = {
      ...user,
      avatar: user?.avatar || defaultAvatar,
    };

    const cookieStore = await cookies();

    // store token
    cookieStore.set("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: isRemembered ? 365 * 24 * 60 * 60 : 7 * 24 * 60 * 60,
    });

    return {
      success: true,
      user: normalizedUser as IUserProfile,
      accessToken,
      message: result?.message || "Login successful",
    };
  } catch (error) {
    console.error("LOGIN ERROR:", error);

    return {
      success: false,
      message: "Server error",
    };
  }
}

// log out
export async function logoutAction() {
  try {
    const cookieStore = await cookies();

    // remove token from cookies
    cookieStore.delete("accessToken");
    return {
      success: true,
      message: "Logged out successfully",
    };
  } catch (err) {
    console.error("LOGOUT ERROR:", err);
    return {
      success: false,
      message: "Logout failed. Please try again.",
    };
  }
}

// forgot password
export async function forgetPasswordAction(email: string) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/forgot-password`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      },
    );

    const result = await res.json();

    if (!res.ok) {
      return {
        success: false,
        message: result?.message || "Failed to send reset link",
      };
    }

    return {
      success: true,
      message: result?.message || "Password reset link sent successfully",
    };
  } catch (error) {
    console.error("FORGOT PASSWORD ERROR:", error);

    return {
      success: false,
      message: "Server error",
    };
  }
}

// reset password
export async function resetPasswordAction(token: string, newPassword: string) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/reset-password`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token, newPassword }),
      },
    );

    const result = await res.json();

    if (!res.ok) {
      return {
        success: false,
        message: result?.message || "Failed to reset Password",
      };
    }

    return {
      success: true,
      message: result?.message || "You can now log in with your new password.",
    };
  } catch (error) {
    console.error("FORGOT RESET ERROR:", error);

    return {
      success: false,
      message: "Server error",
    };
  }
}
