import { getApps, initializeApp } from "firebase/app";
import { getAuth, TwitterAuthProvider } from "firebase/auth";

export const provider = new TwitterAuthProvider();

const firebaseConfig = {
  apiKey: "AIzaSyCEgX_SlmRtPHEp5NeMwPm6lYsKW3WOlu0",
  authDomain: "murality-d73ef.firebaseapp.com",
  projectId: "murality-d73ef",
  storageBucket: "murality-d73ef.appspot.com",
  messagingSenderId: "310808196133",
  appId: "1:310808196133:web:92efe109c67d94687a7bcc",
  measurementId: "G-5GJWJ9L1N0",
};

const app = () => {
  const apps = getApps();
  if (apps.length < 1) initializeApp(firebaseConfig);
  return apps[0];
};
const auth = getAuth(app());

export const initFirebase = () => {
  return app();
};

export { auth };
export default app;
