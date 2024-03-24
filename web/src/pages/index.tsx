import { useEffect, useRef } from "react";
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
import { IconBrandTwitter, IconBrandTwitterFilled } from "@tabler/icons-react";
import { useRouter } from "next/router";

// Define the Line class outside the useEffect hook
class Line {
  x: number;
  y: number;
  length: number;
  velocity: number;
  color: string;
  ctx: CanvasRenderingContext2D;

  constructor(
    x: number,
    y: number,
    length: number,
    velocity: number,
    color: string,
    ctx: CanvasRenderingContext2D
  ) {
    this.x = x;
    this.y = y;
    this.length = length;
    this.velocity = velocity;
    this.color = color;
    this.ctx = ctx;
  }

  draw() {
    this.ctx.beginPath();
    this.ctx.moveTo(this.x, this.y);
    this.ctx.lineTo(this.x, this.y + this.length);
    this.ctx.strokeStyle = this.color;
    this.ctx.lineWidth = 2;
    this.ctx.lineCap = "round";
    this.ctx.stroke();
  }

  update() {
    this.y += this.velocity;
    if (this.y > this.ctx.canvas.height) {
      this.y = -this.length;
      this.x = Math.random() * this.ctx.canvas.width;
    }
    this.draw();
  }
}

export default function HomeWithLines() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { push } = useRouter();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Explicitly type the 'lines' variable as an array of Line instances
    let lines: Line[] = [];
    const colors = ["#FF0000", "#FFC300", "#0300FF"]; // Updated colors

    const init = () => {
      lines = []; // Re-initialize to clear the lines array
      for (let i = 0; i < 100; i++) {
        const length = Math.random() * 50 + 10;
        const x = Math.random() * canvas.width;
        const y = Math.random() * -canvas.height;
        const velocity = Math.random() * 2 + 1;
        const color = colors[Math.floor(Math.random() * colors.length)];

        lines.push(new Line(x, y, length, velocity, color, ctx));
      }
    };

    const animate = () => {
      requestAnimationFrame(animate);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      lines.forEach((line) => line.update());
    };

    init();
    animate();
  }, []);

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
        push("/canvas");
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
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          minWidth: "100%",
          minHeight: "100%",
          width: "auto",
          height: "auto",
          zIndex: -1,
          objectFit: "cover",
        }}
      />
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
            <Button
              color="dark"
              onClick={providerPopup}
              leftSection={<IconBrandTwitterFilled size={16} />}>
              Log in with Twitter
            </Button>
          </Group>
        </Stack>
      </Flex>
    </Container>
  );
}
