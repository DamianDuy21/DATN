import { ArrowLeft, LoaderIcon } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";

const ChangePasswordPage = () => {
  const [step, setStep] = useState(1);
  const [oldPassword, setOldPassword] = useState("");
  const [resetCode, setResetCode] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setStep(2);
  };
  return (
    <>
      <div className="flex items-center justify-center min-h-[calc(100vh-64px)] p-4 sm:p-6 md:p-8">
        <div className="border border-primary/25 flex flex-col lg:flex-row w-full max-w-xl mx-auto bg-base-200 rounded-xl shadow-lg overflow-hidden">
          <div className="w-full p-8 flex flex-col">
            {step === 1 ? (
              <form onSubmit={(e) => handleLogin(e)} action="">
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
                        className="input input-bordered w-full"
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
                        className="input input-bordered w-full"
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
            ) : (
              <form onSubmit={(e) => handleLogin(e)} action="">
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <ArrowLeft
                      className="text-primary size-6 cursor-pointer"
                      onClick={() => setStep(1)}
                    />
                    <div>
                      <h2 className="text-xl font-semibold">Change Password</h2>
                      <p className="text-sm opacity-70">Enter the reset code</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    {/* RESET CODE */}
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
                        required
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

export default ChangePasswordPage;
