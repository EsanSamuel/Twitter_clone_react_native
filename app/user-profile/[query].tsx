import { View, Text, FlatList, Image, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import PostCard from "@/components/PostCard";
import { AntDesign, Feather, FontAwesome6 } from "@expo/vector-icons";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router, useLocalSearchParams } from "expo-router";
import ReactNativeModal from "react-native-modal";
import FormField from "@/components/FormField";
import { useAuth } from "@clerk/clerk-expo";
import axios from "axios";
import * as DocumentPicker from "expo-document-picker";
import {
  DocumentPickerResult,
  DocumentPickerSuccessResult,
} from "expo-document-picker";
import * as FileSystem from "expo-file-system";
import { Alert } from "react-native";

const Profile = () => {
  const { query } = useLocalSearchParams();
  const [openModal, setOpenModal] = useState(false);
  const [posts, setPosts] = useState<any>([]);
  const [user, setUser] = useState<any>("");
  const { userId } = useAuth();
  useEffect(() => {
    const getUserId = async () => {
      const response = await axios.get(
        `http://192.168.43.200:3000/user/${query}`
      );
      setUser(response.data);
    };
    getUserId();
  }, [query]);

  useEffect(() => {
    const getUserPost = async () => {
      const response = await axios.get(
        `http://192.168.43.200:3000/userpost/${user.id}`
      );
      setPosts(response.data);
    };
    getUserPost();
  }, [user.id]);

  return (
    <SafeAreaView>
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingTop: 10, borderBottomColor: "#6B7280" }}
        //ItemSeparatorComponent={() => <View className="h-3" />}
        renderItem={({ item }) => <PostCard item={item} />}
        ListHeaderComponent={() => (
          <View className="w-full">
            <View className="w-full ">
              <TouchableOpacity
                onPress={() => router.push("/home")}
                className="z-10 "
                activeOpacity={0.7}
              >
                <Ionicons
                  name="chevron-back"
                  size={24}
                  color="#fff"
                  style={{
                    position: "absolute",
                    top: 7,
                    left: 7,
                    zIndex: 10,
                  }}
                />
              </TouchableOpacity>
            </View>
            <View className="bg-blue h-[150px]  p-3 "></View>
            <View
              className="pt-10 -mt-20 px-3 flex-col pb-5 flex justify-between w-full"
              style={{ gap: 7 }}
            >
              <Image
                source={{ uri: user.profileImage }}
                className="w-20 h-20 rounded-full"
              />
              <Text className="font-pbold text-2xl text-gray-600">
                {user.username}
              </Text>

              <Text className="font-pmedium text-[13px] text-gray-600">
                {user.bio}
              </Text>
              <View className="p-3">
                <TouchableOpacity
                  className="w-full  border-[1px] border-blue rounded-full p-2 px-4
                 text-blue flex-row  justify-center items-center"
                >
                  <Feather name="mail" size={24} color="#1da1f2" />
                  <Text className="text-blue text-center text-[13px] font-psemibold ml-4">
                    Message
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default Profile;
