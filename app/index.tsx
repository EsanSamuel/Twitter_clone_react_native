import { View, Text, SafeAreaView, ScrollView } from "react-native";
import React from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
import Button from "@/components/Button";
import { Link, Redirect } from "expo-router";
import { useAuth, useUser } from "@clerk/clerk-expo";

const App = () => {
  const { isSignedIn } = useAuth();
  const { user } = useUser()

  if (user) {
    return <Redirect href={"/home"} />;
  }
  
  return (
    <SafeAreaView className="items-center justify-center  bg-[#1DA1F2] h-full text-pregular">
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View className="items-center justify-center h-full">
          <Link href="/sign-in">
            <AntDesign name="twitter" size={100} color="white" />
          </Link>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default App;
