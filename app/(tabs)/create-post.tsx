import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import AntDesign from "@expo/vector-icons/AntDesign";
import Feather from "@expo/vector-icons/Feather";
import { TextInput, Dimensions } from "react-native";
import { Link } from "expo-router";

const CreatePost = () => {
  const { height: screenHeight } = Dimensions.get("window");
  return (
    <SafeAreaView className="w-full p-3">
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View className="flex flex-row justify-between items-center w-full">
          <Link href="/home">
            <AntDesign name="close" size={24} color="#9ca3af" />
          </Link>
          <TouchableOpacity className="w-auto text-center  bg-blue rounded-full p-1 px-4 text-white">
            <Text className="text-white font-pbold">Post</Text>
          </TouchableOpacity>
        </View>
        <View className="flex flex-row justify-between  gap-2 w-full pt-7">
          <Image
            source={require("../../assets/images/placeholder.png")}
            className="w-8 h-8 rounded-full border-[1px] border-gray-400"
            style={{
              position: "absolute",
              top: 18,
            }}
          />
          <View className="pl-10 w-full">
            <TextInput
              className="flex-1 font-pbold text-gray-500 text-[14px] min-h-[70px] h-auto -top-4"
              placeholder="What's happening?"
              multiline={true}
              style={{
                minHeight: screenHeight / 2, // Half of the screen height
                maxHeight: screenHeight, // Optional: Set max height to avoid exceeding screen height
                textAlignVertical: "top", // Aligns text to the top
                paddingVertical: 10, // Adds some padding for better text visibility
                lineHeight: 30,
              }}
            />
          </View>
        </View>
        <TouchableOpacity
          className="w-[60px] h-[60px] text-center  bg-blue rounded-full p-2 text-white items-center justify-center"
          activeOpacity={0.7}
          style={{
            position: "absolute",
            bottom: 3,
            right: 2,
          }}
        >
          <Feather name="image" size={25} color="white" />
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CreatePost;
