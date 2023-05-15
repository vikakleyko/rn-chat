import { useState } from "react";
import { Button, TextInput, View, StyleSheet } from "react-native";
import { addDoc, collection } from "firebase/firestore";
import db from "../database/firebaseDb";

export const Footer = ({ messages, setMessages }) => {
  const [text, setText] = useState("");

  const saveMessage = async () => {
    try {
      const docRef = await addDoc(collection(db, "messages"), {
        text,
        timestamp: Date.now(),
      });
      setMessages([...messages, text.trim()]);
      setText("");
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const handleSendMessage = () => {
    saveMessage();
  };

  return (
    <View style={styles.Footer}>
      <TextInput
        placeholder="Enter message..."
        onChangeText={setText}
        value={text}
        style={styles.TextInput}
      />
      <Button
        disabled={!text.trim()}
        title="Send"
        onPress={() => handleSendMessage()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  TextInput: {
    height: 40,
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingLeft: 10,
    width: "75%",
  },
  Footer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 20,
  },
});
