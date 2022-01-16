import { Button } from "@chakra-ui/react";
import { signIn, signOut, useSession } from "next-auth/react";

export default function App() {
  const {data} = useSession();
  return data ?
    <Button onClick={() => signOut()}>SignOut {data.user?.name} ({data.user?.email})</Button>
    : <Button onClick={() => signIn()}>SignIn</Button>;
}