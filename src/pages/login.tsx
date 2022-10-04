import React, { useState } from "react";
import type { NextPage } from "next";
import { signIn } from "next-auth/react";
import { useCallback } from "react";

interface LoginFields {
  email: string;
  password: string;
}

const Login: NextPage = () => {
  const [inputs, setInputs] = useState<LoginFields>({
    email: "",
    password: "",
  });

  const onSubmit = useCallback(async (data: LoginFields) => {
    await signIn("credentials", { ...data, callbackUrl: "/" });
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(inputs);
  };
  return (
    <div className="flex h-screen flex-col items-center justify-center bg-[#b9e7e7]">
      <h1 className="mb-2 text-xl font-bold text-teal-700">Login</h1>
      <form
        onSubmit={handleLogin}
        className="w-54 flex flex-col items-center justify-center space-y-4 rounded-sm bg-white p-5"
      >
        <input
          required
          className="border-0 border-b border-solid border-gray-300 p-2 outline-none"
          type="email"
          placeholder="email"
          name="email"
          onChange={handleChange}
        />
        <input
          required
          className="border-0 border-b border-solid border-gray-300 p-2 outline-none"
          type="password"
          placeholder="password"
          name="password"
          onChange={handleChange}
        />
        <button
          type="submit"
          className=" w-full cursor-pointer bg-teal-700 p-2 text-white"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
