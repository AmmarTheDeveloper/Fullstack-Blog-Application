"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
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
import { useEffect, useState } from "react";
import { Spinner } from "@/helper/loader/spinner";
import { useParams, useRouter } from "next/navigation";
import { getSpecificBlog } from "@/helper/blogs/blogs";
import { BlogType } from "@/models/Blog";
import Image from "next/image";
import { Message } from "@/components/Message/Message";
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
    })
    .optional(),
  category: z.string().min(3, {
    message: "Enter Blog Category",
  }),
});

export default function UpdateBlog() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const [isLoading, setLoading] = useState(true);
  const [updateImage, setUpdateImage] = useState(false);
  const [isButtonLoading, setButtonLoading] = useState(false);
  const [blog, setBlog] = useState<BlogType | null>(null);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      category: "",
      content: "",
    },
  });

  useEffect(() => {
    fetchBlog();
  }, []);

  async function fetchBlog() {
    const blog = await getSpecificBlog(id);
    setBlog(blog);
    form.reset({
      title: blog?.title || "",
      description: blog?.description || "",
      content: blog?.content || "",
      category: blog?.category || "",
    });
    setLoading(false);
  }

  async function onSubmit(data: z.infer<typeof formSchema>) {
    setButtonLoading(true);
    let { title, category, description, thumbnail, content } = data;
    const formData = new FormData();

    formData.append("title", title);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("content", content);
    if (thumbnail && updateImage) {
      formData.append("thumbnail", thumbnail);
    }

    try {
      let response: AxiosResponse<ApiResponse> = await axios.put(
        `/api/user/blogs/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setButtonLoading(false);
      toast.success("Blog updated successfully.");
      router.push("/blogs/my");
    } catch (error: any) {
      setButtonLoading(false);
      console.log(error);
      toast.error(error.response.data.message || "Internal server error.");
    }
  }

  if (isLoading) {
    return (
      <>
        <div className="flex justify-center my-2">
          <Spinner size="lg" />
        </div>
      </>
    );
  }

  if (!blog) {
    return (
      <div className="flex justify-center">
        <Message
          variant="destructive"
          title="Error"
          description="No Blog Found To Update"
        />
      </div>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="p-[20px] flex flex-col gap-[10px] max-w-[500px] mx-auto md:border md:p-4 md:rounded-md md:shadow  ">
          <h1 className="text-center mb-4 md:text-3xl text-xl font-medium">
            Update Blog
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

          {updateImage ? (
            <>
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
              <Button type="button" onClick={() => setUpdateImage(false)}>
                Don't Update Image
              </Button>
            </>
          ) : (
            <>
              <div className="text-center">
                <Image
                  src={blog.thumbnail!}
                  height={300}
                  width={300}
                  alt={"Thumbnail not found"}
                  className="rounded mx-auto"
                />
                <Button
                  type="button"
                  className="w-[fit-content] mt-4"
                  onClick={() => setUpdateImage(true)}
                >
                  Update Image
                </Button>
              </div>
            </>
          )}

          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Blog Category : </FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value}
                    className="w-full"
                  >
                    <SelectTrigger>
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

          {!isButtonLoading ? (
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
