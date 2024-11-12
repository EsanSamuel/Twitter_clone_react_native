import AllRoomBox from "@/components/AllRoomBox";
import { UserContext } from "@/context/UserProvider";
import axios from "axios";
import React, { Component, useContext, useEffect, useState } from "react";
import { FlatList } from "react-native";
import { TextInput } from "react-native";
import { Text, View } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

export const Chat = () => {
  const [chats, setChats] = useState([]);
  const { user } = useContext(UserContext);

  useEffect(() => {
    const getChats = async () => {
      const response = await axios.get(
        `http://192.168.43.199:3000/chat/${user.id}`
      );
      setChats(response.data);
    };
    getChats();
  }, [user]);

  return (
    <SafeAreaView className="bg-white min-h-[100%]">
      <FlatList
        data={chats}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <AllRoomBox data={item} />}
        ListHeaderComponent={() => (
          <View className="px-3">
            <Text className="font-pbold text-[18px] pb-1 pt-2">Chats</Text>
            <View className="px-3 bg-[#f5f5f5] rounded-full h-[50px] w-full">
              <TextInput
                className="flex-1 font-pmeduim  text-black text-[15px] h-[70px]  w-full"
                placeholder="Search chats..."
              />
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default Chat;
