import AllRoomBox from "@/components/AllRoomBox";
import { UserContext } from "@/context/UserProvider";
import axios from "axios";
import { router } from "expo-router";
import React, { useContext, useEffect, useState } from "react";
import {
  Image,
  FlatList,
  TouchableOpacity,
  TextInput,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export const Chat = () => {
  const [chats, setChats] = useState([]);
  const { user } = useContext(UserContext);

  useEffect(() => {
    const getChats = async () => {
      const response = await axios.get(
        `http://192.168.43.199:3000/chat/${user.id}`
      );
      console.log("Chats fetched:", response.data);
      setChats(response.data);
    };
    getChats();
  }, [user]);

  return (
    <SafeAreaView className="bg-white flex-1">
      <FlatList
        data={chats}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <AllRoomBox data={item} />}
        ListHeaderComponent={() => (
          <View className="px-3 border-b border-gray-200 pb-3 h-auto">
            <View className="flex-row justify-between items-center mb-2">
              <Text className="font-bold text-[18px] text-gray-600">
                Chats ({chats.length})
              </Text>
              {user.profileImage ? (
                <TouchableOpacity
                  onPress={() => router.push("/profile")}
                  activeOpacity={0.7}
                >
                  <Image
                    source={{ uri: user.profileImage }}
                    className="w-7 h-7 rounded-full border border-gray-400"
                  />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={() => router.push("/profile")}
                  activeOpacity={0.7}
                >
                  <Image
                    source={require("../../assets/images/placeholder.png")}
                    className="w-7 h-7 rounded-full border border-gray-400"
                  />
                </TouchableOpacity>
              )}
            </View>
            <View className="px-3 bg-[#f5f5f5] rounded-full h-[40px] w-full">
              <TextInput
                className="flex-1 text-black text-[15px] h-[40px] w-full"
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
