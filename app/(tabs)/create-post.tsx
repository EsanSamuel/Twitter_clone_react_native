import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import AntDesign from "@expo/vector-icons/AntDesign";
import Feather from "@expo/vector-icons/Feather";
import { TextInput, Dimensions } from "react-native";
import { Link } from "expo-router";
import axios from "axios";
import { useAuth } from "@clerk/clerk-expo";
import * as DocumentPicker from "expo-document-picker";
import {
  DocumentPickerResult,
  DocumentPickerSuccessResult,
} from "expo-document-picker";
import * as FileSystem from "expo-file-system";

const CreatePost = () => {
  const [form, setForm] = useState({
    content: "",
    image: [],
    tag: "",
  });
  const [user, setUser] = useState<any>("");
  const { userId } = useAuth();
  const { height: screenHeight } = Dimensions.get("window");

  useEffect(() => {
    const getUserId = async () => {
      const response = await axios.get(
        `http://192.168.43.199:3000/user/${userId}`
      );
      setUser(response.data);
    };
    getUserId();
  }, [userId]);

  const createPost = async () => {
    let base64Images: string[] = [];

    //check if form.image is an array
    if (Array.isArray(form.image)) {
      for (const singleImage of form.image) {
        try {
          let base64Image = await FileSystem.readAsStringAsync(
            singleImage.uri,
            {
              encoding: FileSystem.EncodingType.Base64,
            }
          );
          base64Images.push(`data:image/jpeg;base64,${base64Image}`);
        } catch (error) {
          console.error("Error converting image to base64:", error);
          Alert.alert("Error", "Failed to convert image.");
          return;
        }
      }
    }
    //const imageUri = form.image ? form.image.uri.replace("file://", "") : null;
    await axios.post("http://192.168.43.199:3000/post", {
      user_id: userId,
      content: form.content,
      tag: form.tag,
      image: base64Images,
    });
  };

  const openPicker = async () => {
    const result: DocumentPickerResult = await DocumentPicker.getDocumentAsync({
      type: "image/*",
      multiple: true,
    });

    if (!result.canceled) {
      setForm((prevState) => ({
        ...prevState,
        image: [...prevState.image, ...result.assets],
      }));
    }
  };
  return (
    <SafeAreaView className="w-full p-3 bg-white min-h-[100%]">
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View className="flex flex-row justify-between items-center w-full">
          <Link href="/home">
            <AntDesign name="close" size={24} color="#9ca3af" />
          </Link>
          <TouchableOpacity
            className="w-auto text-center  bg-blue rounded-full p-1 px-4 text-white"
            onPress={createPost}
          >
            <Text className="text-white font-pbold">Post</Text>
          </TouchableOpacity>
        </View>
        <View className="flex flex-row justify-between  gap-2 w-full pt-7">
          {user.profileImage ? (
            <Image
              source={{ uri: user.profileImage }}
              className="w-8 h-8 rounded-full border-[1px] border-gray-400"
              style={{
                position: "absolute",
                top: 18,
              }}
            />
          ) : (
            <Image
              source={require("../../assets/images/placeholder.png")}
              className="w-8 h-8 rounded-full border-[1px] border-gray-400"
              style={{
                position: "absolute",
                top: 18,
              }}
            />
          )}
          <View className="pl-10 w-full">
            <TextInput
              className="flex-1 font-pbold text-gray-500 text-[14px] min-h-[70px] h-auto -top-4"
              placeholder="What's happening?"
              onChangeText={(e) => setForm({ ...form, content: e })}
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

        <View className="flex-1 justify-end">
          <View className="flex-row flex-wrap gap-1">
            {form?.image.map((image, index) => (
              <View key={index} className="w-1/2 p-2 items-center">
                <Image
                  source={{ uri: image.uri }}
                  className="w-24 h-16 rounded-lg"
                />
              </View>
            ))}
          </View>
        </View>

        <TouchableOpacity
          className="w-[60px] h-[60px] text-center  bg-blue rounded-full p-2 text-white items-center justify-center"
          activeOpacity={0.7}
          onPress={openPicker}
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
