import { AccountContext } from "@/context/account";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("cavevar997@laymro.com");
  const [password, setPassword] = useState("Password@12345");
  const { signIn, isLoggedIn } = useContext(AccountContext);

  const handleLogin = async () => {
    const signInUser = await signIn(email, password);
    if (signInUser) {
      window.location.href = "/";
    }
  };

  //  if(isLoggedIn){
  //    window.location.href = "/";
  //   }

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden">
      <div className="w-full p-6 bg-white rounded-md shadow-md lg:max-w-xl">
        <h1 className="text-3xl font-bold text-center text-gray-700">
          ShortURL
        </h1>
        <div className="mb-4 mt-6">
          <label
            htmlFor="email"
            className="block text-sm font-semibold text-gray-800"
          >
            Email
          </label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
          />
        </div>
        <div className="mb-2">
          <label
            htmlFor="password"
            className="block text-sm font-semibold text-gray-800"
          >
            Password
          </label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
          />
        </div>
        <Link href="/forget" className="text-xs text-blue-600 hover:underline">
          Forget Password?
        </Link>
        <div className="mt-2">
          <button
            onClick={handleLogin}
            className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
          >
            Login
          </button>
        </div>

        <p className="mt-4 text-sm text-center text-gray-700">
          Don&apos;t have an account?{" "}
          <Link
            href="/signup"
            className="font-medium text-blue-600 hover:underline"
          >
            Sign up
          </Link>
        </p>
        <p className="text-red-500 text-center">
          {" "}
          These are test user credentials!
        </p>
      </div>
    </div>
  );
}
