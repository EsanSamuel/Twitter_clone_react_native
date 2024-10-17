import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import { ScrollView } from "react-native";
import { Feather, Ionicons } from "@expo/vector-icons";
import PostCard from "@/components/PostCard";
import axios from "axios";
import * as DocumentPicker from "expo-document-picker";
import {
  DocumentPickerResult,
  DocumentPickerSuccessResult,
} from "expo-document-picker";
import * as FileSystem from "expo-file-system";
import { useAuth } from "@clerk/clerk-expo";

const Comment = () => {
  const [post, setPost] = useState<any>("");
  const [form, setForm] = useState({
    comment: "",
    image: null,
  });
  const [user, setUser] = useState<any>("");
  const [comments, setComments] = useState<any>("");
  const { query } = useLocalSearchParams();
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

  useEffect(() => {
    const getPost = async () => {
      const response = await axios.get(
        `http://192.168.43.200:3000/post/${query}`
      );
      setPost(response.data);
    };
    getPost();
  }, [query]);

  const createComment = async () => {
    try {
      let base64Image = null;

      if (form.image) {
        try {
          base64Image = await FileSystem.readAsStringAsync(form.image.uri, {
            encoding: FileSystem.EncodingType.Base64,
          });
          base64Image = `data:image/jpeg;base64,${base64Image}`;
        } catch (error) {
          console.error("Error converting image to base64:", error);
          Alert.alert("Error", "Failed to convert image.");
          return;
        }
      }
      axios.post("http://192.168.43.200:3000/comment", {
        comment: form.comment,
        image: base64Image,
        post_id: query,
        user_id: user.id,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const openPicker = async () => {
    const result: DocumentPickerResult = await DocumentPicker.getDocumentAsync({
      type: "image/*",
    });

    if (!result.canceled) {
      setForm({ ...form, image: result.assets[0] });
    }
  };

  useEffect(() => {
    const getComments = async () => {
      const response = await axios.get(
        `http://192.168.43.200:3000/comment/${query}`
      );
      setComments(response.data);
    };
    getComments();
  }, [query]);

  return (
    <SafeAreaView>
      <FlatList
        data={comments}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{
          paddingTop: 10,
          borderBottomColor: "#6B7280",
          height: "auto",
        }}
        //ItemSeparatorComponent={() => <View className="h-3" />}
        renderItem={({ item }) => (
          <View className="">
            <Text>11{item.comment}</Text>
          </View>
        )}
        ListHeaderComponent={() => (
          <View className=" w-full h-full">
            <View className="w-full flex flex-row  items-center">
              <TouchableOpacity
                onPress={() => router.push("/home")}
                className="z-10 pb-5"
                activeOpacity={0.7}
              >
                <Ionicons
                  name="chevron-back"
                  size={28}
                  color="#4b5563"
                  style={{
                    position: "absolute",
                    top: 30,
                  }}
                />
              </TouchableOpacity>
            </View>
            <Text className="text-center font-pbold p-2 text-[18px] text-gray-600">
              Post
            </Text>
            {post && <PostCard item={post} />}
            <View className="px-3 z-10 mt-2">
              <View className="px-3 bg-[#E1E8ED] rounded-full h-[50px] flex-row items-center">
                <TouchableOpacity
                  className="w-auto h-auto text-center rounded-full  text-white"
                  onPress={openPicker}
                >
                  <Feather name="image" size={24} color="#1da1f2" />
                </TouchableOpacity>
                <TextInput
                  className="flex-1 font-pmeduim  text-black text-[15px] h-[70px] w-full px-2"
                  placeholder="Enter Comment"
                  value={form.comment}
                  onChangeText={(e) => setForm({ ...form, comment: e })}
                />
                <TouchableOpacity
                  className="w-auto h-auto text-center  bg-blue rounded-full p-2 px-4 text-white"
                  onPress={createComment}
                >
                  <Ionicons name="send" size={24} color="white" />
                </TouchableOpacity>
              </View>
            </View>
            <View>
              <Text className="font-pbold pt-5 p-3 text-[18px] text-gray-600 z-20">
                Comments
              </Text>
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default Comment;
