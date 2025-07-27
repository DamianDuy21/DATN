import { VideoIcon } from "lucide-react";

function CallVideoButton({ onClick }) {
  return (
    <div className="py-6 px-4 sm:px-6 lg:px-8 flex items-center justify-end  mx-auto w-full absolute top-0">
      <button
        onClick={onClick}
        className="btn bg-[#005fff] btn-sm text-white border-none hover:bg-[#005fff] rounded-full w-12 h-12 relative -top-2"
      >
        <VideoIcon className="size-6" />
      </button>
    </div>
  );
}

export default CallVideoButton;
