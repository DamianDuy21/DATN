import { Link } from "react-router";
import { capitalize } from "../lib/utils";
import { getLanguageFlag } from "./FriendCard_v2";
import { CheckCircleIcon, MapPinIcon, UserPlusIcon } from "lucide-react";

export const RecommendedUser = ({
  user,
  hasRequestBeenSent,
  hasIncomingRequest,
  onClick,
  isPending,
}) => {
  return (
    <div
      key={user._id}
      className="card bg-base-200 hover:shadow-lg transition-all duration-300"
    >
      <div className="card-body p-5 space-y-4">
        <div className="flex items-center gap-3">
          <div className="avatar size-16 rounded-full">
            <img src={user.profilePic} alt={user.fullName} />
          </div>

          <div>
            <h3 className="font-semibold text-lg">{user.fullName}</h3>
            {user.location && (
              <div className="flex items-center text-xs opacity-70 mt-1">
                <MapPinIcon className="size-3 mr-1" />
                {user.location}
              </div>
            )}
          </div>
        </div>

        {/* Languages with flags */}
        <div className="flex flex-wrap gap-2">
          <span className="badge badge-secondary h-8 px-4 flex items-center gap-1 relative -top-[1px]">
            {getLanguageFlag(user.nativeLanguage)}
            Native: {capitalize(user.nativeLanguage)}
          </span>
          <span className="badge badge-outline h-8 px-4 flex items-center gap-1 relative -top-[1px]">
            {getLanguageFlag(user.learningLanguage)}
            Learning: {capitalize(user.learningLanguage)}
          </span>
        </div>

        {user.bio && <p className="text-sm opacity-70">{user.bio}</p>}

        {/* Action button */}
        {hasIncomingRequest ? (
          <Link to="/notifications" className="btn btn-primary w-full mt-2">
            <CheckCircleIcon className="size-4" />
            Incoming Request
          </Link>
        ) : (
          <button
            className={`btn w-full mt-2 ${
              hasRequestBeenSent ? "btn-disabled" : "btn-primary"
            }`}
            onClick={() => onClick(user._id)}
            disabled={hasRequestBeenSent || isPending}
          >
            {hasRequestBeenSent ? (
              <>
                <CheckCircleIcon className="size-4" />
                Request Sent
              </>
            ) : (
              <>
                <UserPlusIcon className="size-4" />
                Send Friend Request
              </>
            )}
          </button>
        )}
      </div>
    </div>
  );
};
