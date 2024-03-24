import Nav from "@/components/profile/Nav";
import { Affix, Box, Button, Container, Portal } from "@mantine/core";
import dynamic from "next/dynamic";
import { GetServerSideProps } from "next/types";
import { User } from "@/types";
import { useEffect, useState } from "react";
import { useAuthContext } from "@/contexts/AuthContext";

const Canvas = dynamic(() => import("@/components/profile/canvas"), {
  ssr: false,
});

export const getServerSideProps = (async ({ query }) => {
  if (!query.username) {
    return { props: { user: null } };
  }
  const username = query.username as string;
  const res = await fetch(`http://localhost:3000/api/v1/users/${username[0]}`);
  if (res.status === 404) {
    return { notFound: true };
  }
  const user: User = await res.json();
  return { props: { user } };
}) satisfies GetServerSideProps<{ user: User | null }>;

export default function Profile({ user }: { user: User | null }) {
  const { user: firebaseUser, currentUser } = useAuthContext();
  const [focusedUser, setFocusedUser] = useState<User | null>(user);

  useEffect(() => {
    if (!firebaseUser) return;
    async function run() {
      // Should only occur when user is self
      if (!user) {
        const token = (await firebaseUser?.getIdToken()) as string;
        const res = await fetch("/api/v1/me", {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        const data = await res.json();
        console.log(data);
        setFocusedUser(data);
      }
    }
    run();
  }, [user, firebaseUser]);

  return (
    <Box>
      <Nav user={focusedUser} />
      <Canvas user={focusedUser} />
      <Affix position={{ bottom: 16, right: 16 }}>
        <Container>
          <Box
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: 10,
            }}>
            <Button
              component="label"
              htmlFor="file-upload"
              color="black"
              style={{ cursor: "pointer" }}>
              upload a memory
            </Button>
          </Box>
        </Container>
      </Affix>
    </Box>
  );
}
