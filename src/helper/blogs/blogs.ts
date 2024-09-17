import { setBlog } from "@/lib/features/blog/blogSlice";
import { BlogType } from "@/models/Blog";
import axios, { AxiosResponse } from "axios";
import toast from "react-hot-toast";
import { Dispatch } from "redux";

interface BlogsResponse {
  message?: string;
  success: boolean;
  blogs?: Partial<BlogType[]>;
  blog?: BlogType;
}

export async function getBlogs({
  page,
  limit,
}: {
  page: number;
  limit: number;
}): Promise<Partial<BlogType[]> | []> {
  try {
    const response: AxiosResponse<BlogsResponse> = await axios.get(
      `/api/user/blogs?page=${page}&limit=${limit}`
    );
    // console.log(response.data);
    return response.data.blogs || [];
  } catch (error: any) {
    console.log("error occured while fetching blog data from api", error);
    return [];
  }
}

export async function getMyBlogs({
  page,
  limit,
}: {
  page: number;
  limit: number;
}): Promise<Partial<BlogType[]> | []> {
  try {
    const response: AxiosResponse<BlogsResponse> = await axios.get(
      `/api/user/blogs/my?page=${page}&limit=${limit}`
    );
    // console.log(response.data);
    return response.data.blogs || [];
  } catch (error: any) {
    console.log("error occured while fetching blog data from api", error);
    return [];
  }
}

export async function deleteBlog(blogId: string): Promise<boolean> {
  try {
    const response: AxiosResponse<BlogsResponse> = await axios.delete(
      "/api/user/blogs/" + blogId
    );
    toast.success("Blog deleted successfully");
    return true;
  } catch (error: any) {
    toast.error(error.response.data.message || "Internal server error");
    console.log("error occured while fetching blog data from api", error);
    return false;
  }
}

export async function getSpecificBlog(
  blogId: string
): Promise<BlogType | null> {
  try {
    const response: AxiosResponse<BlogsResponse> = await axios.get(
      "/api/user/blogs/" + blogId
    );
    return response.data.blog || null;
  } catch (erro: any) {
    return null;
  }
}

export async function fetchBlog(dispatch: Dispatch, id: string) {
  const blog: BlogType | null = await getSpecificBlog(id);
  dispatch(setBlog(blog));
}
