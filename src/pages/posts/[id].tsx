/* eslint-disable @next/next/no-img-element */
import React from "react";
import type { NextPage } from "next";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { trpc } from "../../utils/trpc";
import { useRouter } from "next/router";
import Loader from "../../assets/rings.svg";
import moment from "moment";
import Link from "next/link";

const Post: NextPage = () => {
  const router = useRouter();
  const id: string = router.asPath.split("/")[2] ?? "";
  const { isLoading, isError, data } = trpc.useQuery([
    "posts.getPost",
    { id: id },
  ]);

  const others = trpc.useQuery(["posts.getPosts"]);

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
        <h1>Post does not exist</h1>
      </div>
    );
  }
  return (
    <div className="m-auto max-w-5xl">
      <Navbar />

      <div className="mt-10 grid grid-cols-10 gap-10">
        {/* Left */}
        <div className="col-span-7">
          <div className="flex flex-col gap-10">
            <div className=" flex flex-col gap-7">
              <img
                className="h-80 w-full object-cover"
                src={data?.image}
                alt=""
              />
              <div className="flex gap-3 text-sm">
                <img
                  className="h-12 w-12 rounded-full object-cover"
                  src={data?.authorImage ?? ""}
                  alt=""
                />
                <div>
                  <span className="font-bold">Alex Rossi</span>
                  <p>Posted {moment(data?.created_at).fromNow()}</p>
                </div>
              </div>
            </div>
            <h1 className="text-5xl">{data?.title}</h1>
            <div
              className="ProseMirror text-justify leading-8"
              dangerouslySetInnerHTML={{ __html: data?.body ?? "" }}
            ></div>
          </div>
        </div>

        {/* Right */}
        <div className="col-span-3">
          <div className="flex flex-col gap-5">
            <h1 className="text-lg font-bold">Other posts you may like</h1>
            {others.data
              ?.filter((item) => item.id != id)
              .slice(0, 3)
              .map((post) => (
                <div key={post.id} className="flex flex-col gap-2">
                  <img
                    className="h-48 w-full object-cover"
                    src={post.image}
                    alt=""
                  />
                  <h2>{post.title}</h2>
                  <Link href={`${post.id}`}>
                    <button className="border-none bg-teal-400 p-2 text-sm text-black">
                      Read More
                    </button>
                  </Link>
                </div>
              ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Post;
