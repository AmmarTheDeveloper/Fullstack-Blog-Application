"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
// importing zod
import { z } from "zod";
// importing button
import { Button } from "@/components/ui/button";
// importing form
import { useParams, useRouter } from "next/navigation";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { toast } from "react-hot-toast";
import axios, { AxiosResponse } from "axios";
import { useState } from "react";
import { fetchUser } from "@/helper/authentication/isUserAvailable";
import { useDispatch } from "react-redux";
import { Spinner } from "@/helper/loader/spinner";
import { ApiResponse } from "@/helper/types/types";

const FormSchema = z.object({
  password: z
    .string()
    .min(8, {
      message: "Password must be at least 8 characters long",
    })
    .regex(/[A-Z]/, {
      message: "Password must contain at least one uppercase letter",
    })
    .regex(/[a-z]/, {
      message: "Password must contain at least one lowercase letter",
    })
    .regex(/[0-9]/, { message: "Password must contain at least one number" })
    .regex(/[@$!%*?&#]/, {
      message: "Password must contain at least one special character",
    }),
  cpassword: z
    .string()
    .min(1, { message: "Confirm password field is required." })
    .refine((data) => data.password === data.cpassword, {
      message: "Passwords not matched",
      path: ["cpassword"],
    }),
});

export default function ResetPassword() {
  const dispatch = useDispatch();
  const router = useRouter();
  const params = useParams();
  const { token } = params;
  const [isLoading, setLoading] = useState(false);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      password: "",
      cpassword: "",
    },
  });
  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      setLoading(true);
      let response: AxiosResponse<ApiResponse> = await axios.post(
        "/api/user/reset-password/" + token,
        {
          password: data.password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      toast.success("Password changed successfully");
      setLoading(false);
      await fetchUser(dispatch);
      router.replace("/login");
    } catch (error: any) {
      setLoading(false);
      let message = error.response.data.message;
      toast.error(message ? message : "Something went wrong.");
    }
  }
  return (
    <>
      <section>
        <div className="max-w-screen-xl mx-auto px-[20px] pb-[50px]">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="max-w-[500px] mx-auto md:border p-5 rounded"
            >
              <h1 className="text-center md:text-4xl text-3xl font-bold mb-[15px]">
                Reset Password
              </h1>

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="mt-[10px]">
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="New password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="cpassword"
                render={({ field }) => (
                  <FormItem className="mt-[10px]">
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Confirm Password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {!isLoading ? (
                <Button className="mt-4 w-full" type="submit">
                  Reset Password
                </Button>
              ) : (
                <Button className="mt-4 w-full" type="button">
                  <Spinner />
                </Button>
              )}
            </form>
          </Form>
        </div>
      </section>
    </>
  );
}
