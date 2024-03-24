import Nav from "@/components/profile/Nav";
import { Box, Container } from "@mantine/core";
import dynamic from "next/dynamic";

const Canvas = dynamic(() => import("@/components/profile/canvas"), {
  ssr: false,
});

export default function Profile({ username }: { username: string }) {
  return (
    <Container size={"xl"}>
      <Nav />
      <Canvas />
    </Container>
  );
}
