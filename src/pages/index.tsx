/* eslint-disable @next/next/no-img-element */
import type { NextPage } from "next";
import Link from "next/link";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { trpc } from "../utils/trpc";
import Loader from "../assets/rings.svg";

const Home: NextPage = () => {
  const { isLoading, isError, data } = trpc.useQuery(["posts.getPosts"]);

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-teal-300">
        <img className="b h-40 w-40 " src={Loader.src} alt="" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex h-screen items-center justify-center bg-teal-300">
        <p>Some error occured</p>
      </div>
    );
  }

  return (
    <div className="m-auto max-w-5xl">
      <Navbar />

      <div className="mt-14 flex flex-col gap-5 sm:gap-40">
        {data?.map((post, index) => (
          <div
            key={post.id}
            className={`flex-col gap-5 sm:flex sm:flex-row sm:gap-10  ${
              index % 2 === 0 ? "sm:flex-row-reverse" : ""
            }`}
          >
            <div className="relative w-full flex-1">
              <img
                className="h-[350px] w-full object-cover p-2 sm:p-0"
                src={post.image}
                alt=""
              />
              <div className="absolute top-4 -left-4 -z-10 hidden h-[350px] w-full bg-teal-300 sm:block"></div>
            </div>
            <div className="flex-1 ">
              <div className="flex h-full flex-col items-start justify-between gap-4">
                <h1 className="text-center font-bold sm:text-start sm:text-5xl">
                  {post.title}
                </h1>
                <div
                  className="h-36 overflow-clip p-2 text-center text-lg sm:p-0 sm:text-justify"
                  dangerouslySetInnerHTML={{ __html: post.description ?? "" }}
                ></div>
                <Link href={`/posts/${post.id}`}>
                  <div className="flex w-full justify-center md:block md:w-fit">
                    <button className="border-none bg-teal-300 p-2 text-sm text-black">
                      Read More
                    </button>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default Home;
