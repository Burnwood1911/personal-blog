import React, { useState } from "react";
import type { NextPage } from "next";
import { trpc } from "../utils/trpc";
import { useRouter } from "next/router";

interface RegisterFields {
  username: string;
  email: string;
  password: string;
  image: string;
}

const Register: NextPage = () => {
  const router = useRouter();
  const [inputs, setInputs] = useState<RegisterFields>({
    username: "",
    email: "",
    password: "",
    image:
      "https://t3.ftcdn.net/jpg/02/95/94/94/360_F_295949484_8BrlWkTrPXTYzgMn3UebDl1O13PcVNMU.jpg",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const mutation = trpc.useMutation(["auth.register"], {
    onSuccess: () => {
      router.replace("/login");
    },
  });

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutation.mutate(inputs);
  };

  return (
    <div className="flex h-screen flex-col items-center justify-center bg-[#b9e7e7]">
      <h1 className="mb-2 text-xl font-bold text-teal-700">Register</h1>
      <form
        onSubmit={handleLogin}
        className="w-54 flex flex-col items-center justify-center space-y-4 rounded-sm bg-white p-5"
      >
        <input
          required
          className="border-0 border-b border-solid border-gray-300 p-2 outline-none"
          type="text"
          placeholder="username"
          name="username"
          value={inputs.username}
          onChange={handleChange}
        />
        <input
          required
          className="border-0 border-b border-solid border-gray-300 p-2 outline-none"
          type="email"
          placeholder="email"
          name="email"
          value={inputs.email}
          onChange={handleChange}
        />
        <input
          required
          className="border-0 border-b border-solid border-gray-300 p-2 outline-none"
          type="password"
          placeholder="password"
          name="password"
          value={inputs.password}
          onChange={handleChange}
        />
        <button
          type="submit"
          className=" w-full cursor-pointer bg-teal-700 p-2 text-white"
        >
          Register
        </button>
        {mutation.error && (
          <p className="text-center text-sm text-red-600">
            {mutation.error.message}
          </p>
        )}
      </form>
    </div>
  );
};

export default Register;
