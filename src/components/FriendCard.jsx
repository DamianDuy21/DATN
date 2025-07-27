import { Link } from "react-router";
import { LANGUAGE_TO_FLAG } from "../constants";
import { capitalize } from "../lib/utils";
import { getLanguageFlag } from "./FriendCard_v2";

const FriendCard = ({ friend }) => {
  return (
    <div className="card bg-base-200 hover:shadow-md transition-shadow">
      <div className="card-body p-4">
        {/* USER INFO */}
        <div className="flex items-center gap-3 mb-2">
          <div className="avatar size-10">
            <img src={friend.profilePic} alt={""} />
          </div>
          {/* <h3 className="font-semibold text-sm truncate">{friend.fullName}</h3> */}
          <div className="flex-1">
            <p className="font-semibold text-sm">{friend.fullName}</p>
            <p className="text-xs text-success flex items-center gap-1">
              <span className="size-2 rounded-full bg-success inline-block" />
              Online
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-2">
          <span className="badge badge-secondary text-xs h-6">
            {getLanguageFlag(friend.nativeLanguage)}
            Native: {capitalize(friend.nativeLanguage)}
          </span>
          <span className="badge badge-outline text-xs h-6">
            {getLanguageFlag(friend.learningLanguage)}
            Learning: {capitalize(friend.learningLanguage)}
          </span>
        </div>

        <Link to={`/chat/${friend._id}`} className="btn btn-outline w-full">
          Message
        </Link>
      </div>
    </div>
  );
};
export default FriendCard;
