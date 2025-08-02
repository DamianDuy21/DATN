import { BadgeCheck, CheckCheck } from "lucide-react";

const RightSideMessage = ({ content, sender, timestamp }) => {
  return (
    <div className="flex items-start justify-end h-full gap-3">
      <div className="avatar order-2">
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
      <div className="flex flex-col gap-2 max-w-[50%]">
        <div className=" bg-base-300 px-4 pt-2 pb-3 rounded-card">
          <div className="text-sm">{content}</div>
        </div>

        {/* timestamp */}
        {/* <div className="flex gap-2 mr-auto">
          <div className="text-xs opacity-70">
            {new Date(timestamp).toLocaleTimeString()}
          </div> 
           <div className="text-xs opacity-70 flex items-center gap-1">
            <CheckCheck className="size-3 relative top-[1px] text-secondary" />
            <span>Seen</span>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default RightSideMessage;
