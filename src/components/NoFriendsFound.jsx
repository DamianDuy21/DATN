import { useTranslation } from "react-i18next";

const NoFriendsFound = () => {
  const { t } = useTranslation("homePage");
  return (
    <div className="card bg-base-200 p-6 text-center">
      <h3 className="font-semibold mb-2">
        {t("recentConnections.empty.title")}
      </h3>
      <p className="text-base-content opacity-70 text-sm">
        {t("recentConnections.empty.subtitle")}
      </p>
    </div>
  );
};

export default NoFriendsFound;
