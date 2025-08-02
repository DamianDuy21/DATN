import { BadgeCheck, CheckCheck, ChevronDown } from "lucide-react";
import React from "react";

const LeftSideMessage = ({ content, sender, timestamp }) => {
  return (
    <div className="flex items-start justify-start h-full gap-3">
      <div className="avatar">
        <div className="w-10 rounded-full">
          <img
            src={
              sender?.profilePic ||
              "https://avatar.iran.liara.run/public/21.png"
            }
            alt=""
          />
        </div>
      </div>
      <div className="flex items-center gap-2 max-w-[50%] group">
        <div className="flex flex-col gap-2 max-w-[calc(100%-32px)]">
          <div className=" bg-base-300 px-4 pt-2 pb-3 rounded-card">
            <div className="text-sm">
              {content} {content} {content} {content}
            </div>
          </div>

          {/* timestamp */}
          <div className="flex gap-2 ml-auto">
            {/* <div className="text-xs opacity-70">
            {new Date(timestamp).toLocaleTimeString()}
          </div> */}
            {sender.isRead && (
              <div className="text-xs opacity-70 flex items-center gap-1">
                <CheckCheck className="size-3 relative top-[1px] text-primary" />
                <span>Seen</span>
              </div>
            )}
          </div>
        </div>
        <div
          className={`${
            sender.isRead ? "relative -top-3" : "relative -top-1"
          } text-xs bg-base-300 !w-6 !h-6 cursor-pointer rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center`}
        >
          <span className="relative -top-1">...</span>
        </div>
      </div>
    </div>
  );
};

export default LeftSideMessage;
