import { Flex, Text } from "@chakra-ui/react";
import { IconDefinition } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "components/Button";
import NextLink from "next/link";

export type NavItemProps = {
  icon: IconDefinition,
  title: string,
  active: boolean,
  to: string | (() => void),
  navSize: "large" | "small",
}

export default function NavItem({ icon, title, active, navSize, to }: NavItemProps) {
  const button = <Button
    backgroundColor={active ? undefined : "#AEC8CA"}
    p={3}
    borderRadius={8}
    w={navSize == "large" ? undefined : "100%"}
    bg="none"
    onClick={() => typeof to === "function" ? to() : null}
  >
    <Flex>
      <Text mx={"auto"}>
        <FontAwesomeIcon icon={icon} color={active ? "#82AAAD" : "gray.500"} />
      </Text>
      <Text ml={5} display={navSize == "small" ? "none" : "flex"}>
        {title}
      </Text>
    </Flex>
  </Button>;
  return (
    <Flex
      mt={30}
      flexDir="column"
      w="100%"
      alignItems={"flex-start"}
    >
      { typeof to === "string" ?
        <NextLink href={to} passHref>
          {button}
        </NextLink> : button
      }
    </Flex>
  );
}