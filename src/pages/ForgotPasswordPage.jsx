import { ArrowLeft, LoaderIcon } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { showToast } from "../components/CostumedToast";
import { axiosInstance } from "../lib/axiosInstance";

const ForgotPasswordPage = () => {
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [resetCode, setResetCode] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleCheckValidEmail = async (e) => {
    e.preventDefault();
    if (!email) {
      showToast({
        message: "Email is required",
        type: "error",
      });
      return;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      showToast({
        message: "Invalid email format",
        type: "error",
      });
      return;
    }

    try {
      const response = await axiosInstance.post("/auth/reset-password", {
        email,
      });
      showToast({
        message: "Reset code sent to your email",
        type: "success",
      });
      setStep(2);
    } catch (error) {
      console.error(error);
      showToast({
        message: error?.message || "Failed to send reset code",
        type: "error",
      });
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    try {
      if (!newPassword || !resetCode) {
        showToast({
          message: "New password and reset code are required",
          type: "error",
        });
        return;
      }
      const passwordIsValid =
        newPassword.length >= 8 &&
        /[A-Z]/.test(newPassword) &&
        /[a-z]/.test(newPassword) &&
        /[0-9]/.test(newPassword) &&
        /[!@#$%^&*(),.?":{}|<>]/.test(newPassword);
      if (!passwordIsValid) {
        showToast({
          message:
            "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character",
          type: "error",
        });
        return;
      }
      showToast({
        message: "Password reset successful",
        type: "success",
      });
      navigate("/login");
    } catch (error) {
      console.error(error);
      showToast({
        message: error?.message || "Failed to reset password",
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
        <div className="border border-primary/25 flex flex-col lg:flex-row w-full max-w-xl mx-auto bg-base-200 rounded-xl shadow-lg overflow-hidden">
          <div className="w-full p-8 flex flex-col">
            {step === 1 ? (
              <form onSubmit={(e) => handleCheckValidEmail(e)} action="">
                <div className="space-y-4">
                  <div>
                    <h2 className="text-xl font-semibold">Forgot Password</h2>
                    <p className="text-sm opacity-70">
                      Enter your email to get the reset code
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
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                  </div>

                  {/* SIGNUP BUTTON */}
                  <button
                    className="btn btn-primary w-full !mt-6"
                    type="submit"
                  >
                    {true ? (
                      "Send code"
                    ) : (
                      <>
                        <LoaderIcon className="animate-spin size-5" />
                        Loading...
                      </>
                    )}
                  </button>

                  {/* REDIRECT LOGIN */}
                  <div className="text-center !mt-6">
                    <p className="text-sm">
                      <Link
                        to="/login"
                        className="text-primary hover:underline"
                      >
                        Back to Sign in
                      </Link>
                    </p>
                  </div>
                </div>
              </form>
            ) : (
              <form onSubmit={(e) => handleResetPassword(e)} action="">
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <ArrowLeft
                      className="text-primary size-6 cursor-pointer"
                      onClick={() => setStep(1)}
                    />
                    <div>
                      <h2 className="text-xl font-semibold">Forgot Password</h2>
                      <p className="text-sm opacity-70">
                        Enter the reset code and your new password
                      </p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    {/* NEW PASSWORD */}
                    <div className="form-control w-full">
                      <label className="label">
                        <span className="label-text">New Password</span>
                      </label>
                      <input
                        type="password"
                        placeholder="Enter your new password"
                        className="input input-bordered w-full"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                      />
                      {/* <p className="text-xs opacity-70 mt-1">
                        Password must be at least 6 characters long.
                      </p> */}
                    </div>
                    {/* REST CODE */}
                    <div className="form-control w-full">
                      <label className="label">
                        <span className="label-text">Reset Code</span>
                      </label>
                      <input
                        type="text"
                        placeholder="Enter your reset code"
                        className="input input-bordered w-full"
                        value={resetCode}
                        onChange={(e) => setResetCode(e.target.value)}
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
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgotPasswordPage;
