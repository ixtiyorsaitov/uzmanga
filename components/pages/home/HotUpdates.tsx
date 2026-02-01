import HeaderTitle from "@/components/shared/HeaderTitle";
import MangaSlider from "./MangaSlider";
import { mangaData } from "@/lib/constants";

const HotUpdates = () => {
  return (
    <div className="space-y-3">
      <HeaderTitle title="Eng so'ngi" href="/hot-updates" />
      <MangaSlider infiniteLoop={false} mangaData={mangaData} autoSize={true} />
    </div>
  );
};

export default HotUpdates;
