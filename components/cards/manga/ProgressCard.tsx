import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { IProgress } from "@/types/progress";

interface Props {
  progress: IProgress;
  auto?: boolean;
}

const ProgressCard = ({ progress, auto }: Props) => {
  return (
    <div className="w-full">
      {/* Card Image */}
      <div
        className={cn(
          "relative rounded-2xl overflow-hidden shadow-sm w-full aspect-162/243 h-[112px] bg-card flex gap-2 p-2",
        )}
      >
        {/* Image */}
        <div className="w-16 h-full bg-primary rounded-xl shrink-0"></div>

        {/* Content */}
        <div className="h-full flex flex-col justify-center space-y-2 flex-1 min-w-0">
          <h1 className="text-sm font-semibold tracking-wide line-clamp-2">
            {progress.manga.title}
          </h1>

          <div className="w-full space-y-1">
            <p className="text-xs text-muted-foreground">
              Bob {progress.readChaptersCount} / {progress.chaptersCount}
            </p>
            <Progress
              className="w-full h-1 bg-muted"
              value={progress.progress}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressCard;
