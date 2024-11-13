import { UserContext } from "@/context/UserProvider";
import React, { useContext } from "react";
import { View, Text, Image } from "react-native";

interface IMessageProps {
  data: any;
}

const MessageBubble = ({ data }: IMessageProps) => {
  const { user } = useContext(UserContext);
  const isUserMessage = data?.sender?.id && user?.id && data.sender.id === user.id;

  return (
    <View
      className={`flex-row px-2 ${isUserMessage ? "justify-end" : "justify-start"} mb-2`}
    >
      {/* Profile Image of Sender */}
      {!isUserMessage && (
        <Image
          source={{ uri: data.sender?.profileImage }}
          className="w-5 h-5 rounded-full mr-2"
        />
      )}

      {/* Message Bubble */}
      <View
        className={`${
          isUserMessage ? "bg-blue" : "bg-gray-200"
        } ${isUserMessage ? "text-white" : "text-black"} ${
          !data.image ? "rounded-full min-w-[70px] px-3 py-2" : "rounded-lg p-2"
        } max-w-[80%]`}
      >
        {data.image && (
          <Image
            source={{ uri: data.image }}
            className="w-[200px] h-[300px] rounded-lg mb-1"
          />
        )}
        {data.message && (
          <Text
            className={`text-sm font-pmedium text-[11px] ${
              isUserMessage ? "text-white" : "text-black"
            }`}
          >
            {data.message}
          </Text>
        )}
      </View>

      {/* Profile Image of Logged-in User */}
      {isUserMessage && (
        <Image
          source={{ uri: user?.profileImage }}
          className="w-5 h-5 rounded-full ml-2"
        />
      )}
    </View>
  );
};

export default MessageBubble;
