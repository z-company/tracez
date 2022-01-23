import { Box, Center, Flex, HStack, VStack } from "@chakra-ui/react";
import Sidebar from "components/sidebar/Sidebar";
import AppLayout from "components/Layout";
import { useSession } from "next-auth/react";
import Router from "next/router";

export default function Layout({children}: React.PropsWithChildren<{}>) {
  const session = useSession();
  if (session.status==="unauthenticated")
    Router.push("/");
  return <AppLayout title="Dashboard">
    <HStack h="100vh">
      <Sidebar />
      <Box w="100%" h="100%" p="5" overflowY={"scroll"}>
        {children}
      </Box>
    </HStack>
  </AppLayout>;
}