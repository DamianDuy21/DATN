import { useMutation } from "@tanstack/react-query";
import {
  LoaderIcon,
  MapPinIcon,
  RotateCcwKey,
  ShuffleIcon,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router";
import CostumedSelect from "../components/CostumedSelect.jsx";
import { showToast } from "../components/CostumedToast.jsx";
import { useAuthUser } from "../hooks/useAuthUser";
import { getLearningLanguagesAPI, getNativeLanguagesAPI } from "../lib/api.js";

const ProfilePage = () => {
  const { authUser } = useAuthUser();
  const { t } = useTranslation("profilePage");

  const [formState, setFormState] = useState({
    fullName: authUser?.fullName || "",
    bio: authUser?.bio || "",
    nativeLanguage: authUser?.nativeLanguage.name || "",
    learningLanguage: authUser?.learningLanguage.name || "",
    location: authUser?.location || "",
    profilePic: authUser?.profilePic || "",
  });

  const [nativeLanguageSelection, setNativeLanguageSelection] = useState([]);
  const [learningLanguageSelection, setLearningLanguageSelection] = useState(
    []
  );

  const [nativeLanguage, setNativeLanguage] = useState(
    authUser?.nativeLanguage || ""
  );
  const [learningLanguage, setLearningLanguage] = useState(
    authUser?.learningLanguage || ""
  );

  const { mutate: getNativeLanguagesMutation } = useMutation({
    mutationFn: getNativeLanguagesAPI,
    onSuccess: (data) => {
      setNativeLanguageSelection(data?.data);
    },
    onError: (error) => {
      showToast({
        message:
          error.response.data.message || "Failed to fetch native languages",
        type: "error",
      });
    },
  });

  const { mutate: getLearningLanguagesMutation } = useMutation({
    mutationFn: getLearningLanguagesAPI,
    onSuccess: (data) => {
      setLearningLanguageSelection(data?.data);
    },
    onError: (error) => {
      showToast({
        message:
          error.response.data.message || "Failed to fetch learning languages",
        type: "error",
      });
    },
  });

  const handleRandomAvatar = () => {
    const idx = Math.floor(Math.random() * 100) + 1; // 1-100 included
    const randomAvatar = `https://avatar.iran.liara.run/public/${idx}.png`;

    setFormState({ ...formState, profilePic: randomAvatar });
    showToast({
      message: "Random avatar generated successfully!",
      type: "success",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // onboardingMutation(formState);
  };

  useEffect(() => {
    getNativeLanguagesMutation();
    getLearningLanguagesMutation();
  }, []);

  return (
    <>
      <div className="min-h-[calc(100vh-64px)]  flex items-center justify-center p-4 sm:p-6 lg:p-6">
        <div className="card bg-base-200 w-full max-w-3xl shadow-lg">
          <div className="card-body p-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-center mb-4">
              {t("hero.title")}
            </h1>

            <form action="" onSubmit={handleSubmit} className="space-y-3">
              {/* PROFILE PIC CONTAINER */}
              <div className="flex flex-col items-center justify-center space-y-4">
                {/* IMAGE PREVIEW */}
                <div className="size-32 rounded-full bg-base-200 overflow-hidden">
                  {formState.profilePic ? (
                    <img
                      src={
                        formState.profilePic ||
                        "https://avatar.iran.liara.run/public/20.png"
                      }
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      <img
                        src={
                          formState.profilePic ||
                          "https://avatar.iran.liara.run/public/20.png"
                        }
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                </div>

                {/* Generate Random Avatar Button */}
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleRandomAvatar}
                    className="btn btn-secondary"
                  >
                    <ShuffleIcon className="size-4" />
                    {t("hero.genAvatarButton")}
                  </button>
                </div>
              </div>

              {/* EMAIL */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">{t("form.email.label")}</span>
                  </label>
                  <input
                    type="text"
                    name="email"
                    value={authUser.email}
                    className="input input-bordered w-full pointer-events-none text-sm"
                    placeholder={t("form.email.placeholder")}
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">
                      {t("form.fullName.label")}
                    </span>
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formState.fullName}
                    onChange={(e) =>
                      setFormState({ ...formState, fullName: e.target.value })
                    }
                    className="input input-bordered w-full pointer-events-none text-sm"
                    placeholder={t("form.fullName.placeholder")}
                  />
                </div>
              </div>

              <div className="!mt-6">
                <Link to="/change-password" className="btn btn-primary">
                  <RotateCcwKey className="size-4" />
                  {t("form.changePasswordButton")}
                </Link>
              </div>

              {/* BIO */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">{t("form.bio.label")}</span>
                </label>
                <textarea
                  name="bio"
                  value={formState.bio}
                  onChange={(e) =>
                    setFormState({ ...formState, bio: e.target.value })
                  }
                  className="textarea textarea-bordered h-24"
                  placeholder={t("form.bio.placeholder")}
                />
              </div>

              {/* LANGUAGES */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* NATIVE LANGUAGE */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">
                      {t("form.nativeLanguage.label")}
                    </span>
                  </label>
                  {/* <select
                    name="nativeLanguage"
                    value={formState.nativeLanguage.toLowerCase()}
                    onChange={(e) =>
                      setFormState({
                        ...formState,
                        nativeLanguage: e.target.value,
                      })
                    }
                    className="select select-bordered w-full"
                  >
                    <option value="">Select your native language</option>
                    {LANGUAGES.map((lang) => (
                      <option key={`native-${lang}`} value={lang.toLowerCase()}>
                        {lang}
                      </option>
                    ))}
                  </select> */}
                  <CostumedSelect
                    placeholder={t("form.nativeLanguage.placeholder")}
                    options={nativeLanguageSelection}
                    onSelect={(option) => setNativeLanguage(option)}
                    defaultValue={nativeLanguage}
                  />
                </div>

                {/* LEARNING LANGUAGE */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">
                      {t("form.learningLanguage.label")}
                    </span>
                  </label>
                  {/* <select
                    name="learningLanguage"
                    value={formState.learningLanguage.toLowerCase()}
                    onChange={(e) =>
                      setFormState({
                        ...formState,
                        learningLanguage: e.target.value,
                      })
                    }
                    className="select select-bordered w-full"
                  >
                    <option value="">Select language you're learning</option>
                    {LANGUAGES.map((lang) => (
                      <option
                        key={`learning-${lang}`}
                        value={lang.toLowerCase()}
                      >
                        {lang}
                      </option>
                    ))}
                  </select> */}
                  <CostumedSelect
                    placeholder={t("form.learningLanguage.placeholder")}
                    options={learningLanguageSelection}
                    onSelect={(option) => setLearningLanguage(option)}
                    defaultValue={learningLanguage}
                  />
                </div>
              </div>

              {/* LOCATION */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">{t("form.location.label")}</span>
                </label>
                <div className="relative">
                  <MapPinIcon className="absolute top-1/2 transform -translate-y-1/2 left-3 size-5 text-base-content opacity-70" />
                  <input
                    type="text"
                    name="location"
                    value={formState.location}
                    onChange={(e) =>
                      setFormState({ ...formState, location: e.target.value })
                    }
                    className="input input-bordered w-full pl-10 text-sm"
                    placeholder={t("form.location.placeholder")}
                  />
                </div>
              </div>

              {/* SUBMIT BUTTON */}
              <button
                className="btn btn-primary w-full !mt-6"
                disabled={false}
                type="submit"
              >
                {true ? (
                  <>{t("form.submitButton.text")}</>
                ) : (
                  <>
                    <LoaderIcon className="animate-spin size-5" />
                    {t("form.submitButton.loadingText")}
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
