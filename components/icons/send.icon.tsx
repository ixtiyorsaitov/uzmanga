import React from "react";

export default function SendIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      display="inline-block"
      viewBox="0 0 20 20"
      strokeWidth="1.5"
      fill="none"
      stroke="white"
      data-sentry-element="Send"
      data-sentry-source-file="activity-form.tsx"
      {...props}
    >
      <path
        d="M5.66641 6.7668L12.7414 4.40846C15.9164 3.35013 17.6414 5.08346 16.5914 8.25846L14.2331 15.3335C12.6497 20.0918 10.0497 20.0918 8.46641 15.3335L7.76641 13.2335L5.66641 12.5335C0.908073 10.9501 0.908073 8.35846 5.66641 6.7668Z"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
      <path
        d="M7.9248 12.875L10.9081 9.8833"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
    </svg>
  );
}
