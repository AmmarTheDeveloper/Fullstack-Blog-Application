"use client";

import React, { useState } from "react";

import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import FormSchema, { defaultValues } from "@/schemas/registerSchema";
import axios, { AxiosResponse } from "axios";
import { useRouter } from "next/navigation";
// importing zod
import { z } from "zod";
// importing button
import { Button } from "@/components/ui/button";
// importing form
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "react-hot-toast";

import { ProfileImageWebCam } from "@/components/webcam/profileImageWebCam";
import { Spinner } from "@/helper/loader/spinner";

export default function Register() {
  const router = useRouter();
  const [isLoading, setLoading] = useState(false);
  const [isWebcam, setWebCam] = useState(false);
  const [image, setImage] = useState<string | null>(null);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: defaultValues,
  });

  interface RegisterResponse {
    success: boolean;
    message?: string;
  }

  function handleImageChange(e: any) {
    const file = e.target.files[0];
    const reader = new FileReader();

    if (file) {
      reader.readAsDataURL(file);
    }

    reader.onload = () => {
      const base64String = reader.result;
      setImage(String(base64String));
    };
  }

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      if (!image) return toast.error("Upload Profile Image.");
      const newData = { ...data, profileImage: image }; // this data is with profileImage
      setLoading(true);
      const response: AxiosResponse<RegisterResponse> = await axios.post(
        "/api/user/register",
        newData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      toast.success("Registered successfully.");
      setLoading(false);
      router.replace("/verify-email");
      // setTimeout(() => {
      //   router.push("/login");
      // }, 1000);
    } catch (error: any) {
      setLoading(false);
      toast.error(
        error.response.data.message || error.message || "Something went wrong"
      );
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
                Register
              </h1>
              <div className="flex flex-col gap-[10px]">
                <FormField
                  control={form.control}
                  name="fullname"
                  render={({ field }) => (
                    <div>
                      <FormItem>
                        <FormLabel>Full name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter your full name"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    </div>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="sm:col-span-6 col-span-12">
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter valid email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem className="sm:col-span-6 col-span-12">
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
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem className="sm:col-span-6 col-span-12">
                      <FormLabel>Confirm Password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="Enter confirm password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="mt-5 w-full">
                <label className="text-sm mb-2 block font-medium">
                  Profile Image
                </label>
                {isWebcam ? (
                  <>
                    <ProfileImageWebCam image={image} setImage={setImage} />
                    <div className="text-center">
                      <Button
                        variant="outline"
                        className="mt-2"
                        type="button"
                        onClick={() => {
                          setWebCam(false);
                          setImage(null);
                        }}
                      >
                        Upload using file
                      </Button>
                    </div>
                  </>
                ) : (
                  <>
                    <Input
                      accept="image/*"
                      type="file"
                      className="my-2"
                      onChange={handleImageChange}
                    />
                    <div className="text-center">
                      <Button
                        variant="outline"
                        type="button"
                        onClick={() => {
                          setWebCam(true);
                          setImage(null);
                        }}
                      >
                        Upload using camera
                      </Button>
                    </div>
                  </>
                )}
              </div>

              <p className="mt-2 text-[14px] dark:text-white text-[#282828]">
                Already have an account?
                <Link
                  href="/login"
                  className="mx-2 text-blue-500 hover:text-blue-700 text-[14px]"
                >
                  Login
                </Link>
              </p>

              {isLoading && (
                <Button className="mt-4 w-full" type="button">
                  <Spinner />
                </Button>
              )}
              {!isLoading && (
                <Button className="mt-4 w-full" type="submit">
                  Submit
                </Button>
              )}
            </form>
          </Form>
        </div>
      </section>
    </>
  );
}
