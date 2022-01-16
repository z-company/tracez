import { useState } from "react";

export const useRerender = () => {
  const [atom, setAtom] = useState(0);
  return [atom, () => setAtom(t => (t + 1) % 2)] as [number, () => void];
};