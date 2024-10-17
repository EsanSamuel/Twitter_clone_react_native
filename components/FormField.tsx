import { View, Text, TextInput } from "react-native";
import React from "react";

interface FormProps {
  title: string;
  otherStyles: string;
  value: string;
  handleChangeText: (value: any) => void;
}

const FormField = ({
  title,
  otherStyles,
  value,
  handleChangeText,
}: FormProps) => {
  return (
    <View className={`space-y-2 w-full ${otherStyles}`}>
      <Text className="font-pmedium text-xs text-gray-500">{title}</Text>
      <View className="rounded-full bg-[#E1E8ED] focus:border-blue h-[50px] w-full p-4">
        <TextInput
          className="flex-1 font-pmeduim  text-black text-[15px] h-[70px] w-full"
          value={value}
          onChangeText={handleChangeText}
          secureTextEntry={title === "Enter password"}
        />
      </View>
    </View>
  );
};

export default FormField;
