import { View, Text, TouchableOpacity } from "react-native";
import React from "react";

const Button = () => {
  return (
    <TouchableOpacity 
    activeOpacity={0.7}
    className=" w-full rounded-xl min-h-[62px] flex flex-row justify-center items-center bg-white fixed bottom-3">
      <Text className="text-center text-[#1DA1F2] ">
        Get Started!
      </Text>
    </TouchableOpacity>
  );
};

export default Button;
