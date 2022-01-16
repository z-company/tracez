import { Button, ButtonProps } from "@chakra-ui/react";

export default function FButton(props: ButtonProps) {
  return <Button _focus={{ "border": "none"}}  {...props} />;
}