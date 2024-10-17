import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { Component } from "react";
import { TouchableOpacity } from "react-native";
import { TextInput } from "react-native";
import { Image, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const categories = [
  { id: 1, category: "Travel" },
  { id: 2, category: "Food & Drink" },
  { id: 3, category: "Fitness & Health" },
  { id: 4, category: "Fashion & Style" },
  { id: 5, category: "Beauty & Makeup" },
  { id: 6, category: "Tech & Gadgets" },
  { id: 7, category: "Gaming" },
  { id: 8, category: "Music" },
  { id: 9, category: "Sports" },
  { id: 10, category: "Art & Design" },
  { id: 11, category: "Movies & TV Shows" },
  { id: 12, category: "Books & Literature" },
  { id: 13, category: "Education & Learning" },
  { id: 14, category: "Business & Entrepreneurship" },
  { id: 15, category: "Parenting" },
  { id: 16, category: "Environment & Nature" },
  { id: 17, category: "Photography" },
  { id: 18, category: "DIY & Crafts" },
  { id: 19, category: "Finance & Investing" },
  { id: 20, category: "Relationships & Dating" },
];

const Search = () => {
  return (
    <SafeAreaView>
      <ScrollView contentContainerStyle={{ height: "auto" }}>
        <View className="flex-row justify-between gap-2 p-3 items-center">
          <Ionicons name="chevron-back" size={28} color="#4b5563" />
          <View className="px-3 bg-[#E1E8ED] rounded-full h-[50px] w-[75%] ">
            <TextInput
              className="flex-1 font-pmeduim  text-black text-[15px] h-[70px]  w-full"
              placeholder="Search users..."
            />
          </View>
          <TouchableOpacity
            onPress={() => router.push("/profile")}
            activeOpacity={0.7}
          >
            <Image
              source={require("../../assets/images/placeholder.png")}
              className="w-7 h-7 rounded-full border-[1px] border-gray-400"
            />
          </TouchableOpacity>
        </View>
        <View className="">
          <Text className="font-pbold p-3  text-2xl text-blue pb-5">
            #Filter Posts by Tags
          </Text>

          <View className="flex-col">
            {categories.map((tag) => (
              <View
                className={` ${
                  tag.id === 1 && "border-t-[1px] border-gray-300"
                } border-b-[1px] px-3 py-5 border-gray-300`}
                key={tag.id}
              >
                <Text className="text-gray-500 font-pbold">{tag.category}</Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Search;
