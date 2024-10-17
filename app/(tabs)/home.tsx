import { View, Text, FlatList, Image, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import Feather from "@expo/vector-icons/Feather";
import { FontAwesome5 } from "@expo/vector-icons";
import { Link, router } from "expo-router";
import PostCard from "@/components/PostCard";
//import { posts } from "@/libs/dummyData";
import axios from "axios";
import { useAuth } from "@clerk/clerk-expo";

const home = () => {
  const [posts, setPosts] = useState([]);
  const { userId } = useAuth();
  const [user, setUser] = useState<any>("");

  useEffect(() => {
    const getPosts = async () => {
      const response = await axios.get("http://192.168.43.200:3000/post");
      setPosts(response.data);
    };
    getPosts();
  }, []);

  useEffect(() => {
    const getUserId = async () => {
      const response = await axios.get(
        `http://192.168.43.200:3000/user/${userId}`
      );
      setUser(response.data);
    };
    getUserId();
  }, [userId]);

  return (
    <SafeAreaView>
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingTop: 0, borderBottomColor: "#6B7280" }}
        //ItemSeparatorComponent={() => <View className="h-3" />}
        renderItem={({ item }) => <PostCard item={item} />}
        ListHeaderComponent={() => (
          <View className="p-3 w-full">
            <View className="w-full flex flex-row justify-between items-center">
              <FontAwesome6 name="grip-lines" size={24} color="#6B7280" />
              <AntDesign name="twitter" size={25} color="#1DA1F2" />
              <TouchableOpacity
                onPress={() => router.push("/profile")}
                activeOpacity={0.7}
              >
                <Image
                  source={{ uri: user.profileImage! }}
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
