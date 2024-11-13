import { View, Text, SafeAreaView, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { format } from "date-fns";
import MessageBubble from "./MessageBubble";

interface IRoom {
  room: any;
}

const MessageBox = ({ room }: IRoom) => {
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    const getMessages = async () => {
      const response = await axios.get(
        `http://192.168.43.199:3000/message/${room.id}`
      );
      setMessages(response.data);
    };
    getMessages();
  }, [room]);

  return (
    <SafeAreaView className="h-[90%] bg-white">
      <ScrollView contentContainerStyle={{ height: "auto" }}>
        <View className="flex-1 pb-20">
          {room.createdAt && (
            <Text className="text-center text-[10px] p-3 font-pmedium">
              Started conversation on{" "}
              {format(new Date(room.createdAt), "dd MMMM, yyyy")}
            </Text>
          )}
          {messages.map((data: any) => (
            <View key={data.id}>
              <MessageBubble data={data} />
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default MessageBox;
