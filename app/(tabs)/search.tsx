import { useAuth } from "@clerk/clerk-expo";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import { router } from "expo-router";
import React, { Component, useEffect, useMemo, useState } from "react";
import { TouchableOpacity } from "react-native";
import { TextInput } from "react-native";
import { Image, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Search = () => {
  const { userId } = useAuth();
  const [user, setUser] = useState<any>("");
  const [users, setUsers] = useState<any[]>([]);
  useEffect(() => {
    const getUserId = async () => {
      const response = await axios.get(
        `http://192.168.43.199:3000/user/${userId}`
      );
      setUser(response.data);
    };
    getUserId();
  }, [userId]);

  useEffect(() => {
    const getUserId = async () => {
      const response = await axios.get(
        `http://192.168.43.199:3000/allusers/${user.id}`
      );
      setUsers(response.data);
    };
    getUserId();
  }, []);
  const routetoProfile = (user: string) => {
    router.push(`/user-profile/${user}`);
  };

  const AllUsers = useMemo(() => {
    const userEmail = user.email;
    const getUsers = users.filter((user) => user.email !== userEmail);
    return getUsers;
  }, [user.email, users]);

  return (
    <SafeAreaView className="bg-white min-h-[100%]">
      <ScrollView contentContainerStyle={{ height: "auto" }}>
        <View className="flex-row justify-between gap-2 p-3 items-center">
          <Ionicons name="chevron-back" size={28} color="#4b5563" />
          <View className="px-3 bg-[#f5f5f5] rounded-full h-[50px] w-[75%] ">
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
              source={{ uri: user.profileImage }}
              className="w-7 h-7 rounded-full border-[1px] border-gray-400"
            />
          </TouchableOpacity>
        </View>
        <View className="">
          <Text className="p-2 font-pbold text-[16px] text-gray-600">
            Users
          </Text>
          <View className="flex-col">
            {AllUsers.map((user) => (
              <View className="border-gray-200 border-[1px] px-2 py-3 flex-row justify-between items-center">
                <View className="flex-row gap-2 items-center">
                  {user.profileImage ? (
                    <Image
                      source={{ uri: user.profileImage }}
                      className="w-10 h-10 rounded-full border-[1px] border-gray-400"
                    />
                  ) : (
                    <Image
                      source={require("../../assets/images/placeholder.png")}
                      className="w-7 h-7 rounded-full border-[1px] border-gray-400"
                    />
                  )}
                  <View className="flex-col ">
                    <Text className="text-gray-600 font-pmedium">
                      {user.username}
                    </Text>
                    <Text className="text-gray-400  text-[10px] font-pmedium">
                      @{user.username.toLowerCase()}
                    </Text>
                  </View>
                </View>
                <TouchableOpacity
                  className="bg-white border-blue border-[1px] rounded-full px-4 py-1"
                  onPress={() => routetoProfile(user.clerkId)}
                >
                  <Text className="text-blue text-[12px] font-pregular">
                    View
                  </Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Search;
