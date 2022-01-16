import { Box, Button, Center, Heading, Stack, Text, VStack } from "@chakra-ui/react";
import { ClientSafeProvider, getProviders, signIn, useSession } from "next-auth/react";
import Router from "next/router";
import { useEffect } from "react";
import { faDiscord, faGithub, faGitlab, IconDefinition } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const icons: Record<string, IconDefinition> = {
  GitHub: faGithub,
  GitLab: faGitlab,
  Discord: faDiscord,
};

export default function SignIn({providers}: {providers: Record<string, ClientSafeProvider>}) {
  const {data} = useSession();
  useEffect(() => {
    if (data)
      Router.push("/dashboard");
  }, [data]);
  
  return <Center h="100vh">
    <Stack
      spacing={10}
      py="20"
      px="10"
      borderColor="gray.400"
      borderWidth="1px"
      borderRadius="10"
    >
      <VStack>
        <Heading as="h1" mx="auto">Tracez</Heading>
        <Text mx="auto">Sign in</Text>
      </VStack>
      <Text fontSize="xl">Choose your favourite service</Text>
      {Object.values(providers).map(p => 
        <Button onClick={() => signIn(p.id)} key={p.name}>
          <Text p="2">{p.name in icons ? <FontAwesomeIcon icon={icons[p.name]} /> : null}</Text>
          Sign in with {p.name}
        </Button>
      )}
    </Stack>
  </Center>;
}

export async function getServerSideProps() {
  const providers = await getProviders();
  return {
    props: { providers },
  };
}
