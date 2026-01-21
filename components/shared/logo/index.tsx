import React from "react";
import LogoVec from "@/public/vectors/logo-vec.webp";
import Image from "next/image";

const Logo = () => {
  return (
    <div className="dark:text-foreground relative text-black">
      <LogoSvg />
      <Image
        className="absolute top-0 left-0 z-50 -translate-x-2 -translate-y-1"
        src={LogoVec}
        alt="logo"
      />
    </div>
  );
};

export default Logo;

function LogoSvg() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="36"
      height="36"
      display="inline-block"
      viewBox="0 0 496 512"
      strokeWidth="1.5"
      data-sentry-element="IconRenderer"
      data-sentry-source-file="brand.tsx"
    >
      <path
        fill="currentColor"
        d="M248 8C111.03 8 0 119.03 0 256s111.03 248 248 248 248-111.03 248-248S384.97 8 248 8zm0 376c-17.67 0-32-14.33-32-32s14.33-32 32-32 32 14.33 32 32-14.33 32-32 32zm0-128c-53.02 0-96 42.98-96 96s42.98 96 96 96c-106.04 0-192-85.96-192-192S141.96 64 248 64c53.02 0 96 42.98 96 96s-42.98 96-96 96zm0-128c-17.67 0-32 14.33-32 32s14.33 32 32 32 32-14.33 32-32-14.33-32-32-32z"
      ></path>
    </svg>
  );
}
