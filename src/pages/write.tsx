import React, { useCallback, useState } from "react";
import type { NextPage } from "next";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "react-quill/dist/quill.snow.css";
import { trpc } from "../utils/trpc";
import { useRouter } from "next/router";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import MenuBar from "../components/Menubar";
import Link from "@tiptap/extension-link";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import Image from "@tiptap/extension-image";
import { useSession } from "next-auth/react";
import { lowlight } from "lowlight/lib/core";

import { requireAuth } from "../common/requireAuth";

export const getServerSideProps = requireAuth(async (ctx) => {
  return { props: {} };
});

const Write: NextPage = () => {
  const [title, setTitle] = useState("");
  const [selectedFile, setSelectedFile] = useState<File>();
  const [desc, setDesc] = useState("");
  const router = useRouter();
  const { data } = useSession();
  const [image, setImage] = useState("");

  const fileToDataUri = (file: File) =>
    new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (event: ProgressEvent<FileReader>) => {
        resolve(event.target?.result);
      };
      reader.readAsDataURL(file);
    });

  const editor = useEditor({
    extensions: [
      StarterKit,
      Image,
      Link.configure({
        openOnClick: true,
      }),
      CodeBlockLowlight.configure({
        lowlight,
      }),
    ],
    editorProps: {
      attributes: {
        class:
          "ProseMirror focus:outline-none text-black border border-solid border-black min-h-[350px] p-2",
      },
    },
    content: "<p>Hello World! 🌎️</p>",
  });

  const setLink = useCallback(() => {
    const url = window.prompt("URL", "");

    // cancelled
    if (url === null) {
      return;
    }

    // empty
    if (url === "") {
      editor?.chain().focus().extendMarkRange("link").unsetLink().run();

      return;
    }

    // update link
    editor
      ?.chain()
      .focus()
      .extendMarkRange("link")
      .setLink({ href: url })
      .run();
  }, [editor]);

  const addImage = useCallback(() => {
    const url = window.prompt("URL");

    if (url) {
      editor?.chain().focus().setImage({ src: url }).run();
    }
  }, [editor]);

  const mutation = trpc.useMutation(["posts.addPost"], {
    onSuccess: () => {
      router.replace("/");
    },
  });

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = event.target.files;
    if (!fileList) return;
    setSelectedFile(fileList[0]);
  };

  const handleSubmission = () => {
    if (selectedFile) {
      const stuff = editor?.getHTML();

      fileToDataUri(selectedFile).then((dataUri) => {
        setImage(dataUri as string);

        mutation.mutate({
          title: title,
          authorId: data?.user.uid ?? "",
          description: desc,
          body: stuff ?? "",
          image: image,
        });
      });
    }
  };

  if (!editor) {
    return null;
  }

  return (
    <>
      <Navbar />
      <div className="m-auto max-w-5xl">
        <div className="mt-10 grid grid-cols-10 gap-10">
          <div className="col-span-7 space-y-4">
            <input
              required
              className="w-full border border-solid border-gray-300 p-2"
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <textarea
              className="w-full border border-solid border-gray-300 p-2"
              name="desc"
              id="desc"
              placeholder="Description"
              cols={30}
              rows={3}
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
            ></textarea>

            <div className="space-y-2">
              <MenuBar setLink={setLink} addImage={addImage} editor={editor} />

              <EditorContent editor={editor} />
            </div>
          </div>
          <div className="col-span-3">
            <div className="flex flex-col justify-between gap-2 border border-solid border-gray-300 p-3 text-sm">
              <input
                required
                style={{ display: "none" }}
                type="file"
                name="file"
                id="file"
                onChange={changeHandler}
              />
              <label
                className=" cursor-pointer bg-teal-300 p-2 text-center text-black"
                htmlFor="file"
              >
                Upload Image
              </label>
              <button
                onClick={handleSubmission}
                className="bg-teal-300 p-2 text-black"
              >
                Publish
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Write;
