import { Box, Center, Flex, Text } from "@chakra-ui/react";
import { useFetchTraces } from "client/client";
import Layout from "components/dashboard/layout";
import TraceCard from "components/TraceCard";
import { useEffect } from "react";

export default function Dashboard() {
  const [traces, fetchTraces] = useFetchTraces();
  useEffect(() => {
    (async () => {
      await fetchTraces();
    })();
  }, []);
  return <Layout>
    { !traces || traces.length === 0
      ? <Center height="100vh"><Text>No traces seen yet</Text></Center>
      : <Box><Flex maxW="100%" flexWrap="wrap">
        {traces.map(t => <TraceCard key={t.id} trace={t} />)}
      </Flex></Box>
    }
  </Layout>;
}