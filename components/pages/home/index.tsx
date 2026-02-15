"use client";

import Wrapper from "@/components/layout/wrapper";
import MangaSlider from "./MangaSlider";
import { mangaData, progressData, sliderData } from "@/lib/constants";
import HotUpdates from "./HotUpdates";
import ProgressSlider from "./ProgressSlider";
import HeaderTitle from "@/components/shared/HeaderTitle";
import { useAuth } from "@/components/contexts/auth.context";
import HomeSlider from "./HomeSlider";
import { useGetMangas } from "@/components/hooks/api/useManga";

const HomePageClient = () => {
  const { user } = useAuth();
  const mangaQuery = useGetMangas();
  const mangaData = mangaQuery.data?.data?.mangas || [];

  console.log(mangaData);

  const isAuthenticated = !!user;
  return (
    <div className="w-full">
      <MangaSlider
        infiniteLoop={true}
        mangaData={mangaData}
        loading={mangaQuery.isLoading}
        skeletonCount={10}
      />
      <Wrapper noPadding>
        <HotUpdates mangaData={mangaData} loading={mangaQuery.isLoading} />

        {/* Continue Reading */}
        {isAuthenticated && (
          <div className="mt-10 md:block hidden">
            <HeaderTitle title="Davom ettirish" href="/history" />
            <ProgressSlider progressData={progressData} />
          </div>
        )}

        {/* Home Slider */}
        <div className="mt-5">
          <HomeSlider
            nextPrevButtons={false}
            infiniteLoop
            sliderData={sliderData}
          />
        </div>
      </Wrapper>
    </div>
  );
};

export default HomePageClient;
