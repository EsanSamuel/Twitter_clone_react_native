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
import { ScrollView } from "react-native";
import { Feather, FontAwesome5, Ionicons } from "@expo/vector-icons";
import PostCard from "@/components/PostCard";
import axios from "axios";
import * as DocumentPicker from "expo-document-picker";
import {
  DocumentPickerResult,
  DocumentPickerSuccessResult,
} from "expo-document-picker";
import * as FileSystem from "expo-file-system";
import { useAuth } from "@clerk/clerk-expo";
import { Image } from "react-native";
import ReactNativeModal from "react-native-modal";
import { Link } from "expo-router";
import ReplyCard from "./ReplyCard";
import { formatDistanceToNowStrict } from "date-fns";

interface CommentProps {
  item: Record<string, any>;
  commentLength: number;
}

const CommentCard = ({ item, commentLength }: CommentProps) => {
  const [form, setForm] = useState({
    reply: "",
    image: null,
  });
  const [user, setUser] = useState<any>("");
  const [showReplies, setShowReples] = useState<boolean>(false);
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
  const [commentModal, setCommentModal] = useState<boolean>(false);
  const [replies, setReplies] = useState<any>([]);
  const openPicker = async () => {
    const result: DocumentPickerResult = await DocumentPicker.getDocumentAsync({
      type: "image/*",
    });

    if (!result.canceled) {
      setForm({ ...form, image: result.assets[0] });
    }
  };

  const createReply = async () => {
    let base64Image = "";

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
    await axios.post("http://192.168.43.200:3000/reply", {
      user_id: user.id,
      reply: form.reply,
      image: base64Image,
      comment_id: item.id,
    });
  };

  useEffect(() => {
    const getReplies = async () => {
      const response = await axios.get(
        `http://192.168.43.200:3000/reply/${item.id}`
      );
      setReplies(response.data);
    };
    getReplies();
  }, [item.id]);

  return (
    <View
      className={`w-full h-auto border-b-[1px] ${
        item.id === 0 ? "border-t-[1px] border-gray-300" : ""
      }  rounded-lg border-gray-300 p-3 flex flex-col`}
    >
      <View className="justify-between w-full flex-row">
        <View className="flex  flex-row gap-2">
          <View className="flex flex-col items-center h-full">
            {item.user.profileImage ? (
              <Image
                source={{ uri: item.user.profileImage! }}
                className="w-10 h-10 rounded-full border-[1px] border-[#6B7280]"
              />
            ) : (
              <Image
                source={require("../assets/images/placeholder.png")}
                className="w-10 h-10 rounded-full border-[1px] border-[#6B7280]"
              />
            )}
          </View>

          <View className="flex flex-row">
            <Text className="text-gray-700 font-pbold text-[13px]">
              {item.user.username}
            </Text>
            <Text className="text-gray-400 font-pmedium text-[11px] pl-2 pt-0.5">
              {formatDistanceToNowStrict(new Date(item.createdAt))}
            </Text>
          </View>
        </View>
      </View>
      <View className="pl-10 ml-2 -mt-4" style={{ paddingTop: -10 }}>
        <Text className=" text-gray-600 font-pregular text-[13px]">
          {item.comment}
        </Text>

        {item.image !== null && (
          <View className=" pt-5">
            <Image
              source={{ uri: item.image! }}
              className="w-full min-h-[200px] max-h-[300px] rounded-lg object-contain"
            />
          </View>
        )}

        <TouchableOpacity onPress={() => setCommentModal(true)}>
          <View className="flex gap-1 flex-row items-center pt-3">
            <FontAwesome5 name="comment" size={18} color="#4b5563" />
            <Text className="text-gray-600 font-pmedium text-[12px]">
              {replies.length}
            </Text>
          </View>
        </TouchableOpacity>

        {replies.length > 0 && (
          <TouchableOpacity onPress={() => setShowReples(!showReplies)}>
            <Text className="mt-2 text-gray-600 pb-2">Show replies</Text>
          </TouchableOpacity>
        )}
      </View>
      <ReactNativeModal
        isVisible={commentModal}
        onBackdropPress={() => setCommentModal(false)} // Close the modal when tapping outside
        onBackButtonPress={() => setCommentModal(false)} // Handle Android back button
        animationIn="slideInUp"
        animationOut="slideOutDown"
      >
        <View
          className={`w-full h-auto border-b-[1px]  bg-white ${
            item.id === 0 ? "border-t-[1px] border-gray-300" : ""
          }  rounded-lg border-gray-300 px-5 py-3 flex flex-col`}
        >
          <Text className="text-center font-pbold text-gray-600 text-[18px] pb-3">
            Reply
          </Text>
          <View className="justify-between w-full flex-row">
            <View className="flex  flex-row gap-2">
              <View className="flex flex-col items-center h-full">
                {item.user.profileImage ? (
                  <Image
                    source={{ uri: item.user.profileImage! }}
                    className="w-10 h-10 rounded-full border-[1px] border-[#6B7280]"
                  />
                ) : (
                  <Image
                    source={require("../assets/images/placeholder.png")}
                    className="w-10 h-10 rounded-full border-[1px] border-[#6B7280]"
                  />
                )}
              </View>

              <View className="flex flex-row">
                <Text className="text-gray-600 font-pbold text-[13px]">
                  {item.user.username}
                </Text>
                <Text className="text-gray-400 font-pbold text-[11px] pl-2 pt-0.5">
                  {formatDistanceToNowStrict(new Date(item.createdAt))}
                </Text>
              </View>
            </View>
          </View>
          <View className="pl-10 ml-2 -mt-4 pb-5" style={{ paddingTop: -10 }}>
            <Text className=" text-gray-600 font-pregular text-[12px]">
              {item.comment}
            </Text>

            {item.image !== null && (
              <View className=" pt-5">
                <Image
                  source={{ uri: item.image! }}
                  className="w-full min-h-[200px] max-h-[300px] rounded-lg object-contain"
                />
              </View>
            )}

            <Link href={`/comment/${item.id}`}>
              <View className="flex gap-1 flex-row items-center">
                <FontAwesome5 name="comment" size={18} color="#9ca3af" />
                <Text className="text-gray-400 font-pmedium text-[12px]">
                  12
                </Text>
              </View>
            </Link>
          </View>
          <View className="px-3 bg-[#f5f5f5] rounded-full h-[50px] flex-row items-center ">
            <TouchableOpacity
              className="w-auto h-auto text-center rounded-full  text-white"
              onPress={openPicker}
            >
              <Feather name="image" size={24} color="#1da1f2" />
            </TouchableOpacity>
            <TextInput
              className="flex-1 font-pmeduim  text-black text-[15px] h-[70px] w-full px-2"
              placeholder="Enter Reply"
              value={form.reply}
              onChangeText={(e) => setForm({ ...form, reply: e })}
            />
            <TouchableOpacity
              className="w-auto h-auto text-center  bg-blue rounded-full p-2 px-4 text-white"
              onPress={createReply}
            >
              <Ionicons name="send" size={24} color="white" />
            </TouchableOpacity>
          </View>
        </View>
      </ReactNativeModal>
      {showReplies && (
        <View>
          {replies.map((item: any[]) => (
            <ReplyCard item={item} />
          ))}
        </View>
      )}
    </View>
  );
};

export default CommentCard;
