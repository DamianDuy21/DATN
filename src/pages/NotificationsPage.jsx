import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  BellIcon,
  Check,
  ClockIcon,
  LoaderIcon,
  MessageSquareIcon,
  UserCheckIcon,
  X,
} from "lucide-react";
import NoNotificationsFound from "../components/NoNotificationsFound.jsx";
import { acceptFriendRequestAPI, getFriendRequestsAPI } from "../lib/api.js";

import { getLanguageFlag } from "../components/FriendCard_v2.jsx";
import { capitalize } from "../lib/utils.js";

const NotificationsPage = () => {
  const queryClient = useQueryClient();

  const { data: friendRequests, isLoading } = useQuery({
    queryKey: ["getFriendRequests"],
    queryFn: getFriendRequestsAPI,
  });

  const { mutate: acceptFriendRequestMutation, isPending: isAccepting } =
    useMutation({
      mutationFn: acceptFriendRequestAPI,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["getFriendRequests"] });
        queryClient.invalidateQueries({ queryKey: ["getFriends"] });
        queryClient.invalidateQueries({ queryKey: ["getRecommendedUsers"] });
      },
    });

  const incomingFriendRequests = friendRequests?.friendRequests || [];
  const acceptedFriendRequests = friendRequests?.acceptedRequests || [];

  return (
    <>
      <div className="p-4 sm:p-6 lg:p-8 min-h-[calc(100vh - 64px)] bg-base-100">
        <div className="w-full space-y-4 sm:space-y-6">
          <h1 className="text-2xl sm:text-2xl font-bold mb-4 sm:mb-6">
            Notifications
          </h1>

          {isLoading ? (
            <div className="flex justify-center h-[100px] items-center">
              <LoaderIcon className="animate-spin size-8" />
            </div>
          ) : (
            <>
              {incomingFriendRequests.length > 0 && (
                <section className="space-y-4">
                  <h2 className="text-xl font-semibold flex items-center gap-2">
                    <UserCheckIcon className="h-5 w-5 text-primary" />
                    Friend Requests
                    <span className="badge badge-primary ml-2 py-3 relative top-[1px]">
                      {incomingFriendRequests.length}
                    </span>
                  </h2>

                  <div className="space-y-3">
                    {incomingFriendRequests.map((request) => (
                      <div
                        key={request._id}
                        className="card bg-base-200 hover:shadow-lg transition-all duration-300"
                      >
                        <div className="card-body p-5">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className="avatar w-16 h-16 rounded-full bg-base-300">
                                <img
                                  src={request.sender.profilePic}
                                  alt={request.sender.fullName}
                                />
                              </div>
                              <div>
                                <h3 className="font-semibold text-lg">
                                  {request.sender.fullName}
                                </h3>
                                <div className="flex flex-wrap gap-2 mt-2">
                                  <span className="badge badge-secondary h-8 px-4 flex items-center gap-1 relative -top-[1px]">
                                    {getLanguageFlag(
                                      request.sender.nativeLanguage
                                    )}
                                    Native:{" "}
                                    {capitalize(request.sender.nativeLanguage)}
                                  </span>

                                  <span className="badge badge-outline h-8 px-4 flex items-center gap-1 relative -top-[1px]">
                                    {getLanguageFlag(
                                      request.sender.learningLanguage
                                    )}
                                    Learning:{" "}
                                    {capitalize(
                                      request.sender.learningLanguage
                                    )}
                                  </span>
                                </div>
                              </div>
                            </div>

                            <div className="flex gap-4">
                              <button
                                className="btn btn-primary btn-sm w-12 h-12 flex items-center justify-center rounded-full"
                                onClick={() =>
                                  acceptFriendRequestMutation(request._id)
                                }
                                disabled={isAccepting}
                              >
                                <Check />
                              </button>
                              <button
                                className="btn btn-secondary btn-sm w-12 h-12 flex items-center justify-center rounded-full"
                                onClick={() =>
                                  acceptFriendRequestMutation(request._id)
                                }
                                disabled={isAccepting}
                              >
                                <X />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* ACCEPTED REQUESTS NOTIFICATIONS */}
              {acceptedFriendRequests.length > 0 && (
                <section className="space-y-4">
                  <h2 className="text-xl font-semibold flex items-center gap-2">
                    <BellIcon className="h-5 w-5 text-primary" />
                    New Connections
                    <span className="badge badge-primary ml-2 py-3 relative top-[1px]">
                      {acceptedFriendRequests.length}
                    </span>
                  </h2>

                  <div className="space-y-3">
                    {acceptedFriendRequests.map((notification) => (
                      <div
                        key={notification._id}
                        className="card bg-base-200 shadow-sm"
                      >
                        <div className="card-body p-5">
                          <div className="flex items-start gap-3">
                            <div className="avatar mt-1 size-10 rounded-full">
                              <img
                                src={notification.recipient.profilePic}
                                alt={""}
                              />
                            </div>
                            <div className="flex-1">
                              <h3 className="font-semibold text-sm">
                                {notification.recipient.fullName}
                              </h3>
                              <p className="text-sm mb-2">
                                {notification.recipient.fullName} accepted your
                                friend request
                              </p>
                              <p className="text-xs flex items-center opacity-70">
                                <ClockIcon className="h-3 w-3 mr-1" />
                                <span className="relative -top-[0.5px]">
                                  Recently
                                </span>
                              </p>
                            </div>
                            <div className="badge badge-primary text-xs h-6">
                              <MessageSquareIcon className="h-3 w-3 mr-1" />
                              <span className="relative -top-[1px]">
                                New Friend
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {incomingFriendRequests.length === 0 &&
                acceptedFriendRequests.length === 0 && <NoNotificationsFound />}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default NotificationsPage;
