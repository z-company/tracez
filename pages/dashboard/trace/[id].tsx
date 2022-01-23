import {
  Center,
  Heading,
  Code,
  VStack,
  Box,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td
} from "@chakra-ui/react";
import { Stats } from "@prisma/client";
import { useStats, useTraces } from "client/client";
import Layout from "components/dashboard/layout";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { QuarterMinute, seedDate, unitOrder } from "store/units";
import { nTon } from "utils/utils";

function StatsOf({stats, unit}: {stats: Stats[], unit: number}) {
  return <Table>
    <Thead>
      <Tr>
        <Th>Date</Th>
        <Th>Occurrences</Th>
      </Tr>
    </Thead>
    <Tbody>
      {
        stats
          .filter(s => nTon(s.unit) === unit)
          .sort((a, b) => nTon(b.bucket) - nTon(a.bucket))
          .map(s =><Tr key={nTon(s.bucket)}>
            <Td>
              {new Date(nTon(s.bucket)*unit + seedDate).toLocaleString()}
              {" - "}
              {new Date((nTon(s.bucket)+1)*unit + seedDate).toLocaleString()}</Td>
            <Td>{s.hits}</Td>
          </Tr>)
      }
    </Tbody>
  </Table>;
}

export default function TraceDetail() {
  const {data} = useTraces();
  const router = useRouter();
  const id = router.query["id"] as string;
  const trace = data?.find(t => t.id === id);
  const [stats, fetchStats] = useStats(id);

  useEffect(() => {
    fetchStats();
  }, [id]);

  if (!trace)
    return <Layout>
      <Center>
        <Heading>Trace doesnt exit</Heading>
      </Center>
    </Layout>;
  return <Layout>
    <Center>
      <VStack maxW="100%">
        <Heading>Trace for &quot;{trace.event}&quot; in {trace.application} </Heading>
        <Code whiteSpace="pre" overflow="auto" maxW="100%">
          {trace.trace}
        </Code>
        {stats?
          <Box maxW="100%" w="100%">
            <Tabs>
              <TabList>
                <Tab>Quarter Minute</Tab>
                <Tab>Minute</Tab>
                <Tab>Hour</Tab>
                <Tab>Day</Tab>
                <Tab>Month</Tab>
                <Tab>Year</Tab>
              </TabList>

              <TabPanels>
                {unitOrder.map(u => <TabPanel key={u}>
                  <StatsOf stats={stats} unit={u}/>
                </TabPanel>
                )}
              </TabPanels>
            </Tabs>
          </Box> : null}
      </VStack>
    </Center>
  </Layout>;
}