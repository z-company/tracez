import { Flex, useColorMode } from "@chakra-ui/react";
import { faBars, faHome, faKey, faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "components/Button";
import { useState } from "react";
import create from "zustand";
import NavItem from "./NavItem";

const useNavSize = create<{
  navSize: "large" | "small";
  changeNavSize: (navSize: "large" | "small") => any
    }>(set => ({
      navSize: "large" as "large"|"small",
      changeNavSize: (navSize: "large"|"small") => set(state => ({navSize}))
    }));

export default function Sidebar() {
  const {navSize, changeNavSize} = useNavSize();
  const {colorMode, toggleColorMode} = useColorMode();
  return (
    <Flex
      pos="sticky"
      top="2.5vh"
      left="5"
      h="95vh"
      boxShadow="0 4px 12px 0 rgba(0, 0, 0, 0.05)"
      borderRadius="15px"
      w={navSize == "small" ? "75px" : "200px"}
      flexDir="column"
      justifyContent="space-between"
      borderWidth="1px"
      borderColor="grey.400"
      transition={".1s"}
    >
      <Flex
        p="5%"
        flexDir="column"
        w="100%"
        as="nav"
      >
        <Button
          background="none"
          mt={5}
          _hover={{ background: "none" }}
          leftIcon={<FontAwesomeIcon icon={faBars} />}
          onClick={() => {
            if (navSize == "small")
              changeNavSize("large");
            else
              changeNavSize("small");
          }}
        />
        <NavItem navSize={navSize} icon={faHome} title="Dashboard" to="/dashboard" active />
        <NavItem navSize={navSize} icon={faKey} title="App Key" to="/dashboard/key" active />
      </Flex>
      <Button onClick={() => toggleColorMode()} >
        <FontAwesomeIcon icon={colorMode === "dark" ? faSun : faMoon} />
      </Button>
    </Flex>
  );
}