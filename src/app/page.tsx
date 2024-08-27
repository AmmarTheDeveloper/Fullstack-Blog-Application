import { Button } from "@/components/ui/button";
import { Spinner } from "@/helper/loader/spinner";

export default function Home() {
  return (
    <>
      <section>
        <div className="max-w-screen-xl mx-auto">
          <div className="w-full flex justify-center items-center  md:min-h-[500px] px-[20px]">
            <div className="w-full text-center">
              <h1 className="dark:text-[#F6F5F2] text-[black] font-bold text-[35px] md:text-[65px] mb-[10px] text-center">
                Master the art of coding
              </h1>
              <p className="dark:text-[#F6F5F2] text-[black] max-w-[550px] mx-auto md:text-[18px] text-[16px] mb-5">
                Dive into our comprehensive coding courses and transform your
                musical journey today. Whether you're a beginner or looking to
                refine your skills, join us to unlock your true potential.
              </p>
              <Button variant={"outline"}>Explore courses</Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
