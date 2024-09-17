import LatestBlog from "@/components/Home/LatestBlog";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/helper/loader/spinner";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <section className="mt-[-100px]">
        <div className="max-w-screen-xl mx-auto">
          <div className="w-full flex justify-center items-center min-h-[100vh] px-[20px]">
            <div className="w-full text-center">
              <h1 className="dark:text-[#F6F5F2] text-[black] font-bold text-[35px] md:text-[65px] mb-[10px] text-center">
                Master the Art of Blogging{" "}
              </h1>
              <p className="dark:text-[#F6F5F2] text-[black] max-w-[550px] mx-auto md:text-[18px] text-[16px] mb-5">
                Dive into our comprehensive guides and resources designed to
                take your blogging journey to the next level. Whether you're
                just starting out or looking to refine your writing skills, our
                platform is here to help you unlock your creative potential and
                share your voice with the world.
              </p>
              <Button variant={"outline"} asChild>
                <Link href="/blogs">Explore Blogs</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
      <LatestBlog />
    </>
  );
}
