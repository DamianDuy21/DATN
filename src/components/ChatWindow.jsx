import {
  AppWindow,
  BellIcon,
  Check,
  ChevronDown,
  ChevronsDown,
  ChevronsUp,
  ChevronUp,
  Forward,
  Paperclip,
  PictureInPicture2,
  Settings,
  Smile,
  Video,
  X,
} from "lucide-react";

import MockMessages from "./MockMessages";
import { use, useEffect, useState } from "react";

const ChatWindow = ({ user, onClick }) => {
  const [isOpenUtils, setIsOpenUtils] = useState(false);
  const [useUtils, setUseUtils] = useState({
    isOpenSettings: false,
    isOpenImagesVideos: false,
    isOpenFiles: false,
  });
  const [useSettings, setUseSettings] = useState({
    isOpenNotifications: false,
  });

  const [isOpenHeaderOptions, setIsOpenHeaderOptions] = useState(false);

  const [imagesVideos, setImagesVideos] = useState([
    "https://avatar.iran.liara.run/public/03.png",
    "https://avatar.iran.liara.run/public/04.png",
    "https://avatar.iran.liara.run/public/05.png",
    "https://avatar.iran.liara.run/public/06.png",
    "https://avatar.iran.liara.run/public/07.png",
    "https://avatar.iran.liara.run/public/08.png",
    "https://avatar.iran.liara.run/public/09.png",
    "https://avatar.iran.liara.run/public/10.png",
    "https://avatar.iran.liara.run/public/11.png",
    "https://avatar.iran.liara.run/public/03.png",
    "https://avatar.iran.liara.run/public/04.png",
    "https://avatar.iran.liara.run/public/05.png",
    "https://avatar.iran.liara.run/public/06.png",
    "https://avatar.iran.liara.run/public/07.png",
    "https://avatar.iran.liara.run/public/08.png",
    "https://avatar.iran.liara.run/public/09.png",
    "https://avatar.iran.liara.run/public/10.png",
    "https://avatar.iran.liara.run/public/11.png",
    "https://avatar.iran.liara.run/public/12.png",
  ]);

  const [files, setFiles] = useState([
    "https://avatar.iran.liara.run/public/03.png",
    "https://avatar.iran.liara.run/public/04.png",
  ]);

  useEffect(() => {
    const handleResize = () => {
      const windowWidth = window.innerWidth;
      if (windowWidth > 640) {
        setIsOpenHeaderOptions(false);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    setIsOpenUtils(false);
    setUseUtils({
      isOpenSettings: false,
      isOpenImagesVideos: false,
      isOpenFiles: false,
    });
    setUseSettings({
      isOpenNotifications: false,
    });
    setIsOpenHeaderOptions(false);
  }, [user]);

  return (
    <>
      <div className="h-[calc(100vh-64px)] flex relative">
        <div className="flex-1 ">
          {/* Header */}
          <div className="h-16 flex items-center justify-between px-4 border-b border-base-300">
            <div className="flex gap-3 items-center relative">
              <div className="avatar">
                <div className="w-10 rounded-full">
                  <img
                    src={
                      user?.profilePic ||
                      "https://avatar.iran.liara.run/public/21.png"
                    }
                    alt=""
                  />
                </div>
              </div>

              <div className="hidden sm:block">
                <h3 className="font-semibold text-sm">{user.fullName}</h3>
                <p className="text-xs text-success flex items-center gap-1">
                  <span className="size-2 rounded-full bg-success inline-block" />
                  Online
                </p>
              </div>
              <div className="absolute -right-0 -bottom-0 sm:hidden">
                <span className="size-2 rounded-full bg-success inline-block" />
              </div>
            </div>

            <div className={`flex ${isOpenUtils ? "pr-64 lg:pr-0" : ""}`}>
              <div
                className={`flex gap-4 ${isOpenUtils ? "hidden sm:flex" : ""}`}
              >
                <div className="flex gap-2">
                  <div
                    className={`btn btn-primary size-8 p-0 min-w-0 min-h-0 rounded-card cursor-pointer  text-sm flex items-center justify-center`}
                    onClick={() => {
                      //   setIsOpenFilter(true);
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                  >
                    <Video className="size-4" />
                  </div>
                  <div
                    className={`btn ${
                      isOpenUtils ? "btn-secondary" : "btn-primary"
                    } size-8 p-0 min-w-0 min-h-0 rounded-card cursor-pointer  text-sm flex items-center justify-center`}
                    onClick={() => {
                      setIsOpenUtils(!isOpenUtils);
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                  >
                    <AppWindow className="size-4" />
                  </div>
                </div>
                <div
                  className={`btn btn-primary size-8 p-0 min-w-0 min-h-0 rounded-card cursor-pointer  text-sm flex items-center justify-center`}
                  onClick={() => {
                    onClick(null);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                >
                  <X className="size-4" />
                </div>
              </div>

              {/* Option when the utils panel is open and screen is small */}
              <div
                className={`flex flex-col relative ${
                  isOpenUtils ? "block sm:hidden" : "hidden"
                }`}
              >
                <div
                  className={`btn btn-primary size-8 p-0 min-w-0 min-h-0 rounded-card cursor-pointer  text-sm flex items-center justify-center`}
                  onClick={() => {
                    setIsOpenHeaderOptions(!isOpenHeaderOptions);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                >
                  {isOpenHeaderOptions ? (
                    <ChevronUp className="size-4" />
                  ) : (
                    <ChevronDown className="size-4" />
                  )}
                </div>

                <div
                  className={`absolute top-12 -right-4 p-4 z-10 border border-primary/25 bg-base-200 rounded-card ${
                    isOpenHeaderOptions ? "" : "hidden"
                  }`}
                >
                  <div className={`flex flex-col gap-4`}>
                    <div
                      className={`btn btn-primary size-8 p-0 min-w-0 min-h-0 rounded-card cursor-pointer  text-sm flex items-center justify-center`}
                      onClick={() => {
                        onClick(null);
                        setIsOpenHeaderOptions(false);
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }}
                    >
                      <X className="size-4" />
                    </div>
                    <div
                      className={`btn ${
                        isOpenUtils ? "btn-secondary" : "btn-primary"
                      } size-8 p-0 min-w-0 min-h-0 rounded-card cursor-pointer  text-sm flex items-center justify-center`}
                      onClick={() => {
                        setIsOpenUtils(!isOpenUtils);
                        setIsOpenHeaderOptions(false);
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }}
                    >
                      <AppWindow className="size-4" />
                    </div>
                    <div
                      className={`btn btn-primary size-8 p-0 min-w-0 min-h-0 rounded-card cursor-pointer  text-sm flex items-center justify-center`}
                      onClick={() => {
                        //   setIsOpenFilter(true);
                        setIsOpenHeaderOptions(false);
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }}
                    >
                      <Video className="size-4" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Chat Area */}
          <div className="flex flex-row">
            <div className="flex-1">
              {/* Chat Messages */}
              <div className="overflow-y-auto p-4 !h-[calc(100vh-64px-64px-80px)]">
                <MockMessages user={user}></MockMessages>
              </div>

              {/* Input */}
              <div className="border-t border-base-300 flex items-center justify-between px-4 py-4 gap-4 h-20">
                {/* Utils */}
                <div className="flex items-center gap-2">
                  <div
                    className={`btn btn-primary size-8 p-0 min-w-0 min-h-0 rounded-card cursor-pointer  text-sm flex items-center justify-center`}
                    onClick={() => {
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                  >
                    <Paperclip className="size-4 " />
                  </div>
                  <div
                    className={`btn btn-primary size-8 p-0 min-w-0 min-h-0 rounded-card cursor-pointer  text-sm flex items-center justify-center`}
                    onClick={() => {
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                  >
                    <Smile className="size-4 " />
                  </div>
                </div>

                {/* Input field */}
                <div className="w-full">
                  <input
                    type="text"
                    placeholder="Type a message..."
                    className="input input-bordered w-full text-sm"
                  />
                </div>

                {/* Send button */}
                <div
                  className={`btn btn-primary size-10 p-0 min-w-0 min-h-0 rounded-full cursor-pointer text-sm flex items-center justify-center hover:btn-secondary `}
                  onClick={() => {
                    //   setIsOpenFilter(true);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                >
                  <Forward className="size-6" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Utils Panel */}
        {isOpenUtils && (
          <div
            className={`absolute top-0 right-0 lg:relative lg:flex lg:flex-col w-64  z-10 bg-base-100`}
          >
            <div className="border-l border-base-300">
              <div className="h-16 px-4 py-4 border-b border-base-300">
                <div className="flex flex-col items-center justify-center h-full w-full">
                  <span className="font-semibold text-sm">
                    Thông tin cuộc trò chuyện
                  </span>
                </div>

                {/* <div className="flex gap-4 justify-end lg:hidden">
                  <div className="flex gap-2">
                    <div
                      className={`btn btn-secondary size-8 p-0 min-w-0 min-h-0 rounded-card cursor-pointer  text-sm flex items-center justify-center`}
                      onClick={() => {
                        //   setIsOpenFilter(true);
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }}
                    >
                      <Video className="size-4" />
                    </div>
                    <div
                      className={`btn btn-secondary size-8 p-0 min-w-0 min-h-0 rounded-card cursor-pointer  text-sm flex items-center justify-center`}
                      onClick={() => {
                        setIsOpenUtils(!isOpenUtils);
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }}
                    >
                      <AppWindow className="size-4" />
                    </div>
                  </div>
                  <div
                    className={`btn btn-primary size-8 p-0 min-w-0 min-h-0 rounded-card cursor-pointer  text-sm flex items-center justify-center`}
                    onClick={() => {
                      onClick(null);
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                  >
                    <X className="size-4" />
                  </div>
                </div> */}
              </div>
            </div>

            <div className="h-[calc(100vh-64px-64px)] overflow-y-auto flex flex-col justify-between border-l border-base-300">
              <div>
                {/* Settings */}
                <div className="flex flex-col">
                  <div
                    className={`h-16 border-base-300 flex items-center justify-center lg:justify-start px-4 cursor-pointer border-b ${
                      useUtils.isOpenSettings
                        ? "bg-base-300"
                        : "hover:bg-base-200"
                    }`}
                    onClick={() => {
                      setUseUtils((prev) => {
                        return {
                          ...prev,
                          isOpenSettings: !prev.isOpenSettings,
                        };
                      });
                    }}
                  >
                    <div className="flex justify-between items-center w-full">
                      <div className="flex items-center gap-2">
                        {/* <Settings className="size-4" /> */}
                        <span className="text-sm font-semibold">Cài đặt</span>
                      </div>

                      {useUtils.isOpenSettings ? (
                        <>
                          <ChevronUp className="size-4" />
                        </>
                      ) : (
                        <>
                          <ChevronDown className="size-4" />
                        </>
                      )}
                    </div>
                  </div>
                  {useUtils.isOpenSettings && (
                    <div>
                      <div className="h-16 border-base-300 flex items-center justify-between px-4 border-b">
                        <div className="flex gap-2 items-center">
                          <BellIcon className="size-4" />
                          <span className="text-sm">Thông báo</span>
                        </div>

                        <div className="flex gap-2">
                          <div
                            className={`btn ${
                              useSettings.isOpenNotifications
                                ? "btn-primary"
                                : "btn-outlined hover:btn-primary"
                            } size-8 p-0 min-w-0 min-h-0 rounded-card cursor-pointer  text-sm flex items-center justify-center`}
                            onClick={() => {
                              setUseSettings((prev) => ({
                                ...prev,
                                isOpenNotifications: true,
                              }));
                            }}
                          >
                            <Check className="size-4" />
                          </div>
                          <div
                            className={`btn ${
                              !useSettings.isOpenNotifications
                                ? "btn-primary"
                                : "btn-outlined hover:btn-primary"
                            } size-8 p-0 min-w-0 min-h-0 rounded-card cursor-pointer  text-sm flex items-center justify-center`}
                            onClick={() => {
                              setUseSettings((prev) => ({
                                ...prev,
                                isOpenNotifications: false,
                              }));
                            }}
                          >
                            <X className="size-4" />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                {/* Images/Videos */}
                <div className="flex flex-col">
                  <div
                    className={`h-16 border-base-300 flex items-center justify-center lg:justify-start px-4 cursor-pointer border-b ${
                      useUtils.isOpenImagesVideos ? "bg-base-300" : ""
                    }`}
                    onClick={() => {
                      setUseUtils((prev) => {
                        return {
                          ...prev,
                          isOpenImagesVideos: false,
                        };
                      });
                    }}
                  >
                    <div className="flex justify-between items-center w-full">
                      <div className="flex items-center gap-2">
                        {/* <Settings className="size-4" /> */}
                        <span className="text-sm font-semibold">
                          Ảnh / Video
                        </span>
                      </div>

                      {/* {useUtils.isOpenImagesVideos ? (
                      <>
                        <ChevronUp className="size-4" />
                      </>
                    ) : (
                      <>
                        <ChevronDown className="size-4" />
                      </>
                    )} */}
                    </div>
                  </div>
                  {true && (
                    <div className="min-h-16 border-base-300 p-4 border-b">
                      <div className="grid grid-cols-3 gap-4">
                        {imagesVideos.map((image, index) => {
                          if (index > 2 && !useUtils.isOpenImagesVideos)
                            return null; // Show only first 3 images/videos
                          return (
                            <div
                              key={index}
                              className="w-16 h-16 rounded-card overflow-hidden"
                            >
                              <img src={image} alt={`Image ${index + 1}`} />
                            </div>
                          );
                        })}
                      </div>

                      {imagesVideos.length > 3 && (
                        <div className="flex text-sm items-center justify-center mt-4">
                          <div
                            className="btn btn-outlined size-8 p-0 min-w-0 min-h-0 rounded-card cursor-pointer "
                            onClick={() => {
                              setUseUtils((prev) => ({
                                ...prev,
                                isOpenImagesVideos: !prev.isOpenImagesVideos,
                              }));
                            }}
                          >
                            {useUtils.isOpenImagesVideos ? (
                              <ChevronsUp className="size-4" />
                            ) : (
                              <ChevronsDown className="size-4" />
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
                {/* Files */}
                <div className="flex flex-col">
                  <div
                    className={`h-16 border-base-300 flex items-center justify-center lg:justify-start px-4 cursor-pointer border-b ${
                      useUtils.isOpenFiles ? "bg-base-300" : ""
                    }`}
                    onClick={() => {
                      setUseUtils((prev) => {
                        return {
                          ...prev,
                          isOpenFiles: false,
                        };
                      });
                    }}
                  >
                    <div className="flex justify-between items-center w-full">
                      <div className="flex items-center gap-2">
                        {/* <Settings className="size-4" /> */}
                        <span className="text-sm font-semibold">Files</span>
                      </div>

                      {/* {useUtils.isOpenImagesVideos ? (
                      <>
                        <ChevronUp className="size-4" />
                      </>
                    ) : (
                      <>
                        <ChevronDown className="size-4" />
                      </>
                    )} */}
                    </div>
                  </div>
                  {true && (
                    <div className="min-h-16 border-base-300 p-4 border-b">
                      <div className="grid grid-cols-3 gap-4">
                        {files.map((file, index) => {
                          if (index > 2 && !useUtils.isOpenFiles) return null; // Show only first 3 files
                          return (
                            <div
                              key={index}
                              className="w-16 h-16 rounded-card overflow-hidden"
                            >
                              <img src={file} alt={`File ${index + 1}`} />
                            </div>
                          );
                        })}
                      </div>

                      {files.length > 3 && (
                        <div className="flex text-sm items-center justify-center mt-4">
                          <div
                            className="btn btn-outlined size-8 p-0 min-w-0 min-h-0 rounded-card cursor-pointer "
                            onClick={() => {
                              setUseUtils((prev) => ({
                                ...prev,
                                isOpenFiles: !prev.isOpenFiles,
                              }));
                            }}
                          >
                            {useUtils.isOpenFiles ? (
                              <ChevronsUp className="size-4" />
                            ) : (
                              <ChevronsDown className="size-4" />
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>

              <div className="p-4 pt-[15px]">
                <div className="btn btn-outlined w-full hover:btn-error">
                  Xóa lịch sử trò chuyện
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ChatWindow;
