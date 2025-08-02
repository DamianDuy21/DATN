import { useMutation, useQueryClient } from "@tanstack/react-query";
import { LoaderIcon, MapPinIcon, ShuffleIcon } from "lucide-react";
import { useEffect, useState } from "react";

import { useTranslation } from "react-i18next";
import CostumedSelect from "../components/CostumedSelect.jsx";
import { showToast } from "../components/CostumedToast.jsx";
import LocaleSwitcher from "../components/LocaleSwitcher.jsx";
import { useAuthUser } from "../hooks/useAuthUser";
import {
  getLearningLanguagesAPI,
  getNativeLanguagesAPI,
  onboardingAPI,
} from "../lib/api";
import { deepTrimObj } from "../lib/utils.js";

const OnboardingPage = () => {
  const { t } = useTranslation("onboardingPage");
  const { authUser } = useAuthUser();

  const [nativeLanguageSelection, setNativeLanguageSelection] = useState([]);
  const [learningLanguageSelection, setLearningLanguageSelection] = useState(
    []
  );

  const queryClient = useQueryClient();
  const [formState, setFormState] = useState({
    fullName: authUser?.fullName || "",
    bio: authUser?.bio || "",
    nativeLanguage: authUser?.nativeLanguage || "",
    learningLanguage: authUser?.learningLanguage || "",
    location: authUser?.location || "",
    profilePic: authUser?.profilePic || "",
  });
  const [nativeLanguage, setNativeLanguage] = useState(
    authUser?.nativeLanguage || ""
  );
  const [learningLanguage, setLearningLanguage] = useState(
    authUser?.learningLanguage || ""
  );
  const [isAvatarGeneratedFirstTime, setIsAvatarGeneratedFirstTime] =
    useState(true);

  const { mutate: getNativeLanguagesMutation } = useMutation({
    mutationFn: getNativeLanguagesAPI,
    onSuccess: (data) => {
      setNativeLanguageSelection(data?.data);
    },
    onError: (error) => {
      showToast({
        message:
          error.response.data.message ||
          t("toast.getNativeLanguagesMutation.error"),
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
          error.response.data.message ||
          t("toast.getLearningLanguagesMutation.error"),
        type: "error",
      });
    },
  });

  const { mutate: onboardingMutation, isPending: isOnboarding } = useMutation({
    mutationFn: onboardingAPI,
    onSuccess: (data) => {
      showToast({
        message: data?.message || t("toast.onboardingMutation.success"),
        type: "success",
      });
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
    },
    onError: (error) => {
      showToast({
        message:
          error.response.data.message || t("toast.onboardingMutation.error"),
        type: "error",
      });
    },
  });

  const handleRandomAvatar = () => {
    const idx = Math.floor(Math.random() * 100) + 1; // 1-100 included
    const randomAvatar = `https://avatar.iran.liara.run/public/${idx}.png`;

    setFormState({ ...formState, profilePic: randomAvatar });
    if (!isAvatarGeneratedFirstTime) {
      showToast({
        message: t("toast.handleRandomAvatar.success"),
        type: "success",
      });
    }
    setIsAvatarGeneratedFirstTime(false);
  };

  const validateOnboardingData = () => {
    const trimmedFormState = deepTrimObj(formState);
    trimmedFormState.nativeLanguageId = nativeLanguage.id;
    trimmedFormState.learningLanguageId = learningLanguage.id;
    console.log(nativeLanguage, learningLanguage);
    const onboardingData = {
      bio: trimmedFormState.bio,
      location: trimmedFormState.location,
      nativeLanguageId: trimmedFormState.nativeLanguageId,
      learningLanguageId: trimmedFormState.learningLanguageId,
    };
    if (!nativeLanguage.id || !learningLanguage.id) {
      return {
        message: t("toast.validateOnboardingData.error"),
        cleanedData: onboardingData,
      };
    }
    return { message: null, cleanedData: onboardingData };
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { message, cleanedData: onboardingData } = validateOnboardingData();
    if (message) {
      showToast({
        message,
        type: "error",
      });
      return;
    }
    try {
      onboardingMutation(onboardingData);
    } catch (error) {
      console.error("Onboarding failed:", error);
      showToast({
        message: error?.message || t("toast.handleSubmit.error"),
        type: "error",
      });
    }
  };

  useEffect(() => {
    handleRandomAvatar();
  }, [authUser]);
  useEffect(() => {
    getNativeLanguagesMutation();
    getLearningLanguagesMutation();
  }, []);

  return (
    <>
      <div
        className="min-h-screen  flex items-center justify-center p-4 sm:p-6 lg:p-8"
        data-theme="night"
      >
        <div className="card bg-base-200 w-full max-w-3xl shadow-lg">
          <div className="card-body p-8 pb-4">
            <h1 className="text-3xl font-bold text-center mb-4">
              {t("hero.title")}
            </h1>

            <form action="" onSubmit={handleSubmit} className="space-y-3">
              {/* PROFILE PIC CONTAINER */}
              <div className="flex flex-col items-center justify-center space-y-4">
                {/* IMAGE PREVIEW */}
                <div className="size-32 rounded-full bg-base-200 overflow-hidden">
                  {formState.profilePic ? (
                    <img
                      src={formState.profilePic}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      {/* <CameraIcon className="size-12 text-base-content opacity-40" /> */}
                    </div>
                  )}
                </div>

                {/* Generate Random Avatar Button */}
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleRandomAvatar}
                    className="btn btn-accent"
                  >
                    <ShuffleIcon className="size-4" />
                    {t("hero.genAvatarButton")}
                  </button>
                </div>
              </div>

              {/* FULL NAME */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">{t("form.fullName.label")}</span>
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
                    value={formState.nativeLanguage}
                    onChange={(e) =>
                      setFormState({
                        ...formState,
                        nativeLanguage: e.target.value,
                      })
                    }
                    className="select select-bordered w-full custom-select"
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
                    value={formState.learningLanguage}
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
                disabled={isOnboarding}
                type="submit"
              >
                {!isOnboarding ? (
                  <>{t("form.button.text")}</>
                ) : (
                  <>
                    <LoaderIcon className="animate-spin size-5" />
                    {t("form.button.loadingText")}
                  </>
                )}
              </button>
            </form>
            <div className="flex items-center justify-center mt-2">
              <LocaleSwitcher bordered={true} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OnboardingPage;
