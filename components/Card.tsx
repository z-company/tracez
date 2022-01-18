import { Box, BoxProps } from "@chakra-ui/react";

export default function Card(props: BoxProps) {
  return <Box borderWidth="1px" borderColor="gray.400" borderRadius="5" p="5" {...props} />;
}