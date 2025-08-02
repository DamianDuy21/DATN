import { useMutation } from "@tanstack/react-query";
import {
  LoaderIcon,
  MapPinIcon,
  RotateCcwKey,
  ShuffleIcon,
  Sparkles,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router";
import CostumedSelect from "../components/CostumedSelect.jsx";
import { showToast } from "../components/CostumedToast.jsx";
import { useAuthUser } from "../hooks/useAuthUser";
import { getLearningLanguagesAPI, getNativeLanguagesAPI } from "../lib/api.js";
import FriendCard_ChatsPage from "../components/FriendCard_ChatsPage.jsx";
import NoFriendsFound from "../components/NoFriendsFound.jsx";
import ChatWindow from "../components/ChatWindow.jsx";

const ChatsPage = () => {
  const { authUser } = useAuthUser();
  const { t } = useTranslation("profilePage");
  const [selectedUser, setSelectedUser] = useState(null);

  const [friends, setFriends] = useState([
    {
      id: 1,
      fullName: "Alice Nguyễn",
      email: "alice@example.com",
      password: "password123",
      bio: "Yêu thích học ngôn ngữ và du lịch.",
      profilePic: "https://avatar.iran.liara.run/public/20.png",
      nativeLanguage: "Vietnamese",
      learningLanguage: "English",
      location: "Hà Nội",
      isOnboarded: true,
      isOnline: true,
      unReadMessages: 5,
    },
    {
      id: 2,
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
      unReadMessages: 2,
    },
    {
      id: 3,
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
    {
      id: 4,
      fullName: "Linh Trần",
      email: "linhtran@example.com",
      password: "tranlinh456",
      bio: "Đam mê viết lách và học tiếng Nhật.",
      profilePic: "https://avatar.iran.liara.run/public/12.png",
      nativeLanguage: "Vietnamese",
      learningLanguage: "Japanese",
      location: "Đà Nẵng",
      isOnboarded: true,
      isOnline: true,
    },
    {
      id: 5,
      fullName: "Emma Dupont",
      email: "emma@example.com",
      password: "bonjour123",
      bio: "J'adore apprendre les langues et cuisiner.",
      profilePic: "https://avatar.iran.liara.run/public/04.png",
      nativeLanguage: "French",
      learningLanguage: "Vietnamese",
      location: "Paris",
      isOnboarded: true,
      isOnline: false,
    },
    {
      id: 6,
      fullName: "Minh Lê",
      email: "minhle@example.com",
      password: "12345678",
      bio: "Tôi muốn nâng cao khả năng giao tiếp tiếng Anh.",
      profilePic: "https://avatar.iran.liara.run/public/07.png",
      nativeLanguage: "Vietnamese",
      learningLanguage: "English",
      location: "Cần Thơ",
      isOnboarded: true,
      isOnline: true,
    },
    {
      id: 7,
      fullName: "Sara Kim",
      email: "sarakim@example.com",
      password: "korea2024",
      bio: "한국어는 제 모국어이고, 저는 베트남어를 배우고 있어요.",
      profilePic: "https://avatar.iran.liara.run/public/17.png",
      nativeLanguage: "Korean",
      learningLanguage: "Vietnamese",
      location: "Seoul",
      isOnboarded: true,
      isOnline: false,
    },
    {
      id: 8,
      fullName: "Ngọc Bích",
      email: "bichngoc@example.com",
      password: "ngoc123",
      bio: "Mình muốn học tiếng Hàn để xem phim không cần phụ đề!",
      profilePic: "https://avatar.iran.liara.run/public/10.png",
      nativeLanguage: "Vietnamese",
      learningLanguage: "Korean",
      location: "Hải Phòng",
      isOnboarded: true,
      isOnline: true,
    },
    {
      id: 9,
      fullName: "David Garcia",
      email: "davidg@example.com",
      password: "spanishlover",
      bio: "Aprendo vietnamita para viajar a Asia.",
      profilePic: "https://avatar.iran.liara.run/public/15.png",
      nativeLanguage: "Spanish",
      learningLanguage: "Vietnamese",
      location: "Madrid",
      isOnboarded: true,
      isOnline: false,
    },
    {
      id: 10,
      fullName: "Mai Phương",
      email: "maiphuong@example.com",
      password: "phuongmai",
      bio: "Mình đang luyện tiếng Anh để đi du học.",
      profilePic: "https://avatar.iran.liara.run/public/19.png",
      nativeLanguage: "Vietnamese",
      learningLanguage: "English",
      location: "Hồ Chí Minh",
      isOnboarded: true,
      isOnline: true,
    },
    {
      id: 11,
      fullName: "Tomoko Yamada",
      email: "tomoko@example.com",
      password: "japan2025",
      bio: "ベトナムの文化に興味があり、ベトナム語を勉強しています。",
      profilePic: "https://avatar.iran.liara.run/public/16.png",
      nativeLanguage: "Japanese",
      learningLanguage: "Vietnamese",
      location: "Tokyo",
      isOnboarded: true,
      isOnline: false,
    },
    {
      id: 12,
      fullName: "Nam Phạm",
      email: "nampham@example.com",
      password: "namnam",
      bio: "Đam mê du lịch và học hỏi các nền văn hóa.",
      profilePic: "https://avatar.iran.liara.run/public/18.png",
      nativeLanguage: "Vietnamese",
      learningLanguage: "Spanish",
      location: "Huế",
      isOnboarded: true,
      isOnline: true,
    },
    {
      id: 13,
      fullName: "Isabella Rossi",
      email: "isabella@example.com",
      password: "italy321",
      bio: "Imparo il vietnamita per lavoro e cultura.",
      profilePic: "https://avatar.iran.liara.run/public/05.png",
      nativeLanguage: "Italian",
      learningLanguage: "Vietnamese",
      location: "Rome",
      isOnboarded: true,
      isOnline: false,
    },
    {
      id: 14,
      fullName: "Trọng Đạt",
      email: "trongdat@example.com",
      password: "dat123",
      bio: "Mình muốn kết nối với bạn bè quốc tế.",
      profilePic: "https://avatar.iran.liara.run/public/13.png",
      nativeLanguage: "Vietnamese",
      learningLanguage: "English",
      location: "Nghệ An",
      isOnboarded: true,
      isOnline: true,
    },
    {
      id: 15,
      fullName: "Anna Schmidt",
      email: "anna@example.com",
      password: "gutenmorgen",
      bio: "Ich lerne Vietnamesisch, um in Vietnam zu arbeiten.",
      profilePic: "https://avatar.iran.liara.run/public/06.png",
      nativeLanguage: "German",
      learningLanguage: "Vietnamese",
      location: "Berlin",
      isOnboarded: true,
      isOnline: false,
    },
  ]);

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
      {/* p-4 sm:p-6 lg:p-6  */}
      <div className="min-h-[calc(100vh-64px)] relative flex">
        <div className="w-20 lg:w-64 bg-base-200 border-r border-base-300 flex flex-col h-[calc(100vh-64px)]">
          <div className="h-16 px-4 flex items-center justify-center gap-2 border-b border-base-300">
            {/* <label className="label">
              <span className="label-text">{t("form.fullName.label")}</span>
            </label> */}
            <input
              type="text"
              name="fullName"
              value={""}
              onChange={(e) => {}}
              className="input input-bordered w-full pointer-events-none text-sm input-sm hidden lg:block"
              placeholder={"Tìm kiếm bạn bè"}
            />
            <div
              className={`btn btn-primary size-8 p-0 min-w-0 min-h-0 rounded-card cursor-pointer  text-sm flex items-center justify-center`}
              onClick={() => {
                //   setIsOpenFilter(true);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            >
              <Sparkles className="size-4" />
            </div>
          </div>
          {true ? (
            <div className="flex-1 overflow-y-auto">
              {friends.map((friend, index) => (
                // <div
                //   className={`h-16 border-y border-base-300 flex items-center justify-center lg:justify-start px-4 cursor-pointer ${
                //     selectedUser?.id === friend.id
                //       ? "btn-active"
                //       : "hover:bg-base-300"
                //   }`}
                //   onClick={() => setSelectedUser(friend)}
                // >
                //   <div className="flex items-center gap-3 relative">
                //     <div className="avatar ">
                //       <div className="w-10 rounded-full">
                //         <img
                //           src={
                //             friend?.profilePic ||
                //             "https://avatar.iran.liara.run/public/21.png"
                //           }
                //           alt=""
                //         />
                //       </div>
                //     </div>

                //     <div className="absolute left-8 -bottom-0">
                //       <span className="size-2 rounded-full bg-success inline-block" />
                //     </div>

                //     <div className="absolute -right-0 -bottom-0 lg:hidden">
                //       <span className="size-2 rounded-full bg-success inline-block" />
                //     </div>

                //     <div className="hidden lg:block">
                //       <p className="font-semibold text-sm">
                //         {friend?.fullName}
                //       </p>
                //       <p className="text-xs opacity-70 flex items-center gap-1">
                //         Đây là tin nhắn gần nhất
                //       </p>
                //     </div>
                //   </div>
                // </div>
                <FriendCard_ChatsPage
                  key={index}
                  friend={friend}
                  selectedId={selectedUser?.id}
                  onClick={setSelectedUser}
                />
              ))}
            </div>
          ) : (
            <></>
          )}
        </div>
        <div className="flex-1">
          {friends.length > 0 && selectedUser ? (
            <ChatWindow user={selectedUser} onClick={setSelectedUser} />
          ) : (
            <div className="p-16"></div>
          )}
        </div>
      </div>
    </>
  );
};

export default ChatsPage;
