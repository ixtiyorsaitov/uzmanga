import { useLoginWithGoogle } from "@/components/hooks/api/useAuth";
import { GoogleIcon, TelegramIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { IAuthProviders } from "@/types";
import { appToast } from "@/lib/app-toast";
import { usePathname } from "next/navigation";

const WithProviders = ({ disabled }: { disabled: boolean }) => {
  const withGoogle = useLoginWithGoogle();
  const path = usePathname();

  const onSubmit = (provider: IAuthProviders) => {
    if (provider === "google") {
      localStorage.setItem("redirect_to", path);
      withGoogle.mutate(undefined, {
        onSuccess: (response) => {
          if (response.data?.url) {
            window.location.href = response.data?.url;
          } else {
            appToast.error("Nimadir xato ketdi");
          }
        },
      });
    } else if (provider === "telegram") {
      appToast.info("Bu xizmat hozircha ishlamayapti");
    }
  };
  return (
    <div className="flex justify-center gap-2">
      <Button
        onClick={() => onSubmit("telegram")}
        disabled={disabled}
        className="w-[50%]"
        variant={"secondary"}
      >
        <TelegramIcon className="w-5! h-5!" />
      </Button>
      <Button
        onClick={() => onSubmit("google")}
        disabled={disabled}
        className="w-[50%]"
        variant={"secondary"}
      >
        <GoogleIcon className="w-5! h-5!" />
      </Button>
    </div>
  );
};

export default WithProviders;
