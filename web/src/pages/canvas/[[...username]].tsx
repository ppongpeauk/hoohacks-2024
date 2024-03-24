import Nav from "@/components/profile/Nav";
import { Box, Container } from "@mantine/core";
import dynamic from "next/dynamic";
import { GetServerSideProps } from "next/types";
import { User } from "@/types";

const Canvas = dynamic(() => import("@/components/profile/canvas"), {
  ssr: false,
});

export const getServerSideProps = (async ({ query }) => {
  const username = query.username as string;
  console.log(username);
  const res = await fetch(`http://localhost:3000/api/v1/users/${username}`);
  const user: User = await res.json();
  if (!user) {
    return { notFound: true };
  }
  return { props: { user } };
}) satisfies GetServerSideProps<{ user: User }>;

export default function Profile({ user }: { user: User }) {
  return (
    <Box>
      <Nav user={user} />
      <Canvas />
    </Box>
  );
}
