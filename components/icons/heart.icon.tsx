import React from "react";

const HeartIcon = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 20 20"
      strokeWidth="1.5"
      fill="none"
      stroke="currentColor"
      {...props}
    >
      <path
        d="M10 16.6663C7.825 15.933 2.5 12.708 2.5 7.49967C2.5 5.19967 4.36667 3.33301 6.66667 3.33301C8.03333 3.33301 9.24167 3.99134 10 4.99967C10.7583 3.98301 11.975 3.33301 13.3333 3.33301C15.6333 3.33301 17.5 5.19134 17.5 7.49967C17.5 12.7163 12.175 15.933 10 16.6663Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
    </svg>
  );
};

export default HeartIcon;
