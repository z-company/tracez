import { Code, Text, VStack, Link as ChackraLink } from "@chakra-ui/react";
import Link from "next/link";
import { TraceResponse } from "pages/api/trace";
import React from "react";
import { Day, Hour, Month } from "store/units";

export default function TraceCard({trace}: React.PropsWithoutRef<{trace: TraceResponse}>) {
  console.log(trace, Hour, Day, Month);
  return <VStack maxWidth={"300px"} borderColor="grey.400" borderWidth="1px" p={2} borderRadius={5} m={5}>
    
    <Text fontSize="xl">
      <Link href={`/dashboard/trace/${trace.id}`} passHref>
        <ChackraLink>
          {trace.event}, {trace.application}
        </ChackraLink>
      </Link>
    </Text>
    
    <Code whiteSpace="pre" overflow="auto" maxWidth="100%">{trace.trace}</Code>
    {trace.Stats.map(stat => {
      console.log(stat, Hour, Day, Month);
      switch (parseInt(stat.unit+"")) {
      case Hour:
        return <Text>This Hour: {stat.hits}</Text>;
      case Day:
        return <Text>Today: {stat.hits}</Text>;
      case Month:
        return <Text>This Month: {stat.hits}</Text>;
      }
    })}
  </VStack>;
}