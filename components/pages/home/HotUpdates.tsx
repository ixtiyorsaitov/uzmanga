import HeaderTitle from "@/components/shared/HeaderTitle";
import MangaSlider from "./MangaSlider";
import { IManga } from "@/types/manga";

const HotUpdates = ({ mangaData, loading }: { mangaData: IManga[]; loading: boolean }) => {
  return (
    <div className="space-y-3">
      <HeaderTitle title="Eng so'ngi" href="/hot-updates" />
      <MangaSlider infiniteLoop={false} mangaData={mangaData} autoSize={true} loading={loading} skeletonCount={8} />
    </div>
  );
};

export default HotUpdates;
