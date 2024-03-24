import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

// firebase
import {
  UserCredential,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "@/utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/router";
import { User } from "@/types";
import { notifications } from "@mantine/notifications";

interface AuthContext {
  user: any;
  currentUser?: User;
  auth: any;
  isAuthLoaded: boolean;
  refreshCurrentUser: () => Promise<void>;
  signOut: () => void;
}

export const AuthContext = createContext<AuthContext>({} as AuthContext);
export function useAuthContext() {
  return useContext(AuthContext) as unknown as AuthContext;
}

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, loading, error] = useAuthState(auth);
  const [isAuthLoaded, setIsAuthLoaded] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<User>();
  const { push } = useRouter();

  async function waitForAuthInit() {
    let unsubscribe = null;
    await new Promise<void>((resolve) => {
      unsubscribe = auth.onAuthStateChanged((_) => resolve());
    });
    (await unsubscribe!)();
  }

  const refreshCurrentUser = useCallback(async () => {
    if (!isAuthLoaded || !user) return;
    const token = await user.getIdToken();
    const response = await fetch("/api/v1/me", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    if (!data) {
      notifications.show({
        message:
          "There was a problem fetching your user data. Please try again.",
        color: "red",
      });
      return;
    }
    setCurrentUser(data.user);
  }, [user, isAuthLoaded]);

  useEffect(() => {
    refreshCurrentUser();
  }, [user, refreshCurrentUser]);

  useEffect(() => {
    setIsAuthLoaded(false);
    async function checkUser() {
      await waitForAuthInit().then(async () => {
        setIsAuthLoaded(true);
      });
    }
    checkUser();
  }, [user]);

  return (
    <AuthContext.Provider
      value={{
        auth,
        user,
        currentUser,
        isAuthLoaded,
        refreshCurrentUser,
        signOut: () => {
          signOut(auth)
            .then(() => {
              push("/");
            })
            .catch((error) => {
              console.error("Error signing out: ", error);
            });
        },
      }}>
      {children}
    </AuthContext.Provider>
  );
}
