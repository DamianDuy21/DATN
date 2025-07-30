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

import NotificationsPage from "./pages/NotificationsPage";
import OnboardingPage from "./pages/OnboardingPage";
import ProfilePage from "./pages/ProfilePage.jsx";
import SignUpPage from "./pages/SignUpPage";
import { useThemeStore } from "./stores/useThemeStore.js";
import LoginPage from "./pages/LoginPage.jsx";

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
      <div className="min-h-screen" data-theme={theme}>
        <Routes>
          <Route
            path="/"
            element={
              isAuthenticated && isOnboarding ? (
                <MainLayout>
                  <HomePage />
                </MainLayout>
              ) : (
                <Navigate to={!isAuthenticated ? "/signin" : "/onboarding"} />
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
                <Navigate to={!isAuthenticated ? "/signin" : "/onboarding"} />
              )
            }
          />
          <Route
            path="/call/:id"
            element={
              isAuthenticated && isOnboarding ? (
                <CallVideoPage />
              ) : (
                <Navigate to={!isAuthenticated ? "/signin" : "/onboarding"} />
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
                <Navigate to={!isAuthenticated ? "/signin" : "/onboarding"} />
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
                <Navigate to={!isAuthenticated ? "/signin" : "/onboarding"} />
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
                <Navigate to={!isAuthenticated ? "/signin" : "/onboarding"} />
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
                <Navigate to={!isAuthenticated ? "/signin" : "/onboarding"} />
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
                <Navigate to={"/signin"} />
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
            path="/signin"
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

        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3000,
            style: {
              fontSize: "14px",
              minHeight: "48px",
              padding: "8px 16px",
            },
          }}
          gutter={8}
        />
      </div>
    </>
  );
};

export default App;
