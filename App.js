import React, { useState, useEffect } from "react";
import {
  View,
  KeyboardAvoidingView,
  StyleSheet,
  Platform,
  SafeAreaView,
  Alert,
} from "react-native";
import { ChatBox } from "./components/ChatBox";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { HeaderHeight, name } from "./lib/consts";

import { useFetchData } from "./hooks/useFetchData";
import { useListSize } from "./hooks/useListSize";

const App = () => {
  const { response, fetchMessages } = useFetchData();
  const [messages, setMessages] = useState(["Hi There!"]);
  const { listSize } = useListSize();

  const alert = () =>
    Alert.alert("Hello", name, [{ text: "OK" }], { cancelable: true });

  useEffect(() => {
    alert();
    fetchMessages(listSize);
  }, [fetchMessages]);

  useEffect(() => {
    if (!response) {
      return;
    }
    setMessages(response.map((m) => m.text));
  }, [response]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.ChatContainer}
    >
      <View style={styles.MainView}>
        <Header />
        <SafeAreaView style={styles.ScrollView}>
          <ChatBox messages={messages} setMessages={setMessages} />
          <Footer messages={messages} setMessages={setMessages} />
        </SafeAreaView>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  ChatContainer: {
    flex: 1,
  },
  MainView: {
    flex: 1,
    paddingTop: HeaderHeight,
    backgroundColor: "skyblue",
  },
  ScrollView: {
    flex: 1,
    marginTop: 0,
  },
  MessageBox: {
    alignSelf: "flex-end",
    backgroundColor: "#fff",
    borderRadius: 10,
    marginHorizontal: 20,
    marginVertical: 6,
    maxWidth: "75%",
    padding: 10,
  },
});

export default App;
