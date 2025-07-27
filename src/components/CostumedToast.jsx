import { toast } from "react-hot-toast";

// ✅ Component hiển thị giao diện toast
function CostumedToast({ t, title, message, type = "success" }) {
  const isSuccess = type === "success";

  return (
    <div
      className={`${
        t.visible ? "animate-enter" : "animate-leave"
      } max-w-sm w-full rounded-lg shadow-lg ring-1 px-4 pr-10 py-[14px] transition-all relative !items-start
        ${
          isSuccess
            ? "bg-green-100 ring-green-300 text-green-800"
            : "bg-red-100 ring-red-300 text-red-800"
        }`}
    >
      {title && <div className=" font-medium mb-1">{title}</div>}
      <div className="text-sm font-medium">{message}</div>

      <button
        onClick={() => toast.dismiss(t.id)}
        className={`ml-4 text-2xl font-bold absolute top-[5px] right-[16px] ${
          isSuccess ? "text-green-700" : "text-red-700"
        }`}
      >
        ×
      </button>
    </div>
  );
}

// ✅ Hàm gọi toast tùy biến
export function showToast({ title, message, type = "success" }) {
  toast.custom((t) => (
    <CostumedToast t={t} title={title} message={message} type={type} />
  ));
}
