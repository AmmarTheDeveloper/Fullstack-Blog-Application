"use client";
import { clearUser } from "@/lib/features/auth/authSlice";
import { AppDispatch } from "@/lib/store";
import axios, { AxiosResponse } from "axios";
import toast from "react-hot-toast";

interface LogoutResponse {
  success: boolean;
  message: string;
}

export async function LogoutHandler(dispatch: AppDispatch, router: any) {
  try {
    let response: AxiosResponse<LogoutResponse> = await axios.get(
      "/api/user/logout"
    );
    const { success, message } = response.data;
    if (success) {
      toast.success("Logged out successfully.");
      dispatch(clearUser());
      router.push("/");
    } else {
      toast.error(message || "Something went wrong");
    }
  } catch (error: any) {
    toast.error(error.message);
  }
}
