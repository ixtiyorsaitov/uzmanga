import { GoogleIcon, TelegramIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";

const WithProviders = ({ disabled }: { disabled: boolean }) => {
  return (
    <div className="flex justify-center gap-2">
      <Button disabled={disabled} className="w-[50%]" variant={"secondary"}>
        <TelegramIcon className="w-5! h-5!" />
      </Button>
      <Button disabled={disabled} className="w-[50%]" variant={"secondary"}>
        <GoogleIcon className="w-5! h-5!" />
      </Button>
    </div>
  );
};

export default WithProviders;
