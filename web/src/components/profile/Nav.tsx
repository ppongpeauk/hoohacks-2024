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
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
  },
};

export default function Nav() {
  return (
    <>
      <Stack mt={32} px={32} gap={8}>
        <Flex px={8} style={styles.container}>
          {/* <Image src={logo.src} alt="logo" width={100} height={50} /> */}
          <Title order={4} style={{ color: "white" }} ml={16}>
            murality.
          </Title>
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
        <Flex px={8} style={styles.container} w={"fit-content"} h={36}>
          <Text c={"white"} ml={16}>
            pete&apos;s mural
          </Text>
        </Flex>
      </Stack>
    </>
  );
}
