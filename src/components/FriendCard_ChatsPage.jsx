import React from "react";

const FriendCard_ChatsPage = ({ key, friend, selectedId, onClick }) => {
  return (
    <div
      className={`h-16 ${
        key != 1 ? "border-b" : ""
      } border-base-300 flex items-center justify-center lg:justify-start px-4 cursor-pointer relative ${
        selectedId === friend.id ? "btn-active" : "hover:bg-base-300"
      }`}
      onClick={() => onClick(friend)}
    >
      <div className="flex items-center gap-3 relative">
        <div className="avatar ">
          <div className="w-10 rounded-full">
            <img
              src={
                friend?.profilePic ||
                "https://avatar.iran.liara.run/public/21.png"
              }
              alt=""
            />
          </div>
        </div>

        <div className="absolute left-8 -bottom-0">
          <span className="size-2 rounded-full bg-success inline-block" />
        </div>

        <div className="absolute -right-0 -bottom-0 lg:hidden">
          <span className="size-2 rounded-full bg-success inline-block" />
        </div>

        <div className="hidden lg:block">
          <p className="font-semibold text-sm">{friend?.fullName}</p>
          <p className="text-xs opacity-70 flex items-center gap-1">
            Đây là tin nhắn gần nhất
          </p>
        </div>
      </div>

      <div className="absolute right-2 top-2">
        {friend?.unReadMessages > 0 && (
          <div className="text-xs btn btn-secondary btn-xs rounded-full">
            {friend.unReadMessages}
          </div>
        )}
      </div>
    </div>
  );
};

export default FriendCard_ChatsPage;
