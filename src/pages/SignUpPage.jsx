import { ArrowLeft, Hexagon, LoaderIcon } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useSignUp } from "../hooks/useSignUp.js";
import { showToast } from "../components/CostumedToast.jsx";
import { axiosInstance } from "../lib/axiosInstance.js";

const SignUpPage = () => {
  const navigate = useNavigate();
  const [signUpData, setSignUpData] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  const [step, setStep] = useState(1);
  const [verificationCode, setVerificationCode] = useState("");
  const [isCheckedPolicy, setIsCheckedPolicy] = useState(false);

  const {
    mutateAsync: signUpMutation,
    isPending,
    error,
  } = useSignUp(signUpData);

  const validateSignUpData = (signUpData, isCheckedPolicy) => {
    const nameIsValid = /^[A-Za-zÀ-ỹ\s]+$/.test(signUpData.fullName);
    const emailIsValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(signUpData.email);
    const passwordIsValid =
      signUpData.password.length >= 8 &&
      /[A-Z]/.test(signUpData.password) &&
      /[a-z]/.test(signUpData.password) &&
      /[0-9]/.test(signUpData.password) &&
      /[!@#$%^&*(),.?":{}|<>]/.test(signUpData.password);

    if (!signUpData.fullName || !signUpData.email || !signUpData.password) {
      return "All fields are required";
    } else if (!nameIsValid) {
      return "Full name can only contain letters and spaces";
    } else if (!emailIsValid) {
      return "Invalid email format";
    } else if (!passwordIsValid) {
      return "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character";
    } else if (!isCheckedPolicy) {
      return "You must accept the terms and conditions";
    }

    return null; // dữ liệu hợp lệ
  };

  const handleCheckValidSignupData = async (e) => {
    e.preventDefault();
    try {
      const validationMessage = validateSignUpData(signUpData, isCheckedPolicy);

      if (validationMessage) {
        showToast({
          message: validationMessage,
          type: "error",
        });
        return;
      }

      await signUpMutation();
      setStep(2);
      showToast({
        message: "Please check your email for the verification code.",
        type: "success",
      });
    } catch (error) {
      console.error("Sign up failed:", error);
      showToast({
        message: error?.message || "Sign up failed. Please try again.",
        type: "error",
      });
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (!verificationCode) {
      showToast({
        message: "Please enter the verification code",
        type: "error",
      });
      return;
    }
    try {
      const response = await axiosInstance.post("/auth/signup/verify-otp", {
        otp: verificationCode,
      });
      navigate("/login");
      showToast({
        message: response.data.message || "Sign up successful! Please log in.",
        type: "success",
      });
    } catch (error) {
      console.error(error);
      showToast({
        message: error?.message || "Sign up failed. Please try again.",
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
        {step === 1 ? (
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
                <form onSubmit={(e) => handleCheckValidSignupData(e)} action="">
                  <div className="space-y-4">
                    <div>
                      <h2 className="text-xl font-semibold">
                        Create an Account
                      </h2>
                      <p className="text-sm opacity-70">
                        Join Chatify and start your language learning adventure!
                      </p>
                    </div>
                    <div className="space-y-3">
                      {/* FULL NAME */}
                      <div className="form-control w-full">
                        <label className="label">
                          <span className="label-text">Full Name</span>
                        </label>
                        <input
                          type="text"
                          placeholder="Damian Duy"
                          className="input input-bordered w-full"
                          value={signUpData.fullName}
                          onChange={(e) =>
                            setSignUpData({
                              ...signUpData,
                              fullName: e.target.value,
                            })
                          }
                        />
                      </div>

                      {/* EMAIL */}
                      <div className="form-control w-full">
                        <label className="label">
                          <span className="label-text">Email</span>
                        </label>
                        <input
                          type="text"
                          placeholder="damianduy@example.com"
                          className="input input-bordered w-full"
                          value={signUpData.email}
                          onChange={(e) =>
                            setSignUpData({
                              ...signUpData,
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
                          value={signUpData.password}
                          onChange={(e) =>
                            setSignUpData({
                              ...signUpData,
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
                            onChange={() =>
                              setIsCheckedPolicy(!isCheckedPolicy)
                            }
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
                      {false ? (
                        <>
                          <LoaderIcon className="animate-spin size-5" />
                          Loading...
                        </>
                      ) : (
                        "Create Account"
                      )}
                    </button>

                    {/* REDIRECT LOGIN */}
                    <div className="text-center !mt-6">
                      <p className="text-sm">
                        Already have an account?{" "}
                        <Link
                          to="/login"
                          className="text-primary hover:underline"
                        >
                          Sign in
                        </Link>
                      </p>
                    </div>
                  </div>
                </form>
              </div>
            </div>

            {/* SIGNUP FORM - RIGHT SIDE */}
            <div className="hidden lg:flex w-full lg:w-1/2 bg-primary/10 items-center justify-center">
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
        ) : (
          <div className="border border-primary/25 flex flex-col lg:flex-row w-full max-w-xl mx-auto bg-base-200 rounded-xl shadow-lg overflow-hidden">
            <div className="w-full p-8 flex flex-col">
              <form onSubmit={(e) => handleSignUp(e)} action="">
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <ArrowLeft
                      className="text-primary size-6 cursor-pointer"
                      onClick={() => setStep(1)}
                    />
                    <div>
                      <h2 className="text-xl font-semibold">Create Account</h2>
                      <p className="text-sm opacity-70">
                        Check your signup email for the verification code
                      </p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    {/* RESET CODE */}
                    <div className="form-control w-full">
                      <label className="label">
                        <span className="label-text">Verification Code</span>
                      </label>
                      <input
                        type="text"
                        placeholder="Enter your verification code"
                        className="input input-bordered w-full"
                        value={verificationCode}
                        onChange={(e) => setVerificationCode(e.target.value)}
                      />
                      <p className="text-sm text-primary hover:underline mt-2 text-end cursor-pointer">
                        Resend
                      </p>
                    </div>
                  </div>

                  <button
                    className="btn btn-primary w-full !mt-6"
                    type="submit"
                  >
                    {true ? (
                      "Confirm"
                    ) : (
                      <>
                        <LoaderIcon className="animate-spin size-5" />
                        Loading...
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default SignUpPage;
