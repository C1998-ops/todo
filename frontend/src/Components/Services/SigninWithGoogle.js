import {
  signInWithPopup,
  // EmailAuthProvider
} from "firebase/auth";
import { auth, provider } from "./Firebase";

const SignInWithGoogle = () => {
  return signInWithPopup(auth, provider)
    .then((response) => {
      const data = response.user;
      return data;
    })
    .catch((error) => {
      console.log("error while signin google account", error.message);
    });
};
export default SignInWithGoogle;
