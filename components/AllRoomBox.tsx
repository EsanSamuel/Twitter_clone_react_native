import { View, Text, TouchableOpacity } from "react-native";
import React, { useContext, useMemo } from "react";
import useOtherUser from "@/app/hooks/useOtherUser";
import { UserContext } from "@/context/UserProvider";
import { Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView } from "react-native";
import { router } from "expo-router";

interface IProps {
  data: any;
}

const AllRoomBox = ({ data }: IProps) => {
  const { user } = useContext(UserContext);
  const otherUser = useOtherUser(data);
  const lastMessages = data.messages || [];

  const handleClick = () => {
    router.push(`/Messages/${data.id}`);
  };

  return (
    <SafeAreaView className="bg-white min-h-[100%] pt-[-10]">
      <ScrollView contentContainerStyle={{ height: "auto" }}>
        <TouchableOpacity
          activeOpacity={0.7}
          className="flex-row gap-4 items-center flex  px-3"
          onPress={handleClick}
        >
          <Image
            source={{ uri: otherUser.profileImage! }}
            className="w-14 h-14 rounded-full border-[1px] border-[#6B7280]"
          />
          <View className="flex-col">
            <Text className="font-pmedium">{otherUser.username}</Text>
            <Text className="font-plight text-[12px]">
              Hello, how're you doing?
            </Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AllRoomBox;
