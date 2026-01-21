import React from "react";

const EditIcon = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      display="inline-block"
      viewBox="0 0 20 20"
      strokeWidth="1.5"
      fill="none"
      stroke="currentColor"
      {...props}
    >
      <path d="M11.9887 4.85928L15.1408 8.01137M2.5 17.5L5.56065 16.9174C6.2096 16.7938 6.80641 16.478 7.27353 16.0109L16.8198 6.46461C17.7267 5.55765 17.7267 4.08718 16.8198 3.18022C15.9128 2.27326 14.4423 2.27326 13.5354 3.18022L3.98913 12.7265C3.52201 13.1936 3.20617 13.7904 3.08263 14.4394L2.5 17.5Z"></path>
    </svg>
  );
};

export default EditIcon;
