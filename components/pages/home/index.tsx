"use client";

import Wrapper from "@/components/layout/wrapper";
import MangaSlider from "./MangaSlider";
import { mangaData, progressData } from "@/lib/constants";
import HotUpdates from "./HotUpdates";
import ProgressSlider from "./ProgressSlider";
import HeaderTitle from "@/components/shared/HeaderTitle";
import { useAuth } from "@/components/contexts/auth.context";

const HomePageClient = () => {
  const { user } = useAuth();
  const isAuthenticated = !!user;
  return (
    <div className="w-full">
      <MangaSlider infiniteLoop={true} mangaData={mangaData} />
      <Wrapper noPadding>
        <HotUpdates />

        {/* Continue Reading */}
        {isAuthenticated && (
          <div className="mt-10 md:block hidden">
            <HeaderTitle title="Davom ettirish" href="/history" />
            <ProgressSlider progressData={progressData} />
          </div>
        )}
      </Wrapper>
    </div>
  );
};

export default HomePageClient;
