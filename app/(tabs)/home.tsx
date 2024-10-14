import { View, Text, FlatList, Image, TouchableOpacity } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import Feather from "@expo/vector-icons/Feather";
import { FontAwesome5 } from "@expo/vector-icons";
import { Link, router } from "expo-router";
import PostCard from "@/components/PostCard";
import { posts } from "@/libs/dummyData";

const home = () => {
  return (
    <SafeAreaView>
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingTop: 10, borderBottomColor: "#6B7280" }}
        //ItemSeparatorComponent={() => <View className="h-3" />}
        renderItem={({ item }) => <PostCard item={item} />}
        ListHeaderComponent={() => (
          <View className="p-3 w-full">
            <View className="w-full flex flex-row justify-between items-center">
              <FontAwesome6 name="grip-lines" size={24} color="#6B7280" />
              <AntDesign name="twitter" size={25} color="#1DA1F2" />
              <TouchableOpacity onPress={() => router.push("/profile")} activeOpacity={0.7}>
                <Image
                  source={require("../../assets/images/placeholder.png")}
                  className="w-7 h-7 rounded-full border-[1px] border-gray-400"
                />
              </TouchableOpacity>
            </View>
            <Text className="font-pbold pt-5 text-2xl text-gray-600 pb-5">
              See what's new!
            </Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default home;
