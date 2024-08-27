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
import { Input } from "@/components/ui/input";
import axios, { AxiosResponse } from "axios";
import { ApiResponse } from "@/helpers/types/types";
import toast from "react-hot-toast";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const formSchema = z.object({
  blogTitle: z.string().min(3, {
    message: "Enter Blog Title",
  }),
  blogContent: z.string().min(3, {
    message: "Enter Blog Content",
  }),
  blogImage: z.string().min(3, {
    message: "Enter Blog Image",
  }),
  blogCategory: z.string().min(3, {
    message: "Enter Blog Category",
  }),
});

export default function AddBlog() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      blogTitle: "",
      blogContent: "",
      blogImage: "",
      blogCategory: "",
    },
  });

  async function onSubmit(data: z.infer<typeof formSchema>) {
    let { blogTitle, blogContent, blogImage, blogCategory } = data;
    try {
      let response: AxiosResponse<ApiResponse> = await axios.post(
        `/api/admin/user/payment`,
        {
          blogTitle,
          blogContent,
          blogImage,
          blogCategory,
        }
      );
      toast.success("Payment added successfully.");
      form.reset();
    } catch (error: any) {
      console.log(error);
      toast.error(error.response.data.message || "Internal server error.");
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="flex flex-col gap-[10px] max-w-[500px] mx-auto md:border md:p-4 md:rounded-md md:shadow  ">
          <h1 className="text-center mb-4 md:text-3xl text-xl font-medium">
            Add Blog
          </h1>
          <FormField
            control={form.control}
            name="blogTitle"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Blog Title : </FormLabel>
                <FormControl>
                  <Input placeholder="Enter Blog Title" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="blogContent"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Blog Content : </FormLabel>
                <FormControl>
                  <Input placeholder="Enter Blog Content" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="blogImage"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Blog Image : </FormLabel>
                <FormControl>
                  <Input type="file" accept="image/*" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="blogCategory"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Blog Category : </FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="w-full"
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select Category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Category</SelectLabel>
                        <SelectItem value="Technology">Technology</SelectItem>
                        <SelectItem value="Food">Food</SelectItem>
                        <SelectItem value="Food And Fitness">
                          Health And Fitness
                        </SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button className="w-[fit-content] mt-[5px]" type="submit">
            Submit
          </Button>
        </div>
      </form>
    </Form>
  );
}
