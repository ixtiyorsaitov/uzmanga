import React from "react";

const ArrowTopRightIcon = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={20}
      height={20}
      display="inline-block"
      viewBox="0 0 18 18"
      strokeWidth={1.5}
      stroke="currentColor"
      fill="none"
      {...props}
    >
      <path
        d="M7 4.1333L14.1536 4.1333L14.1536 11.2869"
        strokeMiterlimit={10}
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
      <path
        d="M4.13672 14.1504L14.0539 4.23322"
        strokeMiterlimit={10}
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
    </svg>
  );
};

export default ArrowTopRightIcon;
