import { PremiumIcon } from "@/components/icons";
import { buttonVariants } from "@/components/ui/button";
import Image from "next/image";
import SubscribeMedal from "@/public/vectors/subscribeMedal.webp";
import SubscribeStar from "@/public/vectors/subscribeStar.webp";
import SubscribeShootingStar from "@/public/vectors/subscribeShootingStar.webp";
import Link from "next/link";
import { cn } from "@/lib/utils";

const SubscribeButton = () => {
  return (
    <Link
      href={"#"}
      className={cn(
        buttonVariants(),
        "w-full font-bold relative overflow-hidden rounded-lg text-md justify-start h-10.5 px-4! bg-[linear-gradient(105.59deg,rgba(63,140,255,0.9)_0%,rgba(0,68,238,0.9)_100%)]!",
      )}
    >
      <Image
        src={SubscribeMedal}
        alt="subscribe"
        className="absolute -top-5 left-20 translate-y-1/3 rotate-30 opacity-[0.2] dark:opacity-[0.1]"
        width={93}
        height={93}
      />
      <Image
        src={SubscribeStar}
        alt="subscribe"
        className="absolute -top-full left-1/2 translate-x-1/2 translate-y-1/4 opacity-[0.2] dark:opacity-[0.03]"
        width={60}
        height={60}
      />
      <Image
        src={SubscribeStar}
        alt="subscribe"
        className="absolute right-0 bottom-0 translate-x-1/3 translate-y-1/3 opacity-[0.2] dark:opacity-[0.2]"
        width={60}
        height={60}
      />
      <Image
        src={SubscribeShootingStar}
        alt="subscribe"
        className="absolute top-0 bottom-0 -translate-x-1/3 -translate-y-1/3 rotate-90 opacity-[0.2] dark:opacity-[0.1]"
        width={93}
        height={93}
      />
      <div className="size-full absolute z-10 top-0 left-0 px-4! flex items-center justify-start">
        Premiumni faollashtirish
        <PremiumIcon className="size-5" />
      </div>
    </Link>
  );
};

export default SubscribeButton;
