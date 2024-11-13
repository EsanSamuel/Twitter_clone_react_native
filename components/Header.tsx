import { View, Text } from "react-native";
import React from "react";
import useOtherUser from "@/app/hooks/useOtherUser";
import { Image } from "react-native";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

interface IHeader {
  data: any;
}

const Header = ({ data }: IHeader) => {
  const otherUser = data && data.users ? useOtherUser(data) : null;
  return (
    <View className="mt-10 px-1 flex-row gap-1 pt-10 border-b-[0.5px] border-gray-300 pb-2 items-center bg-white">
      <TouchableOpacity
        onPress={() => router.push("/chat")}
        
        activeOpacity={0.7}
      >
        <Ionicons
          name="chevron-back"
          size={28}
          color="#4b5563"
         
        />
      </TouchableOpacity>
      <Image
        source={{ uri: otherUser?.profileImage! }}
        className="w-10 h-10 rounded-full border-[1px] border-[#6B7280]"
      />
      <View className="flex-col pl-2">
        <Text className="font-pmedium">{otherUser?.username}</Text>
        <Text className="font-plight text-[10px]">Active</Text>
      </View>
    </View>
  );
};

export default Header;
