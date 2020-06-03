import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import LoginButton from "./LoginButton";
import ExitButton from "./ExitButton";
import { signInAsync, getCachedAuthAsync, getUserInfo } from "./AppAuth";
import Constants from 'expo-constants';

const LoginComponent = ({ navigation }) => {
  let [authState, setAuthState] = useState(null);

  useEffect(() => {
    (async () => {
      let cachedAuth = await getCachedAuthAsync();
      if (cachedAuth && !authState) {
        const userInfo = await getUserInfo(cachedAuth);
        navigation.navigate("Lobby", {
          title: `Bienvenido ${userInfo.name}`,
          userInfo: userInfo,
        });
        setAuthState(cachedAuth);
      }
    })();
  }, []);

  const googleConnect = async () => {
    let userInfo
    if(Constants.deviceName != "Chrome"){
      const authState = await signInAsync();
      userInfo = await getUserInfo(authState);
      setAuthState(authState);
    }else{
      userInfo = "";
    }
    
    navigation.navigate("Lobby", {
      userInfo: userInfo,
    });
  };

  return (
    <View style={styles.ButtonContainer}>
      <LoginButton signIn={() => googleConnect()} />
      <ExitButton />
    </View>
  );
};

export default LoginComponent;

const styles = StyleSheet.create({
  ButtonContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
  },
});
