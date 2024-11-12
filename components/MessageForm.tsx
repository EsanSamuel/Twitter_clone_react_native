import { View, Text, TouchableOpacity } from "react-native";
import React, { useContext, useState } from "react";
import { TextInput } from "react-native";
import { Feather, Ionicons } from "@expo/vector-icons";
import axios from "axios";
import { UserContext } from "@/context/UserProvider";

interface IRoom {
  room: any;
}

const MessageForm = ({ room }: IRoom) => {
  const { user } = useContext(UserContext);
  const [message, setMessage] = useState<string>("");
  const handleMessage = async () => {
    try {
      await axios.post(`http://192.168.43.199:3000/message`, {
        message,
        roomId: room.id,
        userId: user.id,
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <View className="absolute bottom-2 left-0 right-0 items-center px-3">
      <View className="flex-row items-center bg-gray-1s00 rounded-full px-4 py-2 w-full max-w-md shadow-md">
        <TouchableOpacity>
          <Feather name="image" size={24} color="#1da1f2" />
        </TouchableOpacity>
        <TextInput
          className="flex-1 px-3 py-1 text-black text-base font-psemibold"
          placeholder="Type a message..."
          placeholderTextColor="#555"
          onChangeText={(e) => setMessage(e)}
        />
        <TouchableOpacity
          className="bg-blue rounded-full p-2 ml-2"
          onPress={handleMessage}
        >
          <Ionicons name="send" size={20} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default MessageForm;
