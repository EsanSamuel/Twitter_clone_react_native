import { View, Text, FlatList, Image, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import PostCard from "@/components/PostCard";
import { AntDesign, FontAwesome6 } from "@expo/vector-icons";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";
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
  const [openModal, setOpenModal] = useState(false);
  const [form, setForm] = useState({
    username: "",
    bio: "",
    profileImage: null,
  });
  const [posts, setPosts] = useState<any>([]);
  const [user, setUser] = useState<any>("");
  const { userId } = useAuth();
  useEffect(() => {
    const getUserId = async () => {
      const response = await axios.get(
        `http://192.168.43.200:3000/user/${userId}`
      );
      setUser(response.data);
    };
    getUserId();
  }, [userId]);

  const updateUser = async () => {
    let base64Image = null;

    if (form.profileImage) {
      try {
        base64Image = await FileSystem.readAsStringAsync(
          form.profileImage.uri,
          {
            encoding: FileSystem.EncodingType.Base64,
          }
        );
        base64Image = `data:image/jpeg;base64,${base64Image}`;
      } catch (error) {
        console.error("Error converting image to base64:", error);
        Alert.alert("Error", "Failed to convert image.");
        return;
      }
    }
    //const imageUri = form.image ? form.image.uri.replace("file://", "") : null;
    await axios.patch(`http://192.168.43.200:3000/user/${userId}`, {
      username: form.username,
      bio: form.bio,
      profileImage: base64Image,
    });
  };

  const openPicker = async () => {
    const result: DocumentPickerResult = await DocumentPicker.getDocumentAsync({
      type: "image/*",
    });

    if (!result.canceled) {
      setForm({ ...form, profileImage: result.assets[0] });
    }
  };

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
            </View>
            <View className="p-3 pb-5">
              <TouchableOpacity
                className="w-full  border-[1px] border-blue rounded-full p-2 px-4 text-blue"
                onPress={() => setOpenModal(true)}
              >
                <Text className="text-blue text-center text-[13px] font-psemibold">
                  Edit Profile
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
      <ReactNativeModal
        isVisible={openModal}
        onBackdropPress={() => setOpenModal(false)} // Close the modal when tapping outside
        onBackButtonPress={() => setOpenModal(false)} // Handle Android back button
        animationIn="slideInUp"
        animationOut="slideOutDown"
      >
        <View className="bg-white px-7 py-9 rounded-2xl mb-2">
          <Text className="text-center text-2xl font-pbold mb-2">
            Edit Profile
          </Text>
          <Text className="text-center font-pmedium text-[12px]">
            Change your bio, profile pics and others
          </Text>
          {form.profileImage ? (
            <View className="items-center justify-center pb-2 mt-5">
              <Image
                source={{ uri: form.profileImage.uri }}
                className="w-[100px] h-[100px] rounded-full"
              />
            </View>
          ) : (
            <View className="items-center justify-center pb-2 mt-5">
              <Image
                source={{ uri: user.profileImage }}
                className="w-[100px] h-[100px] rounded-full"
              />
            </View>
          )}
          <TouchableOpacity
            className="w-full text-center  bg-blue rounded-full p-3 text-white mt-5"
            activeOpacity={0.7}
            onPress={openPicker}
          >
            <Text className="text-white text-center font-psemibold">
              Select Image
            </Text>
          </TouchableOpacity>
          <FormField
            title="Enter Username"
            otherStyles="mt-5"
            value={form.username}
            handleChangeText={(e) => setForm({ ...form, username: e })}
          />
          <FormField
            title="Enter Bio"
            otherStyles="mt-5"
            value={form.bio}
            handleChangeText={(e) => setForm({ ...form, bio: e })}
          />
          <TouchableOpacity
            className="w-full text-center  bg-blue rounded-full p-3 text-white mt-5"
            activeOpacity={0.7}
            onPress={updateUser}
          >
            <Text className="text-white text-center font-psemibold">Edit</Text>
          </TouchableOpacity>
        </View>
      </ReactNativeModal>
    </SafeAreaView>
  );
};

export default Profile;
