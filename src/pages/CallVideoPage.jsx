import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useAuthUser } from "../hooks/useAuthUser";
import { useQuery } from "@tanstack/react-query";
import { getStreamToken } from "../lib/api";

import {
  CallingState,
  StreamCall,
  CallControls,
  SpeakerLayout,
  StreamTheme,
  StreamVideo,
  StreamVideoClient,
  useCallStateHooks,
} from "@stream-io/video-react-sdk";
import "@stream-io/video-react-sdk/dist/css/styles.css";
import PageLoader from "../components/PageLoader";
const STREAM_API_KEY = import.meta.env.VITE_STREAM_API_KEY;

const CallVideoPage = () => {
  const { id: callVideoId } = useParams();

  const [callVideoClient, setCallVideoClient] = useState(null);
  const [callVideoChannel, setCallVideoChannel] = useState(null);
  const [isCallVideoConnecting, setIsCallVideoConnecting] = useState(true);

  const { authUser, isLoading: isAuthUserLoading } = useAuthUser();

  const { data: streamTokenData } = useQuery({
    queryKey: ["getStreamToken"],
    queryFn: getStreamToken,
    // run only if user is authenticated (after getMe is triggered)
    enabled: Boolean(authUser),
  });

  useEffect(() => {
    const initCallVideo = async () => {
      if (!streamTokenData || !authUser || !callVideoId) {
        return;
      }
      try {
        const currentUser = {
          id: authUser._id,
          name: authUser.fullName,
          image: authUser.profilePic,
        };
        const callVideoClient = new StreamVideoClient({
          apiKey: STREAM_API_KEY,
          user: currentUser,
          token: streamTokenData.token,
        });
        const callVideoInstance = callVideoClient.call("default", callVideoId);
        callVideoInstance.join({ create: true });

        setCallVideoClient(callVideoClient);
        setCallVideoChannel(callVideoInstance);
      } catch (error) {
        console.error("Error initializing call video:", error);
      } finally {
        setIsCallVideoConnecting(false);
      }
    };
    initCallVideo();
  }, [streamTokenData, authUser, callVideoId]);

  if (isAuthUserLoading || isCallVideoConnecting) {
    return <PageLoader />;
  }

  return (
    <>
      <div className="h-screen flex flex-col items-center justify-center">
        <div className="relative">
          {callVideoClient && callVideoChannel ? (
            <StreamVideo client={callVideoClient}>
              <StreamCall call={callVideoChannel}>
                <CallContent />
              </StreamCall>
            </StreamVideo>
          ) : (
            <div className="flex items-center justify-center h-full">
              <p>
                Could not initialize call. Please refresh or try again later.
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

const CallContent = () => {
  const { useCallCallingState } = useCallStateHooks();
  const callingState = useCallCallingState();

  const navigate = useNavigate();

  // click hang up button or leave call
  if (callingState === CallingState.LEFT) return navigate("/");

  return (
    <StreamTheme>
      <SpeakerLayout />
      <CallControls />
    </StreamTheme>
  );
};

export default CallVideoPage;
