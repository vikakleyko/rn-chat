import { useCallback, useEffect, useRef, useState } from "react";
import { FlatList, Text, View, StyleSheet } from "react-native";
import { useFetchData } from "../hooks/useFetchData";
import { useListSize } from "../hooks/useListSize";
import { name } from "../lib/consts";

export const ChatBox = ({ messages, setMessages }) => {
  const ref = useRef();
  const [firstScroll, setFirst] = useState(null);
  const { response, fetchMessages } = useFetchData();
  const { listSize, increment } = useListSize();

  const currrentY = useRef(null);

  const onScroll = (event) => {
    if (firstScroll === null) {
      setFirst(event.nativeEvent.contentOffset.y);
    }
    currrentY.current = event.nativeEvent.contentOffset.y;
  };

  // when the user scrolled after initial index whether the user moved up, and then call api
  const onScrollEnd = useCallback(
    (event) => {
      if (event.nativeEvent.contentOffset.y < firstScroll) {
        // call api, load more messages
        increment();
        fetchMessages(listSize);
      }
    },
    [increment]
  );

  useEffect(() => {
    if (!response) {
      return;
    }
    setMessages(response.map((m) => m.text));
  }, [response]);

  return (
    <FlatList
      style={styles.List}
      contentContainerStyle={styles.ContentContainer}
      ref={ref}
      keyExtractor={() => Math.random()}
      onScrollEndDrag={onScrollEnd}
      onScroll={onScroll}
      onContentSizeChange={() => ref.current.scrollToEnd({ animated: true })}
      onLayout={() => ref.current.scrollToEnd({ animated: true })}
      data={messages}
      renderItem={({ item }) => (
        <View style={styles.MessageBox}>
          <Text style={styles.Name}>{name}</Text>
          <Text style={styles.MessageText}>{item}</Text>
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  MessageBox: {
    alignSelf: "flex-end",
    backgroundColor: "#fff",
    borderRadius: 10,
    marginHorizontal: 20,
    marginVertical: 6,
    maxWidth: "75%",
    padding: 10,
  },
  List: {
    flex: 1,
  },
  ContentContainer: {
    justifyContent: "flex-end",
  },
  Name: {
    opacity: 0.5,
    fontSize: 10,
  },
  MessageText: {},
});
