import forgotPassword from "./forgot.password";
import login from "./login";
import loginWithGoogle from "./login.with.google";

const AuthService = {
  login,
  loginWithGoogle,
  forgotPassword,
};

export default AuthService;
