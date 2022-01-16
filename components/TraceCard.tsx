import { Code, Text, VStack } from "@chakra-ui/react";
import { TraceResponse } from "pages/api/trace";
import React from "react";
import { Day, Hour, Month } from "store/units";

export default function TraceCard({trace}: React.PropsWithoutRef<{trace: TraceResponse}>) {
  console.log(trace, Hour, Day, Month);
  return <VStack maxWidth={"300px"} borderColor="grey.400" borderWidth="1px" p={2} borderRadius={5} m={5}>
    <Text fontSize="xl">{trace.event}, {trace.application}</Text>
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