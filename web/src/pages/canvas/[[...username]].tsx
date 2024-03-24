import Nav from "@/components/profile/Nav";
import { Affix, Box, Button, Container, Portal } from "@mantine/core";
import dynamic from "next/dynamic";
import { GetServerSideProps } from "next/types";
import { User } from "@/types";
import { useEffect, useState } from "react";
import { useAuthContext } from "@/contexts/AuthContext";
import { useRouter } from "next/router";

const Canvas = dynamic(() => import("@/components/profile/canvas"), {
  ssr: false,
});

export const getServerSideProps = async ({ query }: any) => {
  if (!query.username) {
    return { props: { user: null } };
  }
  const username = query.username as string;
  let res = await fetch(
    `http://localhost:8080/api/pictures/of/${username[0]}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  if (!res.ok) {
    return { notFound: true };
  }
  res = await res.json();
  return { props: { res } };
};
interface Response {
  pid: number;
  fileLink: string;
  uid: number;
  cid: number;
  x: string;
  y: string;
  width: string;
  height: string;
}

export default function Profile({ res }: { res: Response[] }) {
  const { user: firebaseUser, currentUser, isAuthLoaded } = useAuthContext();
  const [focusedUser, setFocusedUser] = useState<Response[] | null>(res);
  const {
    push,
    query: { username },
  } = useRouter() as any;

  useEffect(() => {
    async function run() {
      if (!firebaseUser && isAuthLoaded) {
        push("/");
        return;
      }

      // Should only occur when user is self
      // if (!res && firebaseUser) {
      //   const token = (await firebaseUser?.getIdToken()) as string;
      //   const res = await fetch(
      //     `http://localhost:8080/api/pictures/of/${firebaseUser?.id}`,
      //     {
      //       headers: {
      //         Authorization: `Bearer ${token}`,
      //         "Content-Type": "application/json",
      //       },
      //     }
      //   );
      //   const data = await res.json();
      //   console.log(data);
      //   setFocusedUser(data);
      // }
    }
    run();
  }, [res, firebaseUser, isAuthLoaded]);

  return (
    <Box>
      <Nav />
      <Canvas data={focusedUser} id={firebaseUser?.id} />
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
