import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useAuthUser } from "../hooks/useAuthUser.js";
import { useQuery } from "@tanstack/react-query";
import { getStreamToken } from "../lib/api.js";
import {
  Chat,
  Channel,
  ChannelHeader,
  MessageInput,
  MessageList,
  Thread,
  Window,
} from "stream-chat-react";

import { StreamChat } from "stream-chat";
import ChatPageLoader from "../components/ChatPageLoader.jsx";
import CallVideoButton from "../components/CallVideoButton.jsx";

const ChatPage = () => {
  const { id: receivedUserId } = useParams();

  const [chatClient, setChatClient] = useState(null);
  const [chatChannel, setChatChannel] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const { authUser } = useAuthUser();

  const { data: streamTokenData } = useQuery({
    queryKey: ["getStreamToken"],
    queryFn: getStreamToken,
    // run only if user is authenticated (after getMe is triggered)
    enabled: Boolean(authUser),
  });

  const handleCallVideo = () => {
    if (chatChannel) {
      const callVideoUrl = `${window.location.origin}/call/${chatChannel.id}`;

      chatChannel.sendMessage({
        text: `I've started a video call. Click here to join: ${callVideoUrl}`,
      });
    }
  };

  useEffect(() => {
    const initChat = async () => {
      if (!streamTokenData || !authUser) {
        return;
      }
      try {
        const client = StreamChat.getInstance(
          import.meta.env.VITE_STREAM_API_KEY
        );
        await client.connectUser(
          {
            id: authUser._id,
            name: authUser.fullName,
            image: authUser.profilePic,
          },
          streamTokenData.token
        );

        // sort to make sure chat A B is the same as B A
        const channelId = [authUser._id, receivedUserId].sort().join("-");
        const channel = client.channel("messaging", channelId, {
          members: [authUser._id, receivedUserId],
        });
        await channel.watch();

        setChatClient(client);
        setChatChannel(channel);
      } catch (error) {
        console.error("Error initializing chat:", error);
      } finally {
        setIsLoading(false);
      }
    };
    initChat();
  }, [streamTokenData, authUser, receivedUserId]);

  if (isLoading || !chatClient || !chatChannel) {
    return <ChatPageLoader />;
  }

  return (
    <>
      <div className="h-[calc(100vh-64px)]">
        <Chat client={chatClient}>
          <Channel channel={chatChannel}>
            <div className="w-full relative">
              <CallVideoButton
                onClick={() => {
                  handleCallVideo();
                }}
              />
              <Window>
                <ChannelHeader />
                <MessageList />
                <MessageInput />
              </Window>
            </div>
            <Thread />
          </Channel>
        </Chat>
      </div>
    </>
  );
};

export default ChatPage;
