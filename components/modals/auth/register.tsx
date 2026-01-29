import { Dispatch, SetStateAction } from "react";
import { AuthMethod } from "./content";
import WithProviders from "./with-providers";

const Register = ({}: { setMethod: Dispatch<SetStateAction<AuthMethod>> }) => {
  return (
    <>
      <h1 className="text-center font-semibold">{"Ro'yhatdan o'tish"}</h1>
      <WithProviders />
    </>
  );
};

export default Register;
