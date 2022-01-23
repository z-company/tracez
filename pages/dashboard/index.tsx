import { Box, Center, Flex, Text } from "@chakra-ui/react";
import { useTraces } from "client/client";
import Layout from "components/dashboard/layout";
import TraceCard from "components/TraceCard";

export default function Dashboard() {
  const { data } = useTraces();
  return <Layout>
    { !data || data.length === 0
      ? <Center height="100vh"><Text>No traces seen yet</Text></Center>
      : <Box><Flex maxW="100%" flexWrap="wrap">
        {data.map(t => <TraceCard key={t.id} trace={t} />)}
      </Flex></Box>
    }
  </Layout>;
}