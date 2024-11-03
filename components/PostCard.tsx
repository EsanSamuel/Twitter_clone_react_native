import { View, Text, TouchableOpacity } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import Feather from "@expo/vector-icons/Feather";
import { FontAwesome5 } from "@expo/vector-icons";
import { Link, router } from "expo-router";
import { Image } from "react-native";
import Entypo from "@expo/vector-icons/Entypo";
import { useAuth } from "@clerk/clerk-expo";
import { format, formatDistanceToNowStrict } from "date-fns";
import axios from "axios";
import ReactNativeModal from "react-native-modal";
import Octicons from "@expo/vector-icons/Octicons";
import FormField from "./FormField";
import { UserContext } from "@/context/UserProvider";

interface PostProps {
  item: Record<string, any>;
}

const PostCard = ({ item }: PostProps) => {
  const { userId } = useAuth();
  const [comments, setComments] = useState<any>([]);
  const [modal, setModal] = useState<boolean>(false);
  const [editModal, setEditModal] = useState<boolean>(false);
  const [form, setForm] = useState({
    content: item.content,
  });
  const { user } = useContext(UserContext);
  const routetoProfile = () => {
    if (item.user.clerkId === userId) {
      router.push("/profile");
    } else {
      return router.push(`/user-profile/${item.user.clerkId}`);
    }
  };
  useEffect(() => {
    const getComments = async () => {
      const response = await axios.get(
        `http://192.168.43.200:3000/comment/${item.id}`
      );
      setComments(response.data);
    };
    getComments();
  }, [item.id]);

  const editPost = () => {
    axios.patch(`http://192.168.43.200:3000/post/${item.id}`, {
      content: form.content,
    });
  };

  const handleDelete = () => {
    axios.delete(`http://192.168.43.200:3000/post/${item.id}`);
  };

  const handleLike = () => {
    try {
      axios.post("http://192.168.43.200:3000/like", {
        userId: user.id,
        postId: item.id,
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <View
      className={`w-full h-auto border-t-[1px] ${
        item.id === 0 ? "border-t-[1px] border-gray-300" : ""
      }  rounded-lg border-gray-200 px-3 py-3 flex flex-col`}
    >
      <View className="justify-between w-full flex-row">
        <View className="flex  flex-row gap-2">
          <TouchableOpacity
            className="flex flex-col items-center h-full"
            onPress={routetoProfile}
          >
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
          </TouchableOpacity>

          <View className="flex flex-row">
            <Text className="text-gray-600 font-pbold text-[13px]">
              {item.user.username}
            </Text>

            <Text className="text-gray-400 font-pmedium text-[11px] pl-2 pt-0.5">
              {formatDistanceToNowStrict(new Date(item.createdAt))}
            </Text>
          </View>
        </View>
        <TouchableOpacity onPress={() => setModal(true)}>
          <Entypo name="dots-three-vertical" size={12} color="#9ca3af" />
        </TouchableOpacity>
      </View>
      <View className="pl-10 ml-2 -mt-4" style={{ paddingTop: -10 }}>
        <Text className=" text-gray-600 font-pmedium text-[12px]">
          {item.content}
        </Text>
        {item.tag !== "" && (
          <Text className="text-[12px] text-blue font-psemibold">
            {item.tag}
          </Text>
        )}

        {item.image !== null && item.image !== "" && (
          <View className=" pt-5">
            <Image
              source={{ uri: item.image! }}
              className="w-full min-h-[200px] max-h-[500px] rounded-lg object-contain"
            />
          </View>
        )}

        <View className="flex gap-4 pt-2 flex-row">
          <TouchableOpacity
            className="flex gap-1 flex-row items-center"
            onPress={handleLike}
          >
            <Feather name="heart" size={18} color="#6b7280" />
            <Text className="text-gray-500 font-pmedium text-[12px]">120</Text>
          </TouchableOpacity>

          <Link href={`/comment/${item.id}`}>
            <View className="flex gap-1 flex-row items-center">
              <FontAwesome5 name="comment" size={18} color="#6b7280" />
              <Text className="text-gray-500 font-pmedium text-[12px]">
                {comments.length}
              </Text>
            </View>
          </Link>
        </View>
      </View>
      <ReactNativeModal
        isVisible={modal}
        onBackdropPress={() => setModal(false)} // Close the modal when tapping outside
        onBackButtonPress={() => setModal(false)} // Handle Android back button
        animationIn="slideInUp"
        animationOut="slideOutDown"
        onSwipeComplete={() => setModal(false)}
        swipeDirection="down"
        style={{
          justifyContent: "flex-end",
          margin: 0,
        }}
        className=""
      >
        <View className="bg-white rounded-t-2xl p-5">
          <View className="items-center -mt-5">
            <Octicons name="dash" size={50} color="#4b5563" />
          </View>
          <View className="flex-col gap-3">
            <TouchableOpacity className="bg-[#f5f5f5] py-3 px-3 rounded-lg">
              <Text className="font-pregular text-gray-600 text-start">
                Save
              </Text>
            </TouchableOpacity>
            {item.user.clerkId === userId && (
              <TouchableOpacity
                className="bg-[#f5f5f5] py-3 rounded-lg"
                onPress={() => setEditModal(true)}
              >
                <Text className="font-pregular px-3 text-gray-600 text-start">
                  Edit
                </Text>
              </TouchableOpacity>
            )}
            {item.user.clerkId === userId && (
              <TouchableOpacity
                className="bg-[#f5f5f5] py-3 rounded-lg"
                onPress={handleDelete}
              >
                <Text className="font-pregular px-3 text-[#FF4C4C] text-start">
                  Delete
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </ReactNativeModal>

      <ReactNativeModal
        isVisible={editModal}
        onBackdropPress={() => setEditModal(false)} // Close the modal when tapping outside
        onBackButtonPress={() => setEditModal(false)} // Handle Android back button
        animationIn="slideInUp"
        animationOut="slideOutDown"
      >
        <View className="bg-white px-7 py-5 rounded-2xl">
          <Text className="text-center text-gray-600 font-pbold text-[18px]">
            Edit
          </Text>
          <FormField
            title="Edit Post"
            otherStyles="mt-5"
            value={form.content}
            handleChangeText={(e) => setForm({ ...form, content: e })}
          />
          <TouchableOpacity
            className="w-full text-center  bg-blue rounded-full p-3 text-white mt-5"
            activeOpacity={0.7}
            onPress={editPost}
          >
            <Text className="text-white text-center font-psemibold">Edit</Text>
          </TouchableOpacity>
        </View>
      </ReactNativeModal>
    </View>
  );
};

export default PostCard;
