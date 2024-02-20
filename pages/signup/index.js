import cognitoPool from "@/aws/cognito-identity-client";
import { AccountContext } from "@/context/account";
import { CognitoUser } from "amazon-cognito-identity-js";
import Link from "next/link";
import { useContext, useState } from "react";
export default function SignUp() {
  const [email, setEmail] = useState("cavevar997@laymro.com");
  const [password, setPassword] = useState("Password@12345");
  const [confirmPassword, setConfirmPassword] = useState("Password@12345");
  const [otp, setOtp] = useState("");
  const [username, setUsername] = useState("john");
  const [name, setName] = useState("John Doe");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const { signUp } = useContext(AccountContext);
  const handleSignUp = async () => {
    const isSignedUp = await signUp(username, password, email, name);
    if (isSignedUp) {
      setIsOtpSent(true);
    }
  };

  const handleVerifyOtp = () => {
    const userData = {
      Username: username,
      Pool: cognitoPool,
    };
    const cognitoUser = new CognitoUser(userData);
    cognitoUser.confirmRegistration(otp, true, (err, result) => {
      if (err) {
        console.error(err);
        alert(err.message || JSON.stringify(err));
        return;
      }
      if (result === "SUCCESS") {
        window.location.href = "/login";
      }
    });
  };

  const handleResendOtp = () => {
    const userData = {
      Username: email,
      Pool: cognitoPool,
    };
    const cognitoUser = new CognitoUser(userData);
    cognitoUser.resendConfirmationCode((err, result) => {
      if (err) {
        console.error(err);
        alert(err.message || JSON.stringify(err));
        return;
      }
      if (result) {
        alert("OTP sent successfully");
      }
    });
  };

  return (
    <>
      <div className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden">
        <div className="w-full p-6 bg-white rounded-md shadow-md lg:max-w-xl">
          <h1 className="text-3xl font-bold text-center text-gray-700">
            ShortURL
          </h1>
          {isOtpSent ? (
            <div className="mt-6">
              <div className="mb-4">
                <label
                  htmlFor="otp"
                  className="block text-sm font-semibold text-gray-800"
                >
                  OTP
                </label>
                <input
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
                />
              </div>
              <div className="mt-2">
                <button
                  onClick={handleVerifyOtp}
                  className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
                >
                  Verify OTP
                </button>
              </div>{" "}
              <div className="mt-2">
                <button
                  onClick={handleResendOtp}
                  className="w-full px-4 py-2 tracking-wide border-2 hover:text-white transition-colors duration-200 transform  rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
                >
                  Resend OTP
                </button>
              </div>
            </div>
          ) : (
            <>
              <div className="mb-4 mt-6">
                <label
                  htmlFor="name"
                  className="block text-sm font-semibold text-gray-800"
                >
                  Name
                </label>
                <input
                  type="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
                />
              </div>
              <div className="mb-4 mt-6">
                <label
                  htmlFor="name"
                  className="block text-sm font-semibold text-gray-800"
                >
                  Username
                </label>
                <input
                  type="name"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-semibold text-gray-800"
                >
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
              <div className="mb-2">
                <label
                  htmlFor="confirmpassword"
                  className="block text-sm font-semibold text-gray-800"
                >
                  Confirm Password
                </label>
                <input
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  type="password"
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
                />
              </div>

              <div className="mt-2">
                <button
                  onClick={handleSignUp}
                  className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
                >
                  Sign Up
                </button>
              </div>
            </>
          )}

          <p className="mt-4 text-sm text-center text-gray-700">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-medium text-blue-600 hover:underline"
            >
              Login
            </Link>
          </p>
          <p className="text-red-500 text-center">
            {" "}
            These are test user credentials!
          </p>
        </div>
      </div>
    </>
  );
}
