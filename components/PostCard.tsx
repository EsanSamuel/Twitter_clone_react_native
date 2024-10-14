import { View, Text } from "react-native";
import React from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import Feather from "@expo/vector-icons/Feather";
import { FontAwesome5 } from "@expo/vector-icons";
import { Link } from "expo-router";
import { Image } from "react-native";
import Entypo from '@expo/vector-icons/Entypo';

interface PostProps {
  item: Record<string, any>;
}

const PostCard = ({ item }: PostProps) => {
  return (
    <View
      className={`w-full h-auto border-b-[1px] ${
        item.id === "1" ? "border-t-[1px] border-gray-300" : ""
      }  rounded-lg border-gray-300 px-5 py-3 flex flex-col`}
    >
      <View className="justify-between w-full flex-row">
      <View className="flex  flex-row gap-2">
        <View className="flex flex-col items-center h-full">
          <Image
            source={{ uri: item.user.profileImage }}
            className="w-10 h-10 rounded-full border-[1px] border-[#6B7280]"
          />
          {/*<View className="w-0.5 h-[100%] bg-gray-300 absolute mt-10 " />*/}
        </View>

        <View className="flex flex-row">
          <Text className="text-gray-500 font-pbold text-[13px]">
            {item.user.displayName}
          </Text>
          <Text className="text-gray-400 font-pbold text-[11px] pl-1">
            @{item.user.username}
          </Text>
        </View>
      </View>
      <Entypo name="dots-three-vertical" size={12} color="#9ca3af" />
      </View>
      <View className="pl-10 ml-2 -mt-4" style={{ paddingTop: -10 }}>
        <Text className=" text-gray-500 font-psemibold text-[13px]">
          {item.content}
        </Text>
        {item.tag !== null && (
          <Text className="text-[12px] text-blue font-psemibold">
            {item.tag}
          </Text>
        )}

        {item.image !== null && (
          <View className=" pt-5">
            <Image
              source={{ uri: item.image! }}
              className="w-full h-[200px] rounded-lg object-contain"
            />
          </View>
        )}

        <View className="flex gap-4 pt-2 flex-row">
          <View className="flex gap-1 flex-row items-center">
            <Feather name="heart" size={18} color="#9ca3af" />
            <Text className="text-gray-400 font-pmedium text-[12px]">
              {item.likes}
            </Text>
          </View>

          <Link href={`/comment/${item.id}`}>
            <View className="flex gap-1 flex-row items-center">
              <FontAwesome5 name="comment" size={18} color="#9ca3af" />
              <Text className="text-gray-400 font-pmedium text-[12px]">
                {item.replies}
              </Text>
            </View>
          </Link>
        </View>
      </View>
    </View>
  );
};

export default PostCard;