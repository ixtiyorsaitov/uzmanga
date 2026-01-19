import React from "react";

const MenuIcon = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      display="inline-block"
      viewBox="0 0 18 18"
      strokeWidth="1.5"
      stroke="currentColor"
      fill="none"
      {...props}
    >
      <path
        d="M2.69922 3.59961H16.1992"
        strokeWidth="1.75"
        strokeLinecap="round"
      ></path>
      <path
        d="M2.69922 9H16.1992"
        strokeWidth="1.75"
        strokeLinecap="round"
      ></path>
      <path
        d="M2.69922 14.4004H16.1992"
        strokeWidth="1.75"
        strokeLinecap="round"
      ></path>
    </svg>
  );
};

export default MenuIcon;
