import { Box, Center, Flex, HStack, VStack } from "@chakra-ui/react";
import Sidebar from "components/sidebar/Sidebar";

export default function Layout({children}: React.PropsWithChildren<{}>) {
  return <HStack h="100vh">
    <Sidebar />
    <Box w="100%" h="100%" p="5" overflowY={"scroll"}>
      {children}
    </Box>
  </HStack>;
}