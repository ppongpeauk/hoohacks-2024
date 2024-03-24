// Components
import {
  Box,
  Button,
  Flex,
  Group,
  Image,
  Stack,
  Title,
  Text,
} from "@mantine/core";
import { useRef } from "react";

// Assets
import logo from "@/assets/images/logo_1.jpg";

const styles: { [key: string]: React.CSSProperties } = {
  outer: {
    position: "fixed",
  },
  container: {
    position: "fixed",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    minWidth: 480,
    height: "64px",
    backgroundColor: "#000",
    color: "#fff",
    borderRadius: 8,
    zIndex: 1000,
    opacity: 0.9,
    boxShadow:
      "rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px",
  },
};

export default function Nav() {
  return (
    <Flex flex={1} pos={"absolute"}>
      <Flex
        w={"calc(100vw - 48px)"}
        mx={24}
        mt={24}
        px={8}
        style={styles.container}>
        {/* <Image src={logo.src} alt="logo" width={100} height={50} /> */}
        <Title order={4} style={{ color: "white" }} ml={16}>
          murality.
        </Title>
        {/* mural title */}
        <Text style={{ color: "white" }} ml={16}>
          Pete Pongpeauk&apos;s mural
        </Text>
        {/* login component */}
        <Flex align="center">
          <Button variant="subtle" color="white">
            Login
          </Button>
          <Button variant="subtle" color="white">
            Sign up
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
}
