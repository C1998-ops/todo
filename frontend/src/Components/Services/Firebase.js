import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC720TV9JoBRjbPvujyJTPHLantrSZgVPw",
  authDomain: "todo-manager-9ac0e.firebaseapp.com",
  projectId: "todo-manager-9ac0e",
  storageBucket: "todo-manager-9ac0e.appspot.com",
  messagingSenderId: "910801054716",
  appId: "1:910801054716:web:a709ba0f4d324477ac6079"
};
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const provider = new GoogleAuthProvider();
