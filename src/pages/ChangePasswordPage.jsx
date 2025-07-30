import { useMutation } from "@tanstack/react-query";
import { ArrowLeft, LoaderIcon } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router";

import { changePasswordAPI, changePasswordVerificationAPI } from "../lib/api";
import { showToast } from "../components/CostumedToast.jsx";

const ChangePasswordPage = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [oldPassword, setOldPassword] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const { mutateAsync: changePasswordMutation, isPending: isChangingPassword } =
    useMutation({
      mutationFn: changePasswordAPI,
      onSuccess: (data) => {
        showToast({
          message:
            data?.message ||
            "Please check your email for the verification code",
          type: "success",
        });
        setStep(2);
      },
      onError: (error) => {
        showToast({
          message:
            error?.response?.data?.message || "Failed to change password",
          type: "error",
        });
      },
    });

  const {
    mutateAsync: changePasswordVerificationMutation,
    isPending: isVerifyingCode,
  } = useMutation({
    mutationFn: changePasswordVerificationAPI,
    onSuccess: (data) => {
      showToast({
        message: data?.message || "Password changed successfully",
        type: "success",
      });
      navigate("/signin");
    },
    onError: (error) => {
      showToast({
        message:
          error?.response?.data?.message ||
          "Failed to verify verification code",
        type: "error",
      });
    },
  });

  const handleChangePassword = async (e) => {
    e.preventDefault();
    const trimmedOldPassword = oldPassword.trim();
    const trimmedNewPassword = newPassword.trim();
    if (!trimmedOldPassword || !trimmedNewPassword) {
      showToast({
        message: "Both fields are required",
        type: "error",
      });
      return;
    }
    try {
      changePasswordMutation({
        oldPassword: trimmedOldPassword,
        newPassword: trimmedNewPassword,
      });
    } catch (error) {
      showToast({
        message: error?.message || "Failed to change password",
        type: "error",
      });
    }
  };
  const handleChangePasswordVerification = async (e) => {
    e.preventDefault();
    const trimmedVerificationCode = verificationCode.trim();
    if (!trimmedVerificationCode) {
      showToast({
        message: "Verification code is required",
        type: "error",
      });
      return;
    }
    try {
      changePasswordVerificationMutation(trimmedVerificationCode);
    } catch (error) {
      showToast({
        message: error?.message || "Failed to verify verification code",
        type: "error",
      });
    }
  };

  return (
    <>
      <div className="flex items-center justify-center min-h-[calc(100vh-64px)] p-4 sm:p-6 md:p-8">
        <div className="border border-primary/25 flex flex-col lg:flex-row w-full max-w-xl mx-auto bg-base-200 rounded-xl shadow-lg overflow-hidden">
          <div className="w-full p-8 flex flex-col">
            {step === 1 ? (
              <form onSubmit={(e) => handleChangePassword(e)} action="">
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <Link to="/profile">
                      <ArrowLeft className="text-primary size-6 cursor-pointer" />
                    </Link>
                    <div>
                      <h2 className="text-xl font-semibold">Change Password</h2>
                      <p className="text-sm opacity-70">
                        Enter your old password and the new password
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {/* OLD PASSWORD */}
                    <div className="form-control w-full">
                      <label className="label">
                        <span className="label-text">Old Password</span>
                      </label>
                      <input
                        type="password"
                        placeholder="Enter your old password"
                        className="input input-bordered w-full text-sm"
                        value={oldPassword}
                        onChange={(e) => setOldPassword(e.target.value)}
                        required
                      />
                    </div>
                    {/* NEW PASSWORD */}
                    <div className="form-control w-full">
                      <label className="label">
                        <span className="label-text">New Password</span>
                      </label>
                      <input
                        type="password"
                        placeholder="Enter your new password"
                        className="input input-bordered w-full text-sm"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <button
                    className="btn btn-primary w-full !mt-6"
                    type="submit"
                  >
                    {!isChangingPassword ? (
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
            ) : (
              <form
                onSubmit={(e) => handleChangePasswordVerification(e)}
                action=""
              >
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <ArrowLeft
                      className="text-primary size-6 cursor-pointer"
                      onClick={() => setStep(1)}
                    />
                    <div>
                      <h2 className="text-xl font-semibold">Change Password</h2>
                      <p className="text-sm opacity-70">
                        Enter verification code
                      </p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    {/* VERIFICATION CODE */}
                    <div className="form-control w-full">
                      <label className="label">
                        <span className="label-text">Verification Code</span>
                      </label>
                      <input
                        type="text"
                        placeholder="Enter verification code"
                        className="input input-bordered w-full text-sm"
                        value={verificationCode}
                        onChange={(e) => setVerificationCode(e.target.value)}
                        required
                      />
                      <p
                        className="text-sm text-primary hover:underline mt-2 text-end cursor-pointer"
                        onClick={handleChangePassword}
                      >
                        Resend
                      </p>
                    </div>
                  </div>

                  <button
                    className="btn btn-primary w-full !mt-6"
                    type="submit"
                  >
                    {!isVerifyingCode ? (
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

export default ChangePasswordPage;
