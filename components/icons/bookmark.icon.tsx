import React from "react";

const BookmarkIcon = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      display="inline-block"
      viewBox="-2 -2 24 24"
      strokeWidth="1.5"
      fill="none"
      data-sentry-element="Icon"
      data-sentry-source-file="navigation.mobile.tsx"
      {...props}
    >
      <path
        d="M7.70703 7.54175C9.19036 8.08341 10.807 8.08341 12.2904 7.54175"
        strokeLinecap="round"
        strokeLinejoin="round"
        stroke="currentColor"
      ></path>
      <path
        d="M14.0156 1.66675H5.98229C4.20729 1.66675 2.76562 3.11675 2.76562 4.88341V16.6251C2.76562 18.1251 3.84062 18.7584 5.15729 18.0334L9.22396 15.7751C9.65729 15.5334 10.3573 15.5334 10.7823 15.7751L14.849 18.0334C16.1656 18.7667 17.2406 18.1334 17.2406 16.6251V4.88341C17.2323 3.11675 15.7906 1.66675 14.0156 1.66675Z"
        strokeLinecap="round"
        strokeLinejoin="round"
        stroke="currentColor"
      ></path>
    </svg>
  );
};

export default BookmarkIcon;
