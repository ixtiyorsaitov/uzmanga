import React from "react";

const EyeIcon = (
  props: React.SVGProps<SVGSVGElement> & { disable?: boolean },
) => {
  const { disable, ...rest } = props;
  return !disable ? (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      display="inline-block"
      viewBox="0 0 20 20"
      strokeWidth="1.5"
      fill="none"
      stroke="currentColor"
      {...rest}
    >
      <path
        d="M13 10C13 11.6604 11.6604 13 10 13C8.33962 13 7 11.6604 7 10C7 8.33962 8.33962 7 10 7C11.6604 7 13 8.33962 13 10Z"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
      <path
        d="M10 17C13.45 17 16.63 14.872 18.67 11.2507C19.11 10.476 19.11 9.524 18.67 8.74934C16.63 5.128 13.45 3 10 3C6.54999 3 3.37 5.128 1.33 8.74934C0.89 9.524 0.89 10.476 1.33 11.2507C3.37 14.872 6.54999 17 10 17Z"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
    </svg>
  ) : (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      display="inline-block"
      viewBox="0 0 20 20"
      strokeWidth="1.5"
      fill="none"
      stroke="currentColor"
      {...rest}
    >
      <path
        d="M12.1073 7.89166L7.89063 12.1083C7.34896 11.5667 7.01562 10.825 7.01562 10C7.01562 8.35 8.34896 7.01666 9.99896 7.01666C10.824 7.01666 11.5656 7.35 12.1073 7.89166Z"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
      <path
        d="M14.8479 4.80834C13.3896 3.70834 11.7229 3.10834 9.99792 3.10834C7.05625 3.10834 4.31458 4.84167 2.40625 7.84167C1.65625 9.01667 1.65625 10.9917 2.40625 12.1667C3.06458 13.2 3.83125 14.0917 4.66458 14.8083"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
      <path
        d="M7.01562 16.275C7.96563 16.675 8.97396 16.8917 9.99896 16.8917C12.9406 16.8917 15.6823 15.1583 17.5906 12.1583C18.3406 10.9833 18.3406 9.00834 17.5906 7.83334C17.3156 7.4 17.0156 6.99167 16.7073 6.60834"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
      <path
        d="M12.9281 10.5833C12.7115 11.7583 11.7531 12.7167 10.5781 12.9333"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
      <path
        d="M7.88906 12.1083L1.66406 18.3333"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
      <path
        d="M18.3344 1.66667L12.1094 7.89167"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
    </svg>
  );
};

export default EyeIcon;
