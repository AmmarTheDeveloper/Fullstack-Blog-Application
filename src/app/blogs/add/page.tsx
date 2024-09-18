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
import { ApiResponse } from "@/helper/types/types";
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
import Editor from "@/components/Editor/Editor";
import { useState } from "react";
import { Spinner } from "@/helper/loader/spinner";
import { Textarea } from "@/components/ui/textarea";

const formSchema = z.object({
  title: z.string().min(3, {
    message: "Enter Blog Title",
  }),
  description: z.string().min(3, {
    message: "Enter Description",
  }),
  content: z.string().min(3, {
    message: "Enter Blog Content",
  }),
  thumbnail: z
    .instanceof(File, {
      message: "Upload blog thumbnail",
    })
    .refine((file) => file.type.startsWith("image/"), {
      message: "The file must be an image",
    }),
  category: z.string().min(3, {
    message: "Enter Blog Category",
  }),
});

export default function AddBlog() {
  const [isLoading, setLoading] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      category: "",
      content: "",
      thumbnail: undefined,
    },
  });

  async function onSubmit(data: z.infer<typeof formSchema>) {
    setLoading(true);
    let { title, description, category, thumbnail, content } = data;
    const formData = new FormData();

    formData.append("title", title);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("content", content);
    if (thumbnail) {
      formData.append("thumbnail", thumbnail);
    }

    try {
      let response: AxiosResponse<ApiResponse> = await axios.post(
        `/api/user/blogs`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setLoading(false);
      toast.success("Blog added successfully.");
      form.reset();
    } catch (error: any) {
      setLoading(false);
      console.log(error);
      toast.error(error.response.data.message || "Internal server error.");
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 mb-5">
        <div className="p-[20px] flex flex-col gap-[10px] max-w-[500px] mx-auto md:border md:p-4 md:rounded-md md:shadow  ">
          <h1 className="text-center mb-4 md:text-3xl text-xl font-medium">
            Add Blog
          </h1>
          <FormField
            control={form.control}
            name="title"
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
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Blog Description : </FormLabel>
                <FormControl>
                  <Textarea placeholder="Enter Description" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Blog Content : </FormLabel>
                <FormControl>
                  <Editor value={field.value} setValue={field.onChange} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="thumbnail"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Blog Thumbnail : </FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) => field.onChange(e.target.files?.[0])}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Blog Category : </FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select Category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Category</SelectLabel>
                        <SelectItem value="Technology">Technology</SelectItem>
                        <SelectItem value="Lifestyle">Lifestyle</SelectItem>
                        <SelectItem value="Food">Food</SelectItem>
                        <SelectItem value="Health And Fitness">
                          Health And Fitness
                        </SelectItem>
                        <SelectItem value="Education">Education</SelectItem>
                        <SelectItem value="Business & Finance">
                          Business & Finance
                        </SelectItem>
                        <SelectItem value="Entertainment">
                          Entertainment
                        </SelectItem>
                        <SelectItem value="Sports">Sports</SelectItem>
                        <SelectItem value="Science & Environment">
                          Science & Environment
                        </SelectItem>
                        <SelectItem value="Politics & Current Affairs">
                          Politics & Current Affairs
                        </SelectItem>
                        <SelectItem value="Art & Culture">
                          Art & Culture
                        </SelectItem>
                        <SelectItem value="Personal Blogs">
                          Personal Blogs
                        </SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {!isLoading ? (
            <Button className="w-full mt-[5px]" type="submit">
              Submit
            </Button>
          ) : (
            <Button className="w-full mt-[5px]" type="button">
              <Spinner />
            </Button>
          )}
        </div>
      </form>
    </Form>
  );
}
