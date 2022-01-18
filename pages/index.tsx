import { Box, Center, Heading, HStack, VStack, Text, List, ListItem, ListIcon, OrderedList } from "@chakra-ui/react";
import { faCheckCircle, faClipboard, faRedo, faSignInAlt, IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "components/Button";
import Card from "components/Card";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";

const FA = (id: IconDefinition) => <FontAwesomeIcon icon={id} />;

export default function App() {
  const { data } = useSession();
  return <VStack>
    <HStack w="100%" justifyContent="end">
      <Box mr="5" mt="5">
        {data
          ? <Link passHref href="/dashboard"><Button>Dashboard</Button></Link>
          : <Button onClick={() => signIn()}>Sign in</Button>
        }
      </Box>
    </HStack>
    <Center height="100%">
      <VStack>
        <Heading size="4xl">Tracez</Heading>
        <Heading>See what goes wrong.</Heading>
        <Text>How does it work?</Text>
        <HStack>
          <Card>
            <Center>
              <Heading as={() => FA(faSignInAlt)} />
            </Center>
            Sign In with your favorite service
          </Card>
          <Card>
            <Center>
              <Heading as={() => FA(faRedo)} />
            </Center>
              Generate an Application Key
          </Card>
          <Card>
            <Center>
              <Heading as={() => FA(faClipboard)} />
            </Center>
              Start logging better.
          </Card>
        </HStack>
      </VStack>
    </Center>
  </VStack>;
}