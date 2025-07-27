import { useQuery } from "@tanstack/react-query";
import { LoaderIcon, UsersIcon } from "lucide-react";
import { Link } from "react-router";

import { FriendCard_v2 } from "../components/FriendCard_v2.jsx";
import NoFriendsFound from "../components/NoFriendsFound.jsx";
import { getFriends } from "../lib/api.js";

const FriendsPage = () => {
  const { data: friends = [], isLoading: isLoadingGetFriends } = useQuery({
    queryKey: ["getFriends"],
    queryFn: getFriends,
  });

  return (
    <>
      <div className="p-4 sm:p-6 lg:p-8 min-h-[calc(100vh - 64px)] bg-base-100">
        <div className="w-full space-y-4 sm:space-y-6">
          <div className="flex items-center justify-between gap-4 mb-4 sm:mb-6">
            <h2 className="text-2xl sm:text-3xl font-bold">Your Friends</h2>
            <Link to="/notifications" className="btn btn-outline btn-sm">
              <UsersIcon className="size-4" />
              Friend Requests
            </Link>
          </div>

          {isLoadingGetFriends ? (
            <div className="flex justify-center py-12">
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
      </div>
    </>
  );
};

export default FriendsPage;
