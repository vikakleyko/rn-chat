import { useState } from "react";

export const useListSize = () => {
  const [listSize, setListSize] = useState(25);

  const increment = () => setListSize((l) => l + 25);

  return { listSize, increment };
};
