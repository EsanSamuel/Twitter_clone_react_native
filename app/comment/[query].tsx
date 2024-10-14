import { View, Text } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";

const Comment = () => {
  const { query } = useLocalSearchParams();
  return (
    <View className="items-center justify-center h-full">
      <Text>{query}</Text>
    </View>
  );
};

export default Comment;
