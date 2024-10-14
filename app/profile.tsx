import { View, Text, FlatList, Image, TouchableOpacity } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { posts } from "@/libs/dummyData";
import PostCard from "@/components/PostCard";
import { AntDesign, FontAwesome6 } from "@expo/vector-icons";
import Ionicons from "@expo/vector-icons/Ionicons";

const user = {
  username: "marksmith",
  displayName: "Mark Smith",
  profileImage:
   "data:image/jpeg;base64,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",
  handle: "@marksmith",
  bio: "Web developer and tech enthusiast. Passionate about building responsive websites and exploring new technologies.",
};

const Profile = () => {
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
              <Ionicons
                name="chevron-back"
                size={24}
                color="#fff"
                style={{
                  position: "absolute",
                  top: 5,
                  left: 7,
                  zIndex: 10,
                }}
              />
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
                {user.displayName}
              </Text>
              <Text className="font-pmedium text-[12px] text-gray-500 pt-[-2px]">
                {user.handle}
              </Text>
              <Text className="font-pmedium text-[13px] text-gray-600">
                {user.bio}
              </Text>
            </View>
            <View className="p-3 pb-5">
              <TouchableOpacity className="w-full  border-[1px] border-blue rounded-full p-2 px-4 text-blue">
                <Text className="text-blue text-center text-[13px] font-pregular">
                  Edit Profile
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default Profile;
