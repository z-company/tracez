import { Center, Input, Text, VStack } from "@chakra-ui/react";
import { faCopy } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useFetchNewKey } from "client/client";
import Button from "components/Button";
import Layout from "components/dashboard/layout";
import { useState } from "react";

export default function Key() {
  const [key, fetchKey, {status}] = useFetchNewKey();
  const [copied, setCopied] = useState(false);
  return <Layout> 
    <Center height="100vh">
      <VStack>
        { key?.key ? 
          <>
            <Text>This is your new key</Text>
            <Text>Copy it now because you wont be able to see it again</Text>
            <Input value={key.key} />
            <Button
              w="100%"
              onClick={() => {
                navigator.clipboard.writeText(key.key);
                setCopied(true);
              }}
            >
              {
                copied
                  ? "Copied"
                  : <>
                    <Text px="1">Copy</Text>
                    <FontAwesomeIcon icon={faCopy} />
                  </>
              }
            </Button>
          </> :
          <>
            <Text>Generate a new access key for Tracez</Text>
            <Text>This will invalidate your old key</Text>
            <Button
              onClick={() => fetchKey()}
              disabled={status !== "idle"}
            >
          Generate
            </Button>
          </>
        }
      </VStack>
    </Center>
  </Layout>;
}