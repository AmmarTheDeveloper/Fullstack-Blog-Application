"use client";
import axios, { AxiosResponse } from "axios";
import { clearUser, setUser } from "@/lib/features/auth/authSlice";
import { AppDispatch } from "@/lib/store";

interface VerificationResponse {
  success: boolean;
  message?: string;
  user: object | null;
}

export async function fetchUser(dispatch: AppDispatch): Promise<void> {
  try {
    const response: AxiosResponse<VerificationResponse> = await axios.post(
      "/api/user/verifyUser"
    );

    if (response.data.success) {
      dispatch(setUser(response.data.user));
      return;
    }
    dispatch(clearUser());
    return;
  } catch (error) {
    dispatch(clearUser());
    return;
  }
}
