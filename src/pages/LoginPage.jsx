import { Hexagon, LoaderIcon } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";
import { useLogin } from "../hooks/useLogin.js";
import { showToast } from "../components/CostumedToast.jsx";

const LoginPage = () => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [isCheckedPolicy, setIsCheckedPolicy] = useState(false);

  const { mutate: loginMutation, isPending, error } = useLogin(loginData);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      if (!loginData.email || !loginData.password) {
        showToast({
          message: "Email and password are required",
          type: "error",
        });
      } else if (!isCheckedPolicy) {
        showToast({
          message: "You must accept the terms and conditions",
          type: "error",
        });
      } else {
        loginMutation();
      }
    } catch (error) {
      console.error(error);
      showToast({
        message: error?.message || "Login failed. Please try again.",
        type: "error",
      });
    }
  };
  return (
    <>
      <div
        className="flex items-center justify-center h-screen p-4 sm:p-6 md:p-8"
        data-theme="night"
      >
        <div className="border border-primary/25 flex flex-col lg:flex-row w-full max-w-xl lg:max-w-5xl mx-auto bg-base-200 rounded-xl shadow-lg overflow-hidden">
          {/* SIGNUP FORM - LEFT SIDE */}
          <div className="w-full lg:w-1/2 p-8 flex flex-col">
            {/* LOGO */}
            <div className="mb-4 flex items-center justify-start gap-2">
              <Hexagon className="size-8 text-primary" />
              <span className="text-3xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary tracking-wider">
                Chatify
              </span>
            </div>

            <div className="w-full">
              {/* arrow function need to pass event or else not working in onSubmit? */}
              <form onSubmit={(e) => handleLogin(e)} action="">
                <div className="space-y-4">
                  <div>
                    <h2 className="text-xl font-semibold">Welcome back</h2>
                    <p className="text-sm opacity-70">
                      Sign in to continue your language journey
                    </p>
                  </div>
                  <div className="space-y-3">
                    {/* EMAIL */}
                    <div className="form-control w-full">
                      <label className="label">
                        <span className="label-text">Email</span>
                      </label>
                      <input
                        type="text"
                        placeholder="damianduy@example.com"
                        className="input input-bordered w-full"
                        value={loginData.email}
                        onChange={(e) =>
                          setLoginData({
                            ...loginData,
                            email: e.target.value,
                          })
                        }
                      />
                    </div>

                    {/* PASSWORD */}
                    <div className="form-control w-full">
                      <label className="label">
                        <span className="label-text">Password</span>
                      </label>
                      <input
                        type="password"
                        placeholder="********"
                        className="input input-bordered w-full"
                        value={loginData.password}
                        onChange={(e) =>
                          setLoginData({
                            ...loginData,
                            password: e.target.value,
                          })
                        }
                      />
                      {/* <p className="text-xs opacity-70 mt-1">
                        Password must be at least 6 characters long.
                      </p> */}
                    </div>

                    {/* ACCEPT TERMS */}
                    <div className="form-control">
                      <label className="label cursor-pointer justify-start gap-2">
                        <input
                          type="checkbox"
                          className="checkbox checkbox-sm"
                          checked={isCheckedPolicy}
                          onChange={() => {
                            setIsCheckedPolicy(!isCheckedPolicy);
                          }}
                        />
                        <span className="text-xs leading-tight">
                          I agree to the{" "}
                          <span className="text-primary hover:underline">
                            terms of service
                          </span>{" "}
                          and{" "}
                          <span className="text-primary hover:underline">
                            privacy policy
                          </span>
                        </span>
                      </label>
                    </div>
                  </div>

                  {/* SIGNUP BUTTON */}
                  <button className="btn btn-primary w-full" type="submit">
                    {isPending ? (
                      <>
                        <LoaderIcon className="animate-spin size-5" />
                        Loading...
                      </>
                    ) : (
                      "Sign in"
                    )}
                  </button>

                  {/* REDIRECT LOGIN */}
                  <div className="text-center !mt-6">
                    <p className="text-sm">
                      Don't have an account?{" "}
                      <Link
                        to="/signup"
                        className="text-primary hover:underline"
                      >
                        Sign up
                      </Link>
                    </p>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="flex-1 h-px bg-gray-600"></div>
                    <span className="text-gray-500 text-sm">or</span>
                    <div className="flex-1 h-px bg-gray-600"></div>
                  </div>

                  <div className="text-center mt-4">
                    <p className="text-sm">
                      Forgot your password?{" "}
                      <Link
                        to="/forgot-password"
                        className="text-primary hover:underline"
                      >
                        Reset it
                      </Link>
                    </p>
                  </div>
                </div>
              </form>
            </div>
          </div>

          {/* SIGNUP FORM - RIGHT SIDE */}
          <div className="hidden lg:flex w-full lg:w-1/2 bg-primary/10 items-center justify-center !min-h-[612px]">
            <div className="max-w-md p-8">
              {/* Illustration */}
              <div className="relative aspect-square max-w-sm mx-auto">
                <img
                  src="/signup_pic.png"
                  alt="Language connection illustration"
                  className="w-full h-full"
                />
              </div>

              <div className="text-center space-y-3 mt-6">
                <h2 className="text-xl font-semibold">
                  Connect with language partners worldwide
                </h2>
                <p className="opacity-70 text-sm">
                  Practice conversations, make friends, and improve your
                  language skills together
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
