import NextNProgress from "nextjs-progressbar";

export default function PageLoadingBar() {
  return (
    <NextNProgress
      color={"black"}
      startPosition={0}
      height={2}
      options={{
        showSpinner: false,
      }}
      showOnShallow={false}
    />
  );
}
