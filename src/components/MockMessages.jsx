import { useEffect, useRef } from "react";
import LeftSideMessage from "./LeftSideMessage";
import RightSideMessage from "./RightSideMessage";

const MockMessages = ({ user }) => {
  const scrollRef = useRef();
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [user]);
  const conversation = [
    {
      sender: {
        id: 13,
        fullName: "Isabella Rossi",
        email: "isabella@example.com",
        password: "italy321",
        bio: "Imparo il vietnamita per lavoro e cultura.",
        profilePic: "https://avatar.iran.liara.run/public/05.png",
        nativeLanguage: "Italian",
        learningLanguage: "Vietnamese",
        location: "Rome",
        isOnboarded: true,
        isOnline: false,
        isRead: true,
      },
      content: "Ciao! Come va? Sto imparando il vietnamita.",
      timestamp: "2023-10-01T10:00:00Z",
    },
    {
      sender: {
        id: 14,
        fullName: "Trọng Đạt",
        email: "trongdat@example.com",
        password: "dat123",
        bio: "Mình muốn kết nối với bạn bè quốc tế.",
        profilePic: "https://avatar.iran.liara.run/public/13.png",
        nativeLanguage: "Vietnamese",
        learningLanguage: "English",
        location: "Nghệ An",
        isOnboarded: true,
        isOnline: true,
        isReady: true,
      },
      content: "Chào! Mình là Trọng Đạt. Mình đang học tiếng Ý.",
      timestamp: "2023-10-01T10:05:00Z",
    },
  ];
  return (
    <div className="flex flex-col gap-4">
      <LeftSideMessage
        content={conversation[0].content}
        sender={conversation[0].sender}
        timestamp={conversation[0].timestamp}
      ></LeftSideMessage>
      <RightSideMessage
        content={conversation[1].content}
        sender={conversation[1].sender}
        timestamp={conversation[1].timestamp}
      ></RightSideMessage>
      <LeftSideMessage
        content={conversation[0].content}
        sender={conversation[0].sender}
        timestamp={conversation[0].timestamp}
      ></LeftSideMessage>
      <RightSideMessage
        content={conversation[1].content}
        sender={conversation[1].sender}
        timestamp={conversation[1].timestamp}
      ></RightSideMessage>
      <LeftSideMessage
        content={conversation[0].content}
        sender={conversation[0].sender}
        timestamp={conversation[0].timestamp}
      ></LeftSideMessage>
      <RightSideMessage
        content={conversation[1].content}
        sender={conversation[1].sender}
        timestamp={conversation[1].timestamp}
      ></RightSideMessage>
      <LeftSideMessage
        content={conversation[0].content}
        sender={conversation[0].sender}
        timestamp={conversation[0].timestamp}
      ></LeftSideMessage>
      <RightSideMessage
        content={conversation[1].content}
        sender={conversation[1].sender}
        timestamp={conversation[1].timestamp}
      ></RightSideMessage>
      <div ref={scrollRef} className="!-mt-4"></div>
    </div>
  );
};

export default MockMessages;
