"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import toast from "react-hot-toast";
import axios, { AxiosResponse } from "axios";
import { ApiResponse } from "@/helper/types/types";
import { Spinner } from "@/helper/loader/spinner";
import { useState } from "react";
import { useRouter } from "next/navigation";

const FormSchema = z.object({
  pin: z.string().min(6, {
    message: "Your one-time password must be 6 characters.",
  }),
});

export default function VerifyEmail() {
  const router = useRouter();
  const [isLoading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      pin: "",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      setLoading(true);
      const response: AxiosResponse<ApiResponse> = await axios.post(
        "/api/user/verify-email",
        {
          code: data.pin,
        }
      );
      toast.success(response.data?.message || "Verified successfully");
      setLoading(false);
      router.push("/login");
    } catch (error: any) {
      setLoading(false);
      console.log("Error occured while verifying email ", error);
      toast.error(error.response.data.message);
    }
  }

  return (
    <section>
      <div className="max-w-screen-xl mx-auto px-[20px] pb-[50px]">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="max-w-[400px] mx-auto md:border p-5 rounded"
          >
            <h1 className="text-center md:text-4xl text-3xl font-bold mb-[15px]">
              Verify Email
            </h1>
            <FormField
              control={form.control}
              name="pin"
              render={({ field }) => (
                <div className="flex justify-center mt-5 mb-5 text-center">
                  <FormItem>
                    <FormLabel className="text-[13px] mb-4">
                      Enter the 6-digit code sent to your email address
                    </FormLabel>
                    <FormControl>
                      <InputOTP maxLength={6} {...field}>
                        <InputOTPGroup>
                          <InputOTPSlot
                            className=" h-[40px] w-[40px] md:h-[45px] md:w-[45px]"
                            index={0}
                          />
                        </InputOTPGroup>
                        <InputOTPGroup>
                          <InputOTPSlot
                            className=" h-[40px] w-[40px] md:h-[45px] md:w-[45px]"
                            index={1}
                          />
                        </InputOTPGroup>
                        <InputOTPGroup>
                          <InputOTPSlot
                            className=" h-[40px] w-[40px] md:h-[45px] md:w-[45px]"
                            index={2}
                          />
                        </InputOTPGroup>
                        <InputOTPGroup>
                          <InputOTPSlot
                            className=" h-[40px] w-[40px] md:h-[45px] md:w-[45px]"
                            index={3}
                          />
                        </InputOTPGroup>
                        <InputOTPGroup>
                          <InputOTPSlot
                            className=" h-[40px] w-[40px] md:h-[45px] md:w-[45px]"
                            index={4}
                          />
                        </InputOTPGroup>

                        <InputOTPGroup>
                          <InputOTPSlot
                            className=" h-[40px] w-[40px] md:h-[45px] md:w-[45px]"
                            index={5}
                          />
                        </InputOTPGroup>
                      </InputOTP>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                </div>
              )}
            />

            {!isLoading ? (
              <Button type="submit" className="w-full">
                Submit
              </Button>
            ) : (
              <Button type="button" className="w-full">
                <Spinner />
              </Button>
            )}
          </form>
        </Form>
      </div>
    </section>
  );
}
