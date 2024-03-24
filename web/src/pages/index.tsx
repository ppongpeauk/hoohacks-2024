import { useEffect, useRef } from 'react';
import { Container, Flex, Title, Text, Stack, Button } from "@mantine/core";
import { IconBrandTwitterFilled } from "@tabler/icons-react";

// Define the Line class outside the useEffect hook
class Line {
  x: number;
  y: number;
  length: number;
  velocity: number;
  color: string;
  ctx: CanvasRenderingContext2D;

  constructor(x: number, y: number, length: number, velocity: number, color: string, ctx: CanvasRenderingContext2D) {
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
    this.ctx.lineCap = 'round';
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

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Explicitly type the 'lines' variable as an array of Line instances
    let lines: Line[] = [];
    const colors = ['#FF0000', '#FFC300', '#0300FF']; // Updated colors

    const init = () => {
      lines = []; // Re-initialize to clear the lines array
      for (let i = 0; i < 100; i++) {
        const length = Math.random() * 50 + 10;
        const x = Math.random() * canvas.width;
        const y = Math.random() * (-canvas.height);
        const velocity = Math.random() * 2 + 1;
        const color = colors[Math.floor(Math.random() * colors.length)];

        lines.push(new Line(x, y, length, velocity, color, ctx));
      }
    };

    const animate = () => {
      requestAnimationFrame(animate);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      lines.forEach(line => line.update());
    };

    init();
    animate();
  }, []);

  return (
    <Container style={{ position: 'relative', width: '100%', height: '100vh', overflow: 'hidden' }}>
      <canvas ref={canvasRef} style={{
        position: 'absolute',
        top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        minWidth: '100%',
        minHeight: '100%',
        width: 'auto',
        height: 'auto',
        zIndex: -1,
        objectFit: 'cover'
      }} />
      <Flex align="center" justify="center" style={{ height: '100%', position: 'relative', zIndex: 1 }}>
        <Stack spacing="md">
          <Title order={1}>Murality</Title>
          <Text>Create. Connect. Inspire. </Text>
          <Button leftSection={<IconBrandTwitterFilled size={16} />} color="dark">
            Sign Up with Twitter
          </Button>
        </Stack>
      </Flex>
    </Container>
  );
}
