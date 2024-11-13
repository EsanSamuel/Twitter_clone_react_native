import { View, Text, TouchableOpacity } from "react-native";
import React, { useContext, useState } from "react";
import { TextInput } from "react-native";
import { Feather, Ionicons } from "@expo/vector-icons";
import axios from "axios";
import { UserContext } from "@/context/UserProvider";
import { DocumentPickerResult } from "expo-document-picker";
import * as DocumentPicker from "expo-document-picker";
import { Image } from "react-native";
import * as FileSystem from "expo-file-system";
import { Alert } from "react-native";

interface IRoom {
  room: any;
}

const MessageForm = ({ room }: IRoom) => {
  const { user } = useContext(UserContext);
  const [message, setMessage] = useState<string>("");
  const [image, setImage] = useState(null);
  const handleMessage = async () => {
    let base64Image;
    if (image) {
      try {
        base64Image = await FileSystem.readAsStringAsync(image.uri, {
          encoding: FileSystem.EncodingType.Base64,
        });
        base64Image = `data:image/jpeg;base64,${base64Image}`;
      } catch (error) {
        console.error("Error converting image to base64:", error);
        Alert.alert("Error", "Failed to convert image.");
        return;
      }
    }
    try {
      const response = await axios.post(`http://192.168.43.199:3000/message`, {
        message,
        image: base64Image,
        roomId: room.id,
        userId: user.id,
      });

      setMessage("");
      setImage(null);
    } catch (error) {
      console.log(error);
    } finally {
      setMessage("");
    }
  };

  const openPicker = async () => {
    const result: DocumentPickerResult = await DocumentPicker.getDocumentAsync({
      type: "image/*",
    });

    if (!result.canceled) {
      setImage(result.assets[0]);
    }
  };
  return (
    <View className="absolute bottom-0 left-0 right-0 items-center px-3 pb-2 bg-white">
      <View className="flex-row items-center bg-gray-1s00 rounded-full px-4 py-2 w-full max-w-md shadow-md">
        <TouchableOpacity onPress={openPicker}>
          <Feather name="image" size={24} color="#1da1f2" />
        </TouchableOpacity>
        <TextInput
          className="flex-1 px-3 py-1 text-black text-base"
          placeholder="Type a message..."
          placeholderTextColor="#555"
          onChangeText={(e) => setMessage(e)}
          value={message}
        />
        <TouchableOpacity
          className="bg-blue rounded-full p-2 ml-2"
          onPress={handleMessage}
        >
          <Ionicons name="send" size={20} color="white" />
        </TouchableOpacity>
      </View>

      {image && (
        <Image
          source={{ uri: image.uri }}
          className="w-[100px] h-[70px] rounded-lg"
          style={{
            position: "absolute",
            bottom: 70,
            left: 10,
          }}
        />
      )}
    </View>
  );
};

export default MessageForm;
