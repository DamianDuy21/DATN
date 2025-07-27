import { Hexagon, HomeIcon, UsersIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router";
import { useAuthUser } from "../../hooks/useAuthUser";

const Sidebar = () => {
  const { authUser } = useAuthUser();
  const location = useLocation();
  const currentPath = location.pathname;

  const isChatPage = location.pathname?.startsWith("/chat");
  const isProfilePage = location.pathname?.startsWith("/profile");
  const isChangePasswordPage =
    location.pathname?.startsWith("/change-password");

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <aside className="w-20 lg:w-64 bg-base-200 border-r border-base-300 flex flex-col h-screen sticky top-0">
        <div className="w-full px-4 lg:px-8 h-16 border-b border-base-300 flex items-center justify-center lg:justify-start">
          {!isProfilePage && !isChatPage && !isChangePasswordPage ? (
            windowWidth > 1024 ? (
              <div className="">
                <Link to="/" className="flex items-center gap-2.5">
                  <Hexagon className="size-6 text-primary" />
                  <span className="text-2xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary  tracking-wider">
                    Chatify
                  </span>
                </Link>
              </div>
            ) : (
              <div className="">
                <Link to="/" className="flex items-center gap-2.5">
                  <Hexagon className="size-8 text-primary" />
                </Link>
              </div>
            )
          ) : null}
        </div>

        <nav className="flex-1 p-4 space-y-2">
          <Link
            to="/"
            className={`btn btn-ghost flex justify-center items-center lg:justify-start w-full px-0 lg:gap-4 lg:px-4 normal-case  ${
              currentPath === "/" ? "btn-active" : ""
            }`}
          >
            <HomeIcon className="!size-5 text-base-content opacity-70" />
            {!isProfilePage && !isChatPage && !isChangePasswordPage ? (
              <span className="hidden lg:block">Home</span>
            ) : null}
          </Link>
          <Link
            to="/friends"
            className={`btn btn-ghost flex justify-center items-center lg:justify-start w-full px-0 lg:gap-4 lg:px-4 normal-case ${
              currentPath === "/friends" ? "btn-active" : ""
            }`}
          >
            <UsersIcon className="size-5 text-base-content opacity-70" />
            {!isProfilePage && !isChatPage && !isChangePasswordPage ? (
              <span className="hidden lg:block">Friends</span>
            ) : null}
          </Link>
        </nav>

        {/* USER PROFILE SECTION */}
        <div className="h-16 border-t border-base-300 mt-auto flex items-center justify-center lg:justify-start px-4">
          <div className="flex items-center gap-3 relative">
            <div className="avatar">
              <div className="w-10 rounded-full ">
                <img src={authUser?.profilePic} alt="" />
              </div>
            </div>
            <div className="absolute -right-0 -bottom-0 lg:hidden">
              <span className="size-2 rounded-full bg-success inline-block" />
            </div>
            {!isProfilePage && !isChatPage && !isChangePasswordPage ? (
              <div className="hidden lg:block">
                <p className="font-semibold text-sm">{authUser?.fullName}</p>
                <p className="text-xs text-success flex items-center gap-1">
                  <span className="size-2 rounded-full bg-success inline-block" />
                  Online
                </p>
              </div>
            ) : null}
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
