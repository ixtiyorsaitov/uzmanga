import React from "react";

const LogoutIcon = (props: React.SVGProps<SVGSVGElement>) => {
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
      <path
        d="M15 7.5L17.5 10M17.5 10L15 12.5M17.5 10H7.5"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
      <path
        d="M12.5 6.25V6.25C12.5 4.17893 10.8211 2.5 8.75 2.5H6.5C4.29086 2.5 2.5 4.29086 2.5 6.5V13.5C2.5 15.7091 4.29086 17.5 6.5 17.5H8.75C10.8211 17.5 12.5 15.8211 12.5 13.75V13.75"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
    </svg>
  );
};

export default LogoutIcon;
