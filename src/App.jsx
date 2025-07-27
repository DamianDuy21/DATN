import { Toaster } from "react-hot-toast";
import { Navigate, Route, Routes } from "react-router";
import PageLoader from "./components/PageLoader.jsx";
import { useAuthUser } from "./hooks/useAuthUser.js";
import MainLayout from "./layouts/MainLayout.jsx";
import CallVideoPage from "./pages/CallVideoPage.jsx";
import ChangePasswordPage from "./pages/ChangePasswordPage.jsx";
import ChatPage from "./pages/ChatPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage.jsx";
import FriendsPage from "./pages/FriendsPage.jsx";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import NotificationsPage from "./pages/NotificationsPage";
import OnboardingPage from "./pages/OnboardingPage";
import ProfilePage from "./pages/ProfilePage.jsx";
import SignUpPage from "./pages/SignUpPage";
import { useThemeStore } from "./stores/useThemeStore.js";

const App = () => {
  const { isLoading, authUser } = useAuthUser();
  const { theme } = useThemeStore();

  const isAuthenticated = Boolean(authUser);
  const isOnboarding = authUser?.isOnboarded;

  if (isLoading) {
    return <PageLoader />;
  }

  return (
    <>
      <div className="h-screen" data-theme={theme}>
        <Routes>
          <Route
            path="/"
            element={
              isAuthenticated && isOnboarding ? (
                <MainLayout>
                  <HomePage />
                </MainLayout>
              ) : (
                <Navigate to={!isAuthenticated ? "/login" : "/onboarding"} />
              )
            }
          />
          <Route
            path="/chat/:id"
            element={
              isAuthenticated && isOnboarding ? (
                <MainLayout>
                  <ChatPage />
                </MainLayout>
              ) : (
                <Navigate to={!isAuthenticated ? "/login" : "/onboarding"} />
              )
            }
          />
          <Route
            path="/call/:id"
            element={
              isAuthenticated && isOnboarding ? (
                <CallVideoPage />
              ) : (
                <Navigate to={!isAuthenticated ? "/login" : "/onboarding"} />
              )
            }
          />
          <Route
            path="/notifications"
            element={
              isAuthenticated && isOnboarding ? (
                <MainLayout>
                  <NotificationsPage />
                </MainLayout>
              ) : (
                <Navigate to={!isAuthenticated ? "/login" : "/onboarding"} />
              )
            }
          />
          <Route
            path="/friends"
            element={
              isAuthenticated && isOnboarding ? (
                <MainLayout>
                  <FriendsPage />
                </MainLayout>
              ) : (
                <Navigate to={!isAuthenticated ? "/login" : "/onboarding"} />
              )
            }
          />
          <Route
            path="/profile"
            element={
              isAuthenticated && isOnboarding ? (
                <MainLayout>
                  <ProfilePage />
                </MainLayout>
              ) : (
                <Navigate to={!isAuthenticated ? "/login" : "/onboarding"} />
              )
            }
          />
          <Route
            path="/change-password"
            element={
              isAuthenticated && isOnboarding ? (
                <MainLayout>
                  <ChangePasswordPage />
                </MainLayout>
              ) : (
                <Navigate to={!isAuthenticated ? "/login" : "/onboarding"} />
              )
            }
          />

          <Route
            path="/onboarding"
            element={
              isAuthenticated ? (
                !isOnboarding ? (
                  <OnboardingPage />
                ) : (
                  <Navigate to={"/"} />
                )
              ) : (
                <Navigate to={"/login"} />
              )
            }
          />
          <Route
            path="/signup"
            element={
              !isAuthenticated ? (
                <SignUpPage />
              ) : (
                <Navigate to={!isOnboarding ? "/onboarding" : "/"} />
              )
            }
          />
          <Route
            path="/login"
            element={
              !isAuthenticated ? (
                <LoginPage />
              ) : (
                <Navigate to={!isOnboarding ? "/onboarding" : "/"} />
              )
            }
          />
          <Route
            path="/forgot-password"
            element={
              !isAuthenticated ? (
                <ForgotPasswordPage />
              ) : (
                <Navigate to={!isOnboarding ? "/onboarding" : "/"} />
              )
            }
          />
        </Routes>

        <Toaster position="top-right" />
      </div>
    </>
  );
};

export default App;
