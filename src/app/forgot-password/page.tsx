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
import { useDispatch } from "react-redux";
import { Spinner } from "@/helper/loader/spinner";
import { ApiResponse } from "@/helper/types/types";

const FormSchema = z.object({
  email: z.string().email({ message: "Invalid email address." }),
});

export default function ForgotPassword() {
  const [isSubmitted, setSubmitted] = useState(false);
  const [email, setEmail] = useState();
  const [isLoading, setLoading] = useState(false);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "", // Initial value is an empty string
    },
  });
  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      setEmail(data.email);
      setLoading(true);
      let response: AxiosResponse<ApiResponse> = await axios.post(
        "/api/user/forgot-password",
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      toast.success("Reset password link sent successfully to email.");
      setSubmitted(true);
      setLoading(false);
    } catch (error: any) {
      setSubmitted(false);
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
                Forgot Password
              </h1>

              {!isSubmitted ? (
                <>
                  <p className="text-center text-[14px] mt-2 mb-4">
                    Enter your email address and we'll send you a link to reset
                    your password.
                  </p>

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <div>
                        <FormItem>
                          <FormControl>
                            <Input placeholder="Enter your email" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      </div>
                    )}
                  />

                  {!isLoading ? (
                    <Button className="mt-4 w-full" type="submit">
                      Send Reset Link
                    </Button>
                  ) : (
                    <Button className="mt-4 w-full" type="button">
                      <Spinner />
                    </Button>
                  )}
                </>
              ) : (
                <p className="text-center">
                  If an account exists for {email}, <br /> you will receive a
                  password reset link shortly.
                </p>
              )}

              <Link
                href="/login"
                className="mx-2 block mt-4 text-blue-500 hover:text-blue-700 text-[14px]"
              >
                <Button variant={"outline"} type="button" className="w-full">
                  Back to login
                </Button>
              </Link>
            </form>
          </Form>
        </div>
      </section>
    </>
  );
}
