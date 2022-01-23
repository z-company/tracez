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
  Td,
  useColorMode
} from "@chakra-ui/react";
import { Stats } from "@prisma/client";
import { useStats, useTraces } from "client/client";
import Layout from "components/dashboard/layout";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useEffect, useMemo } from "react";
import { seedDate, unitOrder } from "store/units";
import { nTon } from "utils/utils";
const ReactApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

function StatsOf({stats, unit}: {stats: Stats[], unit: number}) {
  const {colorMode} = useColorMode();

  const filtered = useMemo(() => stats
    .filter(s => nTon(s.unit) === unit)
    .sort((a, b) => nTon(b.bucket) - nTon(a.bucket)), [stats, unit]);

  const timeSeries = useMemo(() => filtered
    .map(s => [(nTon(s.bucket)*unit + seedDate), s.hits] as [number, number]),
  [filtered, unit]);

  return <VStack>
    <ReactApexChart height={350} width={600} options={{
      theme: {
        mode: colorMode
      },
      xaxis: {
        type: "datetime"
      }
    }} series={[{
      name: "Occurences",
      data: timeSeries
    }]}/>
    <Table>
      <Thead>
        <Tr>
          <Th>From</Th>
          <Th>To</Th>
          <Th>Occurrences</Th>
        </Tr>
      </Thead>
      <Tbody>
        {
          filtered.map(s =><Tr key={nTon(s.bucket)}>
            <Td>
              {new Date(nTon(s.bucket)*unit + seedDate).toLocaleString()}
            </Td>
            <Td>
              {new Date((nTon(s.bucket)+1)*unit + seedDate).toLocaleString()}</Td>
            <Td>{s.hits}</Td>
          </Tr>)
        }
      </Tbody>
    </Table>
  </VStack>;
}

export default function TraceDetail() {
  const {data} = useTraces();
  const router = useRouter();
  const id = router.query["id"] as string;
  const trace = data?.find(t => t.id === id);
  const [stats, fetchStats] = useStats(id);
  const statPanels = useMemo(() => stats?unitOrder.map(u => <TabPanel key={u}>
    <StatsOf stats={stats} unit={u}/>
  </TabPanel>)  : null, [stats]);

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
        <Heading>Trace &quot;{trace.event}&quot; in {trace.application} </Heading>
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
                {statPanels}
              </TabPanels>
            </Tabs>
          </Box> : null}
      </VStack>
    </Center>
  </Layout>;
}