import { ChakraProvider, theme } from "@chakra-ui/react";
import { SessionProvider } from "next-auth/react";
import { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return <SessionProvider>
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  </SessionProvider>;
}