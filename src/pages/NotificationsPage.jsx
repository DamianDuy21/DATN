import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  BellIcon,
  Check,
  ChevronDown,
  ChevronUp,
  ClockIcon,
  Forward,
  LoaderIcon,
  MapPinIcon,
  MessageSquareIcon,
  Undo2,
  UserCheckIcon,
  UsersIcon,
  X,
} from "lucide-react";
import NoNotificationsFound from "../components/NoNotificationsFound.jsx";
import { acceptFriendRequestAPI, getFriendRequestsAPI } from "../lib/api.js";

import {
  FriendCard_v2,
  getLanguageFlag,
} from "../components/FriendCard_v2.jsx";
import { capitalize } from "../lib/utils.js";
import { FriendCard_v2_NotificationsPage } from "../components/FriendCard_v2_NotificationsPage.jsx";
import { Link } from "react-router";
import { useState } from "react";
import CountBadge from "../components/CountBadge.jsx";

const NotificationsPage = () => {
  const queryClient = useQueryClient();

  const [isShowMoreFriendRequests, setIsShowMoreFriendRequests] =
    useState(false);
  const [isShowMoreNotifications, setIsShowMoreNotifications] = useState(false);

  // const { data: friendRequests = [], isLoading } = useQuery({
  //   queryKey: ["getFriendRequests"],
  //   queryFn: getFriendRequestsAPI,
  // });

  const friendRequests = {
    friendRequests: [
      {
        _id: "req1",
        sender: {
          fullName: "Alice Nguyễn",
          location: "Hanoi, Vietnam",
          profilePic: "https://avatar.iran.liara.run/public/02.png",
          nativeLanguage: "vietnamese",
          learningLanguage: "english",
        },
      },
      {
        _id: "req2",
        sender: {
          fullName: "Carlos Silva",
          location: "São Paulo, Brazil",
          profilePic: "https://avatar.iran.liara.run/public/03.png",
          nativeLanguage: "portuguese",
          learningLanguage: "vietnamese",
        },
      },
      {
        _id: "req3",
        sender: {
          fullName: "Carlos Silva",
          location: "São Paulo, Brazil",
          profilePic: "https://avatar.iran.liara.run/public/03.png",
          nativeLanguage: "portuguese",
          learningLanguage: "vietnamese",
        },
      },
      {
        _id: "req4",
        sender: {
          fullName: "Carlos Silva",
          location: "São Paulo, Brazil",
          profilePic: "https://avatar.iran.liara.run/public/03.png",
          nativeLanguage: "portuguese",
          learningLanguage: "vietnamese",
        },
      },
      {
        _id: "req5",
        sender: {
          fullName: "Carlos Silva",
          location: "São Paulo, Brazil",
          profilePic: "https://avatar.iran.liara.run/public/03.png",
          nativeLanguage: "portuguese",
          learningLanguage: "vietnamese",
        },
      },
      {
        _id: "req6",
        sender: {
          fullName: "Carlos Silva",
          location: "São Paulo, Brazil",
          profilePic: "https://avatar.iran.liara.run/public/03.png",
          nativeLanguage: "portuguese",
          learningLanguage: "vietnamese",
        },
      },
      {
        _id: "req7",
        sender: {
          fullName: "Carlos Silva",
          location: "São Paulo, Brazil",
          profilePic: "https://avatar.iran.liara.run/public/03.png",
          nativeLanguage: "portuguese",
          learningLanguage: "vietnamese",
        },
      },
    ],
    acceptedRequests: [
      {
        _id: "acc1",
        recipient: {
          fullName: "Emma Johnson",
          profilePic: "https://avatar.iran.liara.run/public/03.png",
        },
        isRead: false,
      },
      {
        _id: "acc2",
        recipient: {
          fullName: "Minh Trần",
          profilePic: "https://avatar.iran.liara.run/public/04.png",
        },
      },
      {
        _id: "acc3",
        recipient: {
          fullName: "Minh Trần",
          profilePic: "https://avatar.iran.liara.run/public/04.png",
        },
        isRead: false,
      },
      {
        _id: "acc4",
        recipient: {
          fullName: "Minh Trần",
          profilePic: "https://avatar.iran.liara.run/public/04.png",
        },
        isRead: true,
      },
      {
        _id: "acc5",
        recipient: {
          fullName: "Minh Trần",
          profilePic: "https://avatar.iran.liara.run/public/04.png",
        },
        isRead: true,
      },
      {
        _id: "acc6",
        recipient: {
          fullName: "Minh Trần",
          profilePic: "https://avatar.iran.liara.run/public/04.png",
        },
        isRead: true,
      },
      {
        _id: "acc7",
        recipient: {
          fullName: "Minh Trần",
          profilePic: "https://avatar.iran.liara.run/public/04.png",
        },
        isRead: true,
      },
      {
        _id: "acc8",
        recipient: {
          fullName: "Minh Trần",
          profilePic: "https://avatar.iran.liara.run/public/04.png",
        },
        isRead: true,
      },
      {
        _id: "acc9",
        recipient: {
          fullName: "Minh Trần",
          profilePic: "https://avatar.iran.liara.run/public/04.png",
        },
        isRead: true,
      },

      {
        _id: "acc10",
        recipient: {
          fullName: "Minh Trần",
          profilePic: "https://avatar.iran.liara.run/public/04.png",
        },
        isRead: true,
      },
    ],
  };

  const { mutate: acceptFriendRequestMutation, isPending: isAccepting } =
    useMutation({
      mutationFn: acceptFriendRequestAPI,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["getFriendRequests"] });
        queryClient.invalidateQueries({ queryKey: ["getFriends"] });
        queryClient.invalidateQueries({ queryKey: ["getRecommendedUsers"] });
      },
    });

  const incomingFriendRequests = friendRequests?.friendRequests || [];
  const acceptedFriendRequests = friendRequests?.acceptedRequests || [];

  return (
    <>
      <div className="p-4 sm:p-6 lg:p-6 min-h-[calc(100vh - 64px)] ">
        <div className="w-full space-y-4 sm:space-y-4">
          {/* FRIEND REQUESTS NOTIFICATIONS */}
          {!isShowMoreNotifications && (
            <>
              <div className="flex flex-col sm:flex-row items-start justify-between gap-4 mb-4 sm:mb-4">
                <div className="flex items-center gap-4">
                  <h1 className="text-2xl sm:text-2xl font-bold">
                    Lời mời kết bạn
                  </h1>
                  {/* <div className="btn btn-secondary size-8 p-0 min-w-0 min-h-0 rounded-card cursor-pointer text-sm items-center justify-center">
                    {incomingFriendRequests.length}
                  </div> */}
                  <CountBadge
                    count={incomingFriendRequests.length}
                  ></CountBadge>
                </div>
                {incomingFriendRequests.length > 3 && (
                  <>
                    {!isShowMoreFriendRequests ? (
                      <div
                        className="btn btn-outline btn-sm"
                        onClick={() => {
                          setIsShowMoreFriendRequests(true);
                          window.scrollTo({ top: 0, behavior: "smooth" });
                        }}
                      >
                        <Forward className="size-4" />
                        <span className="">Xem thêm</span>
                      </div>
                    ) : (
                      // <div
                      //   className={`btn btn-primary size-8 p-0 min-w-0 min-h-0 rounded-card cursor-pointer  text-sm flex items-center justify-center`}
                      //   onClick={() => setIsShowMoreFriendRequests(true)}
                      // >
                      //   <ChevronDown className="size-4" />
                      // </div>
                      <div
                        className="btn btn-outline btn-sm"
                        onClick={() => {
                          setIsShowMoreFriendRequests(false);
                          window.scrollTo({ top: 0, behavior: "smooth" });
                        }}
                      >
                        <Undo2 className="size-4" />
                        <span className="">Thu gọn</span>
                      </div>
                      // <div
                      //   className={`btn btn-primary size-8 p-0 min-w-0 min-h-0 rounded-card cursor-pointer  text-sm flex items-center justify-center`}
                      //   onClick={() => setIsShowMoreFriendRequests(false)}
                      // >
                      //   <ChevronUp className="size-4" />
                      // </div>
                    )}
                  </>
                )}
              </div>
              {false ? (
                <div className="flex justify-center h-[100px] items-center">
                  <LoaderIcon className="animate-spin size-8" />
                </div>
              ) : (
                <>
                  {incomingFriendRequests.length > 0 && (
                    <section className="space-y-4">
                      <div className="space-y-3">
                        {incomingFriendRequests.map((request, idx) => {
                          if (idx >= 3 && !isShowMoreFriendRequests) {
                            return null;
                          }
                          return (
                            <FriendCard_v2_NotificationsPage
                              key={request._id}
                              friend={request.sender}
                            />
                          );
                        })}
                      </div>
                    </section>
                  )}
                </>
              )}
            </>
          )}
          {/* ACCEPTED REQUESTS NOTIFICATIONS */}
          {!isShowMoreFriendRequests ? (
            <section
              className={`space-y-4 ${!isShowMoreNotifications ? "!mt-6" : ""}`}
            >
              <div className="flex flex-col sm:flex-row items-start justify-between gap-4 mb-4 sm:mb-4">
                <div className="flex items-center gap-4">
                  <h1 className="text-2xl sm:text-2xl font-bold">Thông báo</h1>
                  {/* <div className="btn btn-secondary size-8 p-0 min-w-0 min-h-0 rounded-card cursor-pointer text-sm items-center justify-center">
                    {acceptedFriendRequests.length}
                  </div> */}
                  <CountBadge
                    count={
                      acceptedFriendRequests.filter((item) => !item.isRead)
                        .length
                    }
                  ></CountBadge>
                </div>

                {acceptedFriendRequests.length > 3 && (
                  <>
                    {!isShowMoreNotifications ? (
                      <div
                        className="btn btn-outline btn-sm"
                        onClick={() => {
                          setIsShowMoreNotifications(true);
                          window.scrollTo({ top: 0, behavior: "smooth" });
                        }}
                      >
                        <Forward className="size-4 " />
                        <span className="">Xem thêm</span>
                      </div>
                    ) : (
                      // <div
                      //   className={`btn btn-primary size-8 p-0 min-w-0 min-h-0 rounded-card cursor-pointer  text-sm flex items-center justify-center`}
                      //   onClick={() => setIsShowMoreNotifications(true)}
                      // >
                      //   <ChevronDown className="size-4" />
                      // </div>
                      <div
                        className="btn btn-outline btn-sm"
                        onClick={() => {
                          setIsShowMoreNotifications(false);
                          window.scrollTo({ top: 0, behavior: "smooth" });
                        }}
                      >
                        <Undo2 className="size-4 " />
                        <span className="">Thu gọn</span>
                      </div>
                      // <div
                      //   className={`btn btn-primary size-8 p-0 min-w-0 min-h-0 rounded-card cursor-pointer  text-sm flex items-center justify-center`}
                      //   onClick={() => setIsShowMoreNotifications(false)}
                      // >
                      //   <ChevronUp className="size-4" />
                      // </div>
                    )}
                  </>
                )}
              </div>

              <div className="space-y-3">
                {acceptedFriendRequests.map((notification, idx) => {
                  if (idx >= 3 && !isShowMoreNotifications) {
                    return null;
                  }
                  return (
                    <div
                      key={notification._id}
                      className="card bg-base-200 shadow-sm"
                    >
                      <div className={`card-body p-4 pr-[106px]`}>
                        <div className="flex items-start gap-3">
                          <div className="avatar mt-1 size-10 rounded-full">
                            <img
                              src={notification.recipient.profilePic}
                              alt={""}
                            />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-sm">
                              {notification.recipient.fullName}
                            </h3>
                            <p className="text-sm mb-2">
                              {notification.recipient.fullName} accepted your
                              friend request
                            </p>
                            <p className="text-xs flex items-center opacity-70">
                              <ClockIcon className="h-3 w-3 mr-1" />
                              <span className="relative -top-[0.5px]">
                                Recently
                              </span>
                            </p>
                          </div>
                          {/* <div className="badge badge-primary text-xs h-6">
                            <MessageSquareIcon className="h-3 w-3 mr-1" />
                            <span className="relative -top-[1px]">
                              New Friend
                            </span>
                          </div> */}
                          {!notification.isRead && (
                            <div
                              className="btn btn-primary size-8 p-0 min-w-0 min-h-0 rounded-card absolute top-4 right-14 cursor-pointer flex text-sm items-center justify-center "
                              onClick={(e) => {
                                e.stopPropagation();
                              }}
                            >
                              <Check className="size-4" />
                            </div>
                          )}

                          <div
                            className="btn btn-secondary size-8 p-0 min-w-0 min-h-0 rounded-card absolute top-4 right-4 cursor-pointer flex text-sm items-center justify-center "
                            onClick={(e) => {
                              e.stopPropagation();
                            }}
                          >
                            <X className="size-4" />
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          ) : null}

          {/* {incomingFriendRequests.length === 0 &&
            acceptedFriendRequests.length === 0 && <NoNotificationsFound />} */}
        </div>
      </div>
    </>
  );
};

export default NotificationsPage;
