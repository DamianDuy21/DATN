import { Link } from "react-router";
import { LANGUAGE_TO_FLAG } from "../constants";
import { capitalize } from "../lib/utils";
import { MessageCircle, X } from "lucide-react";
import { useNavigate } from "react-router";
import { useEffect, useRef, useState } from "react";
import CountAndMessageBadge from "./CountAndMessageBadge";

export const FriendCard_v2_FriendsPage = ({ friend, handleDeleteFriend }) => {
  const navigate = useNavigate();

  const handleRedirectToChatPage = (e) => {
    e.stopPropagation();
    navigate(`/chat/${friend._id}`);
  };

  return (
    <div
      key={friend._id}
      className="card bg-base-200 hover:shadow-lg transition-all duration-300 relative"
    >
      <div className="card-body p-4 space-y-2">
        <div className="flex items-center gap-3">
          <div className="avatar size-10 rounded-full">
            <img src={friend.profilePic} alt={friend.fullName} />
          </div>

          <div>
            <h3 className="font-semibold text-sm">{friend.fullName}</h3>
            <p className="text-xs text-success flex items-center gap-1">
              <span className="size-2 rounded-full bg-success inline-block" />
              Online
            </p>
          </div>
        </div>

        {friend.bio && <p className="text-sm line-clamp-2">{friend.bio}</p>}

        {/* Languages with flags */}
        <div className="flex flex-wrap gap-2">
          <span className="badge badge-secondary h-8 px-4 flex items-center gap-1 relative -top-[1px]">
            {getLanguageFlag(friend.nativeLanguage)}
            Native: {capitalize(friend.nativeLanguage)}
          </span>
          <span className="badge badge-outline h-8 px-4 flex items-center gap-1 relative -top-[1px]">
            {getLanguageFlag(friend.learningLanguage)}
            Learning: {capitalize(friend.learningLanguage)}
          </span>
        </div>

        {/* <Link to={`/chat/${friend._id}`} className="btn btn-outline w-full">
          Message
        </Link> */}

        {/* <div className="absolute top-2 right-14 group w-fit h-fit">
          <div className="btn btn-secondary size-8 p-0 min-w-0 min-h-0 rounded-card cursor-pointer text-sm items-center justify-center hidden group-hover:flex">
            <MessageCircle className="size-4" />
          </div>

          <div className="btn btn-primary size-8 p-0 min-w-0 min-h-0 rounded-card cursor-pointer flex text-sm items-center justify-center group-hover:hidden">
            1
          </div>
        </div> */}
        <CountAndMessageBadge
          count={friend.unReadMessages || 0}
          className={"absolute top-2 right-14"}
        ></CountAndMessageBadge>

        <div
          className="btn btn-primary size-8 p-0 min-w-0 min-h-0 rounded-card absolute top-2 right-4 cursor-pointer flex text-sm items-center justify-center "
          onClick={(e) => {
            e.stopPropagation();
            handleDeleteFriend(friend._id);
          }}
        >
          <X className="size-4" />
        </div>
      </div>
    </div>
  );
};

export function getLanguageFlag(language) {
  if (!language) return null;

  const langLower = language.toLowerCase();
  const countryCode = LANGUAGE_TO_FLAG[langLower];

  if (countryCode) {
    return (
      <img
        src={`https://flagcdn.com/24x18/${countryCode}.png`}
        alt={`${langLower} flag`}
        className="h-3 mr-1 inline-block"
      />
    );
  }
  return null;
}
