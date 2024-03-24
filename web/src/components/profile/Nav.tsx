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
  Avatar,
  UnstyledButton,
  Menu,
  rem,
  Anchor,
  Select,
} from "@mantine/core";
import { useRef, useState } from "react";
import { IconBrandTwitterFilled, IconLogout } from "@tabler/icons-react";
import NextLink from "next/link";
import { getAuth, signInWithPopup, TwitterAuthProvider } from "firebase/auth";
import { provider } from "@/utils/firebase";

// Assets
import logo from "@/assets/images/logo_1.jpg";
import { useAuthContext } from "@/contexts/AuthContext";
import { User } from "@/types";
import { modals } from "@mantine/modals";
import { useRouter } from "next/router";
import { useCanvasContext } from "@/contexts/CanvasContext";

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
    zIndex: 1,
    opacity: 0.9,
    boxShadow:
      "rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px",
  },
};

export default function Nav() {
  const { currentUser, user: firebaseUser, signOut } = useAuthContext();
  const { cid, setCid } = useCanvasContext();
  const { push } = useRouter();

  return (
    <>
      <Stack flex={1} pos={"absolute"}>
        <Flex
          w={"calc(100vw - 48px)"}
          mx={24}
          mt={24}
          px={24}
          style={styles.container}>
          {/* <Image src={logo.src} alt="logo" width={100} height={50} /> */}
          <Anchor component={NextLink} href="/" style={{ color: "white" }}>
            <Title order={4} style={{ color: "white" }}>
              murality.
            </Title>
          </Anchor>
          {/* mural title */}
          <Text style={{ color: "white" }} ml={16}>
            Waleed Raza&apos;s canvas
          </Text>
          {/* login component */}
          <Group align="center">
            <Select
              onChange={(_value, option) => setCid(parseInt(option.value))}
              defaultValue={"-1"}
              data={[
                {
                  value: "-1",
                  label: "All Memories",
                },
                {
                  value: "1",
                  label: "HackFax — February 2024",
                },
                {
                  value: "2",
                  label: "Washington D.C. Trip — January 2024",
                },
              ]}
              allowDeselect={false}
              miw={320}
            />
            {!firebaseUser ? (
              <Button
                color="dark"
                onClick={() => {
                  const auth = getAuth();
                  signInWithPopup(auth, provider)
                    .then((result) => {
                      // This gives you a the Twitter OAuth 1.0 Access Token and Secret.
                      // You can use these server side with your app's credentials to access the Twitter API.
                      const credential =
                        TwitterAuthProvider.credentialFromResult(result);
                      const token = credential?.accessToken;
                      const secret = credential?.secret;

                      // The signed-in user info.
                      const user = result.user;
                      console.log(user);
                      // IdP data available using getAdditionalUserInfo(result)
                      // ...
                      push("/canvas");
                    })
                    .catch((error) => {
                      // Handle Errors here.
                      const errorCode = error.code;
                      const errorMessage = error.message;
                      // The email of the user's account used.
                      const email = error.customData.email;
                      // The AuthCredential type that was used.
                      const credential =
                        TwitterAuthProvider.credentialFromError(error);
                      // ...
                    });
                }}
                leftSection={<IconBrandTwitterFilled size={16} />}>
                Log in with Twitter
              </Button>
            ) : (
              <Menu zIndex={1000} width={320}>
                <Menu.Target>
                  <UnstyledButton>
                    <Avatar src={firebaseUser?.photoURL} size={40} />
                  </UnstyledButton>
                </Menu.Target>
                <Menu.Dropdown>
                  <Menu.Label>Actions</Menu.Label>
                  <Menu.Item
                    leftSection={
                      <IconLogout style={{ width: rem(14), height: rem(14) }} />
                    }
                    onClick={() => {
                      modals.openConfirmModal({
                        zIndex: 1000,
                        title: "Log out",
                        children: (
                          <Text size="sm">
                            Are you sure you want to log out?
                          </Text>
                        ),
                        labels: { confirm: "Log out", cancel: "Cancel" },
                        confirmProps: { color: "red" },
                        onCancel: () => {},
                        onConfirm: () => {
                          modals.closeAll();
                          signOut();
                        },
                      });
                    }}>
                    Log out
                  </Menu.Item>
                </Menu.Dropdown>
              </Menu>
            )}
          </Group>
        </Flex>
      </Stack>
      {/* <Box
        display={"flex"}
        pos={"fixed"}
        w={"50%"}
        style={{
          background: "black",
          bottom: 0,
          zIndex: 1000,
          left: "50%",
          transform: "translateX(-50%)",
        }}
        h={64}
      /> */}
    </>
  );
}
