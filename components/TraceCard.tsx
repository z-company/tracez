import {
  Code,
  Text,
  VStack,
  Link as ChackraLink,
  useDisclosure,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay
} from "@chakra-ui/react";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { dismissTrace } from "client/client";
import Link from "next/link";
import { TraceResponse } from "pages/api/trace";
import React from "react";
import { Day, Hour, Month } from "store/units";
import { nTon } from "utils/utils";
import Button from "./Button";

export default function TraceCard({trace}: React.PropsWithoutRef<{trace: TraceResponse}>) {
  const { isOpen, onOpen, onClose } = useDisclosure();
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
      const unit = nTon(stat.unit);
      switch (unit) {
      case Hour:
        return <Text key={unit}>This Hour: {stat.hits}</Text>;
      case Day:
        return <Text key={unit}>Today: {stat.hits}</Text>;
      case Month:
        return <Text key={unit}>This Month: {stat.hits}</Text>;
      }
    })}
    <Button onClick={onOpen}>
      <FontAwesomeIcon icon={faTrash} />
    </Button>
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Delete the Trace</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          The trace and all its statistics will be deleted.
        </ModalBody>

        <ModalFooter>
          <Button
            colorScheme="red"
            mr={3}
            variant='outline'
            onClick={() => {
              dismissTrace(trace.id);
              onClose();
            }}
          >
            Delete
          </Button>
          <Button onClick={onClose}>
              Abort
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  </VStack>;
}