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

      <div className="mt-14 flex flex-col gap-40">
        {data?.map((post, index) => (
          <div
            key={post.id}
            className={`flex gap-10 ${
              index % 2 === 0 ? "flex-row-reverse" : ""
            }`}
          >
            <div className="relative w-full flex-1">
              <img
                className="h-[350px] w-full object-cover"
                src={post.image}
                alt=""
              />
              <div className="absolute top-4 -left-4 -z-10 h-[350px] w-full bg-teal-300"></div>
            </div>
            <div className="flex-1 ">
              <div className="flex h-full flex-col items-start justify-between gap-4">
                <h1 className="text-5xl font-bold">{post.title}</h1>
                <div
                  className="h-36 overflow-clip text-justify text-lg"
                  dangerouslySetInnerHTML={{ __html: post.description ?? "" }}
                ></div>
                <Link href={`/posts/${post.id}`}>
                  <button className=" border-none bg-teal-300 p-2 text-sm text-black">
                    Read More
                  </button>
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
