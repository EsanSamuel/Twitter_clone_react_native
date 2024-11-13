import { View, Text, FlatList, Image, TouchableOpacity } from "react-native";
import React, { useContext, useEffect, useState } from "react";
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
import { UserContext } from "@/context/UserProvider";

const home = () => {
  const [posts, setPosts] = useState([]);
  const { userId } = useAuth();
  // const [user, setUser] = useState<any>("");
  //const [firstName, setFirstName] = useState<string>("");
  //const [lastName, setLastName] = useState<string>("");

  const { user, firstName, lastName } = useContext(UserContext);

  useEffect(() => {
    const getPosts = async () => {
      const response = await axios.get("http://192.168.43.199:3000/post");
      setPosts(response.data);
    };
    getPosts();
  }, []);

  /*useEffect(() => {
    const getUserId = async () => {
      const response = await axios.get(
        `http://192.168.43.200:3000/user/${userId}`
      );
      setUser(response.data);
      const username = response.data.username;
      if (username.includes(" ")) {
        const [firstname, lastname] = username.split(" ");
        setFirstName(firstname);
        setLastName(lastname);
      } else {
        setFirstName(username);
        setLastName("");
      }
    };
    getUserId();
  }, [userId]);*/

  return (
    <SafeAreaView className="bg-white min-h-[100%]">
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingTop: 0, borderBottomColor: "#6B7280" }}
        //ItemSeparatorComponent={() => <View className="h-3" />}
        renderItem={({ item }) => <PostCard item={item} />}
        ListEmptyComponent={() => (
          <View className="mt-20 p-5">
            <Text className="text-[20px] text-gray-500 font-pbold">
              {firstName}, There are no posts yet!
            </Text>
          </View>
        )}
        ListHeaderComponent={() => (
          <View className="p-3 w-full">
            <View className="w-full flex flex-row justify-between items-center">
              <FontAwesome6 name="grip-lines" size={24} color="#6B7280" />
              <AntDesign name="twitter" size={25} color="#1DA1F2" />
              {user.profileImage ? (
                <TouchableOpacity
                  onPress={() => router.push("/profile")}
                  activeOpacity={0.7}
                >
                  <Image
                    source={{ uri: user.profileImage }}
                    className="w-7 h-7 rounded-full border-[1px] border-gray-400"
                  />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={() => router.push("/profile")}
                  activeOpacity={0.7}
                >
                  <Image
                    source={require("../../assets/images/placeholder.png")}
                    className="w-7 h-7 rounded-full border-[1px] border-gray-400"
                  />
                </TouchableOpacity>
              )}
            </View>
            <Text className="font-pbold pt-5 text-2xl text-gray-600 pb-2">
              See what's new!
            </Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default home;
