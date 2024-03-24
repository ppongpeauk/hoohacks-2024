// CSS imports
import "@/styles/globals.css";
import "@mantine/core/styles.css";

// Types
import type { AppProps } from "next/app";
import type { ReactElement, ReactNode } from "react";
import type { NextPage } from "next";

// Mantine UI
import { createTheme, MantineProvider } from "@mantine/core";
import dynamic from "next/dynamic";

// Components
import Head from "next/head";
import { Notifications } from "@mantine/notifications";
import { ModalsProvider } from "@mantine/modals";
import PageLoadingBar from "@/components/PageLoadingBar";
import { Spline_Sans_Mono } from "next/font/google";
import AuthProvider from "@/contexts/AuthContext";
import CanvasProvider from "@/contexts/CanvasContext";
const font = Spline_Sans_Mono({ subsets: ["latin"] });

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const theme = createTheme({
  fontFamily: font.style.fontFamily,
});

function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1 viewport-fit=cover user-scalable=no"
        />
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/images/icons/icon-128x128.png" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="msapplication-starturl" content="/" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      </Head>
      <MantineProvider
        theme={theme}
        withCssVariables
        classNamesPrefix="eve"
        forceColorScheme="light">
        <AuthProvider>
          <CanvasProvider>
            <ModalsProvider>
              <Notifications position="bottom-left" />
              <PageLoadingBar />
              {getLayout(<Component {...pageProps} />)}
            </ModalsProvider>
          </CanvasProvider>
        </AuthProvider>
      </MantineProvider>
    </>
  );
}

export default dynamic(() => Promise.resolve(App), {
  ssr: false,
});
