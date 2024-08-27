import Blog from "@/components/Blog/Blog";

const Blogs = () => {
  return (
    <>
      <h1 className="text-center text-2xl md:text-4xl font-bold mb-12">
        Blogs
      </h1>

      <div className="flex flex-wrap justify-center md:px-[40px] px-[20px] gap-[20px]">
        <Blog
          blogId={"aasdf"}
          blogTitle="Something"
          blogContent="Reference site about Lorem Ipsum, giving information on its origins, as well as a random Lipsum generator. Reference site about Lorem Ipsum, giving information on its origins, as well as a random Lipsum generator.
          Reference site about Lorem Ipsum, giving information on its origins, as well as a random Lipsum generator. Reference site about Lorem Ipsum, giving information on its origins, as well as a random Lipsum generator."
          Time="7-21-2024"
          BlogImage="https://i.ytimg.com/vi/RjHflb-QgVc/maxresdefault.jpg"
          profileImage="https://cdn-icons-png.flaticon.com/512/9187/9187604.png"
        />
      </div>
    </>
  );
};

export default Blogs;
