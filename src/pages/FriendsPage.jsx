import { useQuery } from "@tanstack/react-query";
import { LoaderIcon, Sparkles, UsersIcon, X } from "lucide-react";
import { Link } from "react-router";

import { FriendCard_v2 } from "../components/FriendCard_v2.jsx";
import NoFriendsFound from "../components/NoFriendsFound.jsx";
import { getFriendsAPI } from "../lib/api.js";
import { FriendCard_v2_FriendsPage } from "../components/FriendCard_v2_FriendsPage.jsx";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import CountBadge from "../components/CountBadge.jsx";
import CostumedSelect from "../components/CostumedSelect.jsx";

const FriendsPage = () => {
  const { t } = useTranslation("friendsPage");
  // const { data: friends = [], isLoading: isLoadingGetFriends } = useQuery({
  //   queryKey: ["getFriends"],
  //   queryFn: getFriendsAPI,
  // });
  const [isOpenFilter, setIsOpenFilter] = useState(false);
  const [friends, setFriends] = useState([
    {
      _id: "1",
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
      unReadMessages: 1,
    },
    {
      _id: "2",
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
      unReadMessages: 0,
    },
  ]);

  const handleDeleteFriend = (friendId) => {
    setFriends((prevFriends) =>
      prevFriends.filter((friend) => friend._id !== friendId)
    );
  };

  return (
    <>
      <div className="p-4 sm:p-6 lg:p-6 min-h-[calc(100vh - 64px)] ">
        <div className="w-full space-y-4 sm:space-y-4">
          <div className="flex items-start justify-between gap-4 mb-4 sm:mb-4">
            <div className="flex items-center gap-4">
              <h2 className="text-2xl sm:text-2xl font-bold">
                {t("friendsList.title")}
              </h2>
              <CountBadge count={friends.length}></CountBadge>
            </div>
            <div>
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
            </div>
          </div>

          {false ? (
            <div className="flex justify-center h-[100px] items-center">
              <LoaderIcon className="animate-spin size-8" />
            </div>
          ) : friends.length === 0 ? (
            <NoFriendsFound />
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
                {friends.map((friend) => (
                  <FriendCard_v2_FriendsPage
                    key={friend._id}
                    friend={friend}
                    handleDeleteFriend={handleDeleteFriend}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default FriendsPage;
