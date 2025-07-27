import { Link } from "react-router";
import { LANGUAGE_TO_FLAG } from "../constants";
import { capitalize } from "../lib/utils";

export const FriendCard_v2 = ({ friend }) => {
  return (
    <div
      key={friend._id}
      className="card bg-base-200 hover:shadow-lg transition-all duration-300"
    >
      <div className="card-body p-5 space-y-4">
        <div className="flex items-center gap-3">
          <div className="avatar size-16 rounded-full">
            <img src={friend.profilePic} alt={friend.fullName} />
          </div>

          <div>
            <h3 className="font-semibold text-lg">{friend.fullName}</h3>
            <p className="text-xs text-success flex items-center gap-1">
              <span className="size-2 rounded-full bg-success inline-block" />
              Online
            </p>
          </div>
        </div>

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

        <Link to={`/chat/${friend._id}`} className="btn btn-outline w-full">
          Message
        </Link>
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
