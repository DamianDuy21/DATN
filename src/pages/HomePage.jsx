import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { LoaderIcon, UsersIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router";

import { FriendCard_v2 } from "../components/FriendCard_v2.jsx";
import NoFriendsFound from "../components/NoFriendsFound.jsx";
import { RecommendedUser } from "../components/RecommendedUser.jsx";
import {
  getFriendRequests,
  getFriends,
  getOutgoingFriendRequests,
  getRecommendedUsers,
  sendFriendRequest,
} from "../lib/api.js";

const HomePage = () => {
  const queryClient = useQueryClient();
  const [outgoingRequestIds, setOutgoingRequestIds] = useState(new Set());
  const [incomingRequestIds, setIncomingRequestIds] = useState(new Set());

  const { data: friends = [], isLoading: isLoadingGetFriends } = useQuery({
    queryKey: ["getFriends"],
    queryFn: getFriends,
  });

  const {
    data: recommendedUsers = [],
    isLoading: isLoadingGetRecommendedUsers,
  } = useQuery({
    queryKey: ["getRecommendedUsers"],
    queryFn: getRecommendedUsers,
  });

  const {
    data: outgoingFriendRequests,
    // isLoading: isLoadingOutgoingFriendRequests,
  } = useQuery({
    queryKey: ["getOutgoingFriendRequests"],
    queryFn: getOutgoingFriendRequests,
  });

  const { data: incomingFriendRequests } = useQuery({
    queryKey: ["getIncomingFriendRequests"],
    queryFn: getFriendRequests,
  });

  const { mutate: sendFriendRequestMutation, isPending } = useMutation({
    mutationFn: sendFriendRequest,
    onSuccess: () => {
      queryClient.invalidateQueries(["getOutgoingFriendRequests"]);
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

  useEffect(() => {
    if (incomingFriendRequests) {
      const ids = new Set(
        incomingFriendRequests.friendRequests.map((req) => req.sender._id)
      );
      setIncomingRequestIds(ids);
    }
  }, [incomingFriendRequests]);

  return (
    <>
      <div className="p-4 sm:p-6 lg:p-8 min-h-[calc(100vh - 64px)] bg-base-100">
        <div className="w-full space-y-4 sm:space-y-6">
          <div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4 sm:mb-6">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold">
                  Recent Connections
                </h2>
                <p className="text-base-content opacity-70">
                  Continue practicing new languages with your friends!
                </p>
              </div>

              {/* <Link to="/notifications" className="btn btn-outline btn-sm">
              <UsersIcon className="size-4" />
              Friend Requests
            </Link> */}
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

          <section>
            <div className="mb-4 sm:mb-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-bold">
                    Meet New Learners
                  </h2>
                  <p className="text-base-content opacity-70">
                    Discover perfect language exchange partners based on your
                    profile
                  </p>
                </div>
              </div>
            </div>

            {isLoadingGetRecommendedUsers ? (
              <div className="flex justify-center py-12">
                <LoaderIcon className="animate-spin size-8" />
              </div>
            ) : recommendedUsers.length === 0 ? (
              <div className="card bg-base-200 p-6 text-center">
                <h3 className="font-semibold text-lg mb-2">
                  No recommendations available
                </h3>
                <p className="text-base-content opacity-70">
                  Check back later for new language partners!
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {recommendedUsers.map((user) => {
                  const hasRequestBeenSent = outgoingRequestIds.has(user._id);
                  const hasIncomingRequest = incomingRequestIds.has(user._id);
                  return (
                    <RecommendedUser
                      key={user._id}
                      user={user}
                      hasRequestBeenSent={hasRequestBeenSent}
                      hasIncomingRequest={hasIncomingRequest}
                      onClick={sendFriendRequestMutation}
                      isPending={isPending}
                    />
                  );
                })}
              </div>
            )}
          </section>
        </div>
      </div>
    </>
  );
};

export default HomePage;
