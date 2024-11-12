import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { format } from "date-fns";

interface IRoom {
  room: any;
}

const MessageBox = ({ room }: IRoom) => {
  const [messages, setMessages] = useState<any[]>([]);
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
    <View className="flex-1">

      {messages.map((data: any) => (
        <View key={data.id}>
          <Text>{data.message}</Text>
        </View>
      ))}
    </View>
  );
};

export default MessageBox;
