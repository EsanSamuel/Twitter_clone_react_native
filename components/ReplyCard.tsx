import { View, Text, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import Feather from "@expo/vector-icons/Feather";
import { FontAwesome5 } from "@expo/vector-icons";
import { Link, router } from "expo-router";
import { Image } from "react-native";
import Entypo from "@expo/vector-icons/Entypo";
import { useAuth } from "@clerk/clerk-expo";
import { format, formatDistanceToNowStrict } from "date-fns";
import axios from "axios";

interface PostProps {
  item: Record<string, any>;
}

const ReplyCard = ({ item }: PostProps) => {
  const { userId } = useAuth();
  const [comments, setComments] = useState<any>([]);
  const routetoProfile = () => {
    if (item.user.clerkId === userId) {
      router.push("/profile");
    } else {
      return router.push(`/user-profile/${item.user.clerkId}`);
    }
  };

  return (
    <View
      className={`w-full h-auto border-t-[1px] ${
        item.id === 0 ? "border-t-[1px] border-gray-300" : ""
      }  rounded-lg border-gray-200 px-5 py-3 flex flex-col`}
    >
      <View className="justify-between w-full flex-row">
        <View className="flex  flex-row gap-2">
          <TouchableOpacity
            className="flex flex-col items-center h-full"
            onPress={routetoProfile}
          >
            {item.user.profileImage ? (
              <Image
                source={{ uri: item.user.profileImage! }}
                className="w-10 h-10 rounded-full border-[1px] border-[#6B7280]"
              />
            ) : (
              <Image
                source={require("../assets/images/placeholder.png")}
                className="w-10 h-10 rounded-full border-[1px] border-[#6B7280]"
              />
            )}
          </TouchableOpacity>

          <View className="flex flex-row">
            <Text className="text-gray-600 font-pbold text-[13px]">
              {item.user.username}
            </Text>
           
            <Text className="text-gray-400 font-pmedium text-[11px] pl-2 pt-0.5">
              {formatDistanceToNowStrict(new Date(item.createdAt))}
            </Text>
          </View>
        </View>
        <Entypo name="dots-three-vertical" size={12} color="#9ca3af" />
      </View>
      <View className="pl-10 ml-2 -mt-4" style={{ paddingTop: -10 }}>
        <Text className=" text-gray-600 font-pmedium text-[12px]">
          {item.reply}
        </Text>

        {item.image !== null && item.image !== "" && (
          <View className=" pt-5">
            <Image
              source={{ uri: item.image! }}
              className="w-full min-h-[200px] max-h-[300px] rounded-lg object-contain"
            />
          </View>
        )}

        <View className="flex gap-4 pt-2 flex-row">
          <View className="flex gap-1 flex-row items-center">
            <Feather name="heart" size={18} color="#6b7280" />
            <Text className="text-gray-500 font-pmedium text-[12px]">120</Text>
          </View>

          <View className="flex gap-1 flex-row items-center">
            <FontAwesome5 name="comment" size={18} color="#6b7280" />
            <Text className="text-gray-500 font-pmedium text-[12px]">10</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default ReplyCard;
