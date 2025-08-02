import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Forward,
  LoaderIcon,
  Search,
  ShuffleIcon,
  Sparkles,
  Undo2,
  UsersIcon,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router";

import { FriendCard_v2 } from "../components/FriendCard_v2.jsx";
import NoFriendsFound from "../components/NoFriendsFound.jsx";
import { RecommendedUser } from "../components/RecommendedUser.jsx";
import CostumedSelect from "../components/CostumedSelect.jsx";
import {
  getFriendRequestsAPI,
  getFriendsAPI,
  getOutgoingFriendRequestsAPI,
  getRecommendedUsersAPI,
  sendFriendRequestAPI,
} from "../lib/api.js";
import { showToast } from "../components/CostumedToast.jsx";
import { useTranslation } from "react-i18next";
import CountBadge from "../components/CountBadge.jsx";
import { FriendCard_v2_NotificationsPage } from "../components/FriendCard_v2_NotificationsPage.jsx";
import { FriendCard_v2_HomePage_OutgoingRequest } from "../components/FriendCard_v2_HomePage_OutgoingRequest.jsx";

const HomePage = () => {
  const queryClient = useQueryClient();
  const { t } = useTranslation("homePage");
  const [isSeeMoreRecommendedUsers, setIsSeeMoreRecommendedUsers] =
    useState(false);
  const [isShowMoreFriendRequests, setIsShowMoreFriendRequests] =
    useState(false);

  const [outgoingRequestIds, setOutgoingRequestIds] = useState(new Set());
  const [incomingRequestIds, setIncomingRequestIds] = useState(new Set());

  const [isOpenFilter, setIsOpenFilter] = useState(false);
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
  const friends = [
    {
      fullName: "Linh Trần",
      email: "linh@example.com",
      password: "linhpass123",
      bio: "Hiện đang sống tại Đà Nẵng, thích đọc sách và học tiếng Anh.",
      profilePic: "https://avatar.iran.liara.run/public/01.png",
      nativeLanguage: "Vietnamese",
      learningLanguage: "English",
      location: "Đà Nẵng",
      isOnboarded: true,
      isOnline: true,
    },
    {
      fullName: "John Miller",
      email: "john@example.com",
      password: "johnmiller321",
      bio: "Ngôn ngữ là cầu nối giữa các nền văn hóa.",
      profilePic: "https://avatar.iran.liara.run/public/02.png",
      nativeLanguage: "English",
      learningLanguage: "Vietnamese",
      location: "New York",
      isOnboarded: true,
      isOnline: false,
    },
    {
      fullName: "John Miller",
      email: "john@example.com",
      password: "johnmiller321",
      bio: "Ngôn ngữ là cầu nối giữa các nền văn hóa.",
      profilePic: "https://avatar.iran.liara.run/public/02.png",
      nativeLanguage: "English",
      learningLanguage: "Vietnamese",
      location: "New York",
      isOnboarded: true,
      isOnline: false,
    },
  ];
  const recommendedUsers = [
    {
      fullName: "Alice Nguyễn",
      email: "alice@example.com",
      password: "password123", // sẽ được hash khi lưu
      bio: "Yêu thích học ngôn ngữ và du lịch.",
      profilePic: "https://avatar.iran.liara.run/public/20.png",
      nativeLanguage: "Vietnamese",
      learningLanguage: "English",
      location: "Hà Nội",
      isOnboarded: true,
      isOnline: true,
    },
    {
      fullName: "Carlos Silva",
      email: "carlos@example.com",
      password: "securepass",
      bio: "Tôi đang học tiếng Việt để du lịch Đông Nam Á aaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa.",
      profilePic: "https://avatar.iran.liara.run/public/21.png",
      nativeLanguage: "Portuguese",
      learningLanguage: "Vietnamese",
      location: "Lisbon",
      isOnboarded: true,
      isOnline: false,
    },
    {
      fullName: "John Miller",
      email: "john@example.com",
      password: "johnmiller321",
      bio: "Ngôn ngữ là cầu nối giữa các nền văn hóa.",
      profilePic: "https://avatar.iran.liara.run/public/02.png",
      nativeLanguage: "English",
      learningLanguage: "Vietnamese",
      location: "New York",
      isOnboarded: true,
      isOnline: false,
    },
    {
      fullName: "Carlos Silva",
      email: "carlos@example.com",
      password: "securepass",
      bio: "Tôi đang học tiếng Việt để du lịch Đông Nam Á aaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa.",
      profilePic: "https://avatar.iran.liara.run/public/21.png",
      nativeLanguage: "Portuguese",
      learningLanguage: "Vietnamese",
      location: "Lisbon",
      isOnboarded: true,
      isOnline: false,
    },
    {
      fullName: "John Miller",
      email: "john@example.com",
      password: "johnmiller321",
      bio: "Ngôn ngữ là cầu nối giữa các nền văn hóa.",
      profilePic: "https://avatar.iran.liara.run/public/02.png",
      nativeLanguage: "English",
      learningLanguage: "Vietnamese",
      location: "New York",
      isOnboarded: true,
      isOnline: false,
    },
    {
      fullName: "Carlos Silva",
      email: "carlos@example.com",
      password: "securepass",
      bio: "Tôi đang học tiếng Việt để du lịch Đông Nam Á aaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa.",
      profilePic: "https://avatar.iran.liara.run/public/21.png",
      nativeLanguage: "Portuguese",
      learningLanguage: "Vietnamese",
      location: "Lisbon",
      isOnboarded: true,
      isOnline: false,
    },
    {
      fullName: "John Miller",
      email: "john@example.com",
      password: "johnmiller321",
      bio: "Ngôn ngữ là cầu nối giữa các nền văn hóa.",
      profilePic: "https://avatar.iran.liara.run/public/02.png",
      nativeLanguage: "English",
      learningLanguage: "Vietnamese",
      location: "New York",
      isOnboarded: true,
      isOnline: false,
    },
    {
      fullName: "Carlos Silva",
      email: "carlos@example.com",
      password: "securepass",
      bio: "Tôi đang học tiếng Việt để du lịch Đông Nam Á aaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa.",
      profilePic: "https://avatar.iran.liara.run/public/21.png",
      nativeLanguage: "Portuguese",
      learningLanguage: "Vietnamese",
      location: "Lisbon",
      isOnboarded: true,
      isOnline: false,
    },
    {
      fullName: "John Miller",
      email: "john@example.com",
      password: "johnmiller321",
      bio: "Ngôn ngữ là cầu nối giữa các nền văn hóa.",
      profilePic: "https://avatar.iran.liara.run/public/02.png",
      nativeLanguage: "English",
      learningLanguage: "Vietnamese",
      location: "New York",
      isOnboarded: true,
      isOnline: false,
    },
    {
      fullName: "Carlos Silva",
      email: "carlos@example.com",
      password: "securepass",
      bio: "Tôi đang học tiếng Việt để du lịch Đông Nam Á aaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa.",
      profilePic: "https://avatar.iran.liara.run/public/21.png",
      nativeLanguage: "Portuguese",
      learningLanguage: "Vietnamese",
      location: "Lisbon",
      isOnboarded: true,
      isOnline: false,
    },
    {
      fullName: "John Miller",
      email: "john@example.com",
      password: "johnmiller321",
      bio: "Ngôn ngữ là cầu nối giữa các nền văn hóa.",
      profilePic: "https://avatar.iran.liara.run/public/02.png",
      nativeLanguage: "English",
      learningLanguage: "Vietnamese",
      location: "New York",
      isOnboarded: true,
      isOnline: false,
    },
  ];
  // const { data: friends = [], isLoading: isLoadingGetFriends } = useQuery({
  //   queryKey: ["getFriends"],
  //   queryFn: getFriendsAPI,
  // });

  // const {
  //   data: recommendedUsers = [],
  //   isLoading: isLoadingGetRecommendedUsers,
  // } = useQuery({
  //   queryKey: ["getRecommendedUsers"],
  //   queryFn: getRecommendedUsersAPI,
  // });

  const {
    data: outgoingFriendRequests,
    isLoading: isLoadingOutgoingFriendRequests,
  } = useQuery({
    queryKey: ["getOutgoingFriendRequests"],
    queryFn: getOutgoingFriendRequestsAPI,
  });

  // const {
  //   data: incomingFriendRequests,
  //   isLoading: isLoadingIncomingFriendRequests,
  // } = useQuery({
  //   queryKey: ["getIncomingFriendRequests"],
  //   queryFn: getFriendRequestsAPI,
  // });

  const {
    mutate: sendFriendRequestMutation,
    isPending: isSendingFriendRequest,
  } = useMutation({
    mutationFn: sendFriendRequestAPI,
    onSuccess: (data) => {
      queryClient.invalidateQueries(["getOutgoingFriendRequests"]);
      showToast({
        message: data?.message || "Friend request sent successfully!",
        type: "success",
      });
    },
    onError: (error) => {
      showToast({
        message:
          error?.response?.data?.message || "Failed to send friend request",
        type: "error",
      });
    },
  });

  useEffect(() => {
    if (outgoingFriendRequests) {
      const ids = new Set(
        outgoingFriendRequests.map((req) => req.recipient._id)
      );
      setOutgoingRequestIds(ids);
    }
  }, [outgoingFriendRequests]);

  // useEffect(() => {
  //   if (incomingFriendRequests) {
  //     const ids = new Set(
  //       incomingFriendRequests.friendRequests.map((req) => req.sender._id)
  //     );
  //     setIncomingRequestIds(ids);
  //   }
  // }, [incomingFriendRequests]);

  const incomingFriendRequests = friendRequests?.friendRequests || [];

  return (
    <>
      <div className="p-4 sm:p-6 lg:p-6 min-h-[calc(100vh - 64px)]">
        {/* MEET NEW LEARNERS */}
        {!isShowMoreFriendRequests && (
          <div className="">
            {/* {!isSeeMoreRecommendedUsers && (
            <div>
              <div className="flex flex-col sm:flex-row items-start justify-between gap-4 mb-4 sm:mb-4">
                <div className="flex items-center gap-4">
                  <h2 className="text-2xl sm:text-2xl font-bold">
                    {t("recentConnections.title")}
                  </h2>
                  <CountBadge count={friends.length}></CountBadge>
                </div>

                <Link to="/" className="btn btn-outline btn-sm">
                  <UsersIcon className="size-4" />
                  {t("recentConnections.subButton")}
                </Link>
              </div>

              {false ? (
                <div className="flex justify-center h-[100px] items-center">
                  <LoaderIcon className="animate-spin size-8" />
                </div>
              ) : friends.length === 0 ? (
                <NoFriendsFound />
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                  {friends.map((friend) => (
                    <FriendCard_v2 key={friend._id} friend={friend} />
                  ))}
                </div>
              )}
            </div>
          )} */}

            <section
              className={`${!isSeeMoreRecommendedUsers ? "!mt-0" : "!mt-0"} `}
            >
              <div className="mb-4 sm:mb-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <h2 className="text-2xl sm:text-2xl font-bold">
                      {t("recommendedUsers.title")}
                    </h2>
                    {/* <p className="text-base-content opacity-70 text-sm">
                    {t("recommendedUsers.subtitle")}
                  </p> */}
                    <CountBadge count={recommendedUsers.length}></CountBadge>
                  </div>
                  {recommendedUsers.length > 6 && (
                    <>
                      <div className="flex gap-2">
                        <div
                          className={`btn btn-primary size-8 p-0 min-w-0 min-h-0 rounded-card cursor-pointer  text-sm flex items-center justify-center`}
                          onClick={() => {
                            window.scrollTo({ top: 0, behavior: "smooth" });
                          }}
                        >
                          <ShuffleIcon className="size-4" />
                        </div>
                        {!isOpenFilter ? (
                          <div
                            className={`btn btn-primary size-8 p-0 min-w-0 min-h-0 rounded-card cursor-pointer  text-sm flex items-center justify-center`}
                            onClick={() => {
                              setIsOpenFilter(true);
                              window.scrollTo({ top: 0, behavior: "smooth" });
                            }}
                          >
                            <Sparkles className="size-4" />
                          </div>
                        ) : (
                          <div
                            className={`btn btn-primary size-8 p-0 min-w-0 min-h-0 rounded-card cursor-pointer  text-sm flex items-center justify-center`}
                            onClick={() => {
                              setIsOpenFilter(false);
                              window.scrollTo({ top: 0, behavior: "smooth" });
                            }}
                          >
                            <X className="size-4" />
                          </div>
                        )}

                        {!isSeeMoreRecommendedUsers ? (
                          <div
                            className="btn btn-outline btn-sm ml-2"
                            onClick={() => {
                              setIsSeeMoreRecommendedUsers(true);
                              window.scrollTo({ top: 0, behavior: "smooth" });
                            }}
                          >
                            <Forward className="size-4" />
                            <span className="">Xem thêm</span>
                          </div>
                        ) : (
                          <div
                            className="btn btn-outline btn-sm ml-2"
                            onClick={() => {
                              setIsSeeMoreRecommendedUsers(false);
                              window.scrollTo({ top: 0, behavior: "smooth" });
                            }}
                          >
                            <Undo2 className="size-4" />
                            <span className="">Thu gọn</span>
                          </div>
                        )}
                      </div>
                    </>
                    // <Link
                    //   to="/"
                    //   className="btn btn-outline btn-sm"
                    //   onClick={() =>
                    //     setIsSeeMoreRecommendedUsers(!isSeeMoreRecommendedUsers)
                    //   }
                    // >
                    //   {/* <UsersIcon className="size-4" /> */}
                    //   {!isSeeMoreRecommendedUsers ? (
                    //     <>
                    //       <Forward className="size-4" />
                    //       {t("recommendedUsers.subButton.seeMore")}
                    //     </>
                    //   ) : (
                    //     <>
                    //       <Undo2 className="size-4" />
                    //       {t("recommendedUsers.subButton.seeLess")}
                    //     </>
                    //   )}
                    // </Link>
                  )}
                </div>
              </div>

              {false ? (
                <div className="flex justify-center h-[100px] items-center">
                  <LoaderIcon className="animate-spin size-8" />
                </div>
              ) : recommendedUsers.length === 0 ? (
                <div className="card bg-base-200 p-6 text-center">
                  <h3 className="font-semibold mb-2">
                    {t("recommendedUsers.empty.title")}
                  </h3>
                  <p className="text-base-content opacity-70 text-sm">
                    {t("recommendedUsers.empty.subtitle")}
                  </p>
                </div>
              ) : (
                <>
                  {isOpenFilter && (
                    <form
                      action=""
                      onSubmit={() => {}}
                      className="mb-4 bg-base-200 p-4 pt-2 rounded-lg flex flex-col xl:flex-row items-end gap-6 xl:gap-4"
                    >
                      <div className="xl:flex-1 w-full">
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-4 gap-y-3">
                          <div className="form-control">
                            <label className="label">
                              <span className="label-text">Họ và tên</span>
                            </label>
                            <input
                              type="text"
                              name="fullName"
                              value={"ád"}
                              onChange={() => {}}
                              className="input input-bordered w-full pointer-events-none text-sm"
                              placeholder={""}
                            />
                          </div>
                          <div className="form-control">
                            <label className="label">
                              <span className="label-text">Ngôn ngữ mẹ đẻ</span>
                            </label>

                            <CostumedSelect
                              placeholder={"Chọn ngôn ngữ mẹ đẻ"}
                              options={[
                                { id: "vi", name: "Tiếng Việt" },
                                { id: "en", name: "Tiếng Anh" },
                              ]}
                              onSelect={() => {}}
                            />
                          </div>
                          <div className="form-control">
                            <label className="label">
                              <span className="label-text">
                                Ngôn ngữ bạn đang học
                              </span>
                            </label>

                            <CostumedSelect
                              placeholder={"Chọn ngôn ngữ bạn đang học"}
                              options={[
                                { id: "vi", name: "Tiếng Việt" },
                                { id: "en", name: "Tiếng Anh" },
                              ]}
                              onSelect={() => {}}
                            />
                          </div>
                        </div>
                      </div>

                      <div
                        className="btn btn-primary flex gap-2 items-center w-full xl:w-auto xl:mt-0"
                        disabled={false}
                        type="submit"
                      >
                        {/* <Search className="size-4" /> */}
                        <Sparkles className="size-4" />
                        {true ? (
                          <>Lọc</>
                        ) : (
                          <>
                            <LoaderIcon className="animate-spin size-5" />
                            Đang lọc...
                          </>
                        )}
                      </div>
                    </form>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                    {recommendedUsers.map((user, idx) => {
                      if (idx >= 6 && !isSeeMoreRecommendedUsers) return null;
                      const hasRequestBeenSent = outgoingRequestIds.has(
                        user._id
                      );
                      const hasIncomingRequest = incomingRequestIds.has(
                        user._id
                      );
                      return (
                        // todo: add loading state for each user
                        <RecommendedUser
                          key={user._id}
                          user={user}
                          hasRequestBeenSent={hasRequestBeenSent}
                          hasIncomingRequest={hasIncomingRequest}
                          onClick={sendFriendRequestMutation}
                          isPending={isSendingFriendRequest}
                        />
                      );
                    })}
                  </div>
                </>
              )}
            </section>
          </div>
        )}

        {/* FRIEND REQUESTS NOTIFICATIONS */}
        {!isSeeMoreRecommendedUsers && (
          <div className={`${isShowMoreFriendRequests ? "!mt-0" : "mt-6"}`}>
            <div className="flex flex-col sm:flex-row items-start justify-between gap-4 mb-4 sm:mb-4">
              <div className="flex items-center gap-4">
                <h1 className="text-2xl sm:text-2xl font-bold">
                  Lời mời kết bạn đã gửi
                </h1>
                {/* <div className="btn btn-secondary size-8 p-0 min-w-0 min-h-0 rounded-card cursor-pointer text-sm items-center justify-center">
                            {incomingFriendRequests.length}
                          </div> */}
                <CountBadge count={incomingFriendRequests.length}></CountBadge>
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
                          <FriendCard_v2_HomePage_OutgoingRequest
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
          </div>
        )}
      </div>
    </>
  );
};

export default HomePage;
