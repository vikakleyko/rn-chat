import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";
import { useCallback, useState } from "react";
import db from "../database/firebaseDb";

export const useFetchData = () => {
  const [response, setResponse] = useState(null);

  const fetchMessages = useCallback(async (size) => {
    const first = query(
      collection(db, "messages"),
      orderBy("timestamp", "desc"),
      limit(size)
    );
    let documentSnapshots = await getDocs(first);

    const list = documentSnapshots.docs
      .filter((d) => d.data().timestamp && d.data().text)
      .map((doc) => ({
        text: doc.data().text,
        timestamp: doc.data().timestamp,
      }))
      .sort((a, b) => a.timestamp.valueOf() - b.timestamp.valueOf());
    console.log({ size });
    setResponse(list);
  }, []);

  return { response, fetchMessages };
};
