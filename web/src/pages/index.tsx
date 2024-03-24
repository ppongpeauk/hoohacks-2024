import { getAuth, signInWithPopup, TwitterAuthProvider } from "firebase/auth";
import { provider } from "@/utils/firebase";
import { Inter } from "next/font/google";
import {
  Box,
  Center,
  Container,
  Flex,
  Title,
  Text,
  Stack,
  Button,
  Group,
  Affix,
  Image,
} from "@mantine/core";
import { useCallback } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const providerPopup = useCallback(() => {
    const auth = getAuth();
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a the Twitter OAuth 1.0 Access Token and Secret.
        // You can use these server side with your app's credentials to access the Twitter API.
        const credential = TwitterAuthProvider.credentialFromResult(result);
        const token = credential?.accessToken;
        const secret = credential?.secret;

        // The signed-in user info.
        const user = result.user;
        console.log(user);
        // IdP data available using getAdditionalUserInfo(result)
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = TwitterAuthProvider.credentialFromError(error);
        // ...
      });
  }, []);

  return (
    <Container h={"100dvh"}>
      <Flex align={"center"} justify={"center"} h={"100%"}>
        <Stack>
          <Stack gap={0}>
            <Title order={1}>murality.</Title>
            <Text>muh-RAL-i-tee</Text>
          </Stack>
          <Text>
            An infinite canvas for you and your friends to create memories.
          </Text>
          <Group>
            <Button color="dark" onClick={providerPopup}>
              Log in with Twitter
            </Button>
          </Group>
        </Stack>
      </Flex>
    </Container>
  );
}
