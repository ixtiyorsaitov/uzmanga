import React from "react";

const ChatIcon = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      display="inline-block"
      viewBox="0 0 20 20"
      strokeWidth="1.5"
      fill="none"
      stroke="currentColor"
      {...props}
    >
      <g clipPath="url(#clip0_9027_87959)">
        <path
          d="M17.3997 11.2752C16.8914 14.3919 14.5664 16.7752 11.4747 17.3585C9.77474 17.6835 8.1664 17.4252 6.77473 16.7752C6.5414 16.6586 6.17471 16.6169 5.92471 16.6669C5.40805 16.7919 4.52471 17.0085 3.78304 17.1752C3.06637 17.3502 2.62472 16.9086 2.80805 16.2002L3.31638 14.0669C3.37471 13.8169 3.31637 13.4419 3.20804 13.2086C2.57471 11.8836 2.3247 10.3419 2.58304 8.72522C3.08304 5.62522 5.59974 3.10854 8.70807 2.59188C13.8414 1.76688 18.2164 6.13355 17.3747 11.2669L17.3997 11.2752Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></path>
        <path
          d="M8.87504 10H7.375"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></path>
        <path
          d="M12.625 10H11.125"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></path>
      </g>
      <defs>
        <clipPath id="clip0_9027_87959">
          <rect width="20" height="20" fill="currentColor"></rect>
        </clipPath>
      </defs>
    </svg>
  );
};

export default ChatIcon;
