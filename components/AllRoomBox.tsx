import { View, Text, TouchableOpacity } from "react-native";
import React, { useContext, useMemo } from "react";
import useOtherUser from "@/app/hooks/useOtherUser";
import { UserContext } from "@/context/UserProvider";
import { Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView } from "react-native";
import { router } from "expo-router";

interface IProps {
  data: any & {
    users: any[];
    messages: any[];
  };
}

const AllRoomBox = ({ data }: IProps) => {
  const { user } = useContext(UserContext);
  const otherUser = useOtherUser(data);

  const handleClick = () => {
    router.push(`/Messages/${data.id}`);
  };

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      className="flex-row gap-4 items-center flex  px-3 py-3"
      onPress={handleClick}
    >
      <Image
        source={{ uri: otherUser.profileImage! }}
        className="w-10 h-10 rounded-full border-[1px] border-[#6B7280]"
      />
      <View className="flex-col">
        <Text className="font-pmedium text-gray-600">{otherUser.username}</Text>
        <Text className="font-plight text-[11px]">
          Started a conversation with {otherUser.username}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default AllRoomBox;
