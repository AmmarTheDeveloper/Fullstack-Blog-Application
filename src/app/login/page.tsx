"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
// importing zod
import { z } from "zod";
// importing button
import { Button } from "@/components/ui/button";
// importing form
import { useRouter } from "next/navigation";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { toast } from "react-hot-toast";
import axios, { AxiosResponse } from "axios";
import Link from "next/link";
import { useState } from "react";
import { fetchUser } from "@/helper/authentication/isUserAvailable";
import { useDispatch } from "react-redux";
import { Spinner } from "@/helper/loader/spinner";

const FormSchema = z.object({
  email: z.string().email({ message: "Invalid email address." }),
  password: z.string().min(1, { message: "Password field is required." }),
});

interface LoginResponse {
  message: string;
  success: boolean;
  role: string;
}

export default function Login() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [isLoading, setLoading] = useState(false);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "", // Initial value is an empty string
      password: "", // Initial value is an empty string
    },
  });
  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      setLoading(true);
      let response: AxiosResponse<LoginResponse> = await axios.post(
        "/api/user/login",
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      toast.success("Logged in successfully.");
      setLoading(false);
      await fetchUser(dispatch);
      router.replace("/");
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
                Login
              </h1>

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <div>
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  </div>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="mt-[10px]">
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Enter password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <p className="mt-2 text-[14px] dark:text-white text-[#282828]">
                Don't have an account?
                <Link
                  href="/register"
                  className="mx-2 text-blue-500 hover:text-blue-700 text-[14px]"
                >
                  Register
                </Link>
              </p>
              <p className="mt-2 text-[14px] dark:text-white text-[#282828]">
                <Link
                  href="/forgot-password"
                  className="mx-2 text-blue-500 hover:text-blue-700 text-[14px]"
                >
                  Forgot Password?
                </Link>
              </p>

              {!isLoading ? (
                <Button className="mt-4 w-full" type="submit">
                  Submit
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
