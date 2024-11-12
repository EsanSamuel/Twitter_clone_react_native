import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import Header from "@/components/Header";
import axios from "axios";
import useOtherUser from "../hooks/useOtherUser";
import MessageForm from "@/components/MessageForm";
import MessageBox from "@/components/MessageBox";

const Messages = () => {
  const { query } = useLocalSearchParams();
  const [room, setRoom] = useState<any>("");

  useEffect(() => {
    const getRoom = async () => {
      const response = await axios.get(
        `http://192.168.43.199:3000/room/${query}`
      );
      setRoom(response.data);
    };
    getRoom();
  }, [query]);

  return (
    <View className="flex-1 h-[100vh] w-full">
      <Header data={room} />
      <MessageBox room={room} />
      <MessageForm room={room} />
    </View>
  );
};

export default Messages;
