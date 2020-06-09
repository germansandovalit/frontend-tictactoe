import React, {useEffect, useState} from "react";
import { View, StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import FirstRank from "./firstRank";
import SocketContext from '../../socket-context'


const LobbyComponent = ({ navigation }) => {
  const socket = React.useContext(SocketContext);

  const buscarPartida = ()=>{
    socket.emit('findMatch');
    socket.on("matchFound", (playToken) => {
      navigation.navigate("Game", {
        playToken: playToken
      });
    });
  }

  return (
    <View>
      <FirstRank navigation={navigation} />
      <Button
        style={{ marginTop: "3%" }}
        mode="contained"
        onPress={() => buscarPartida()}
      >
        buscar partida
      </Button>
    </View>

  );
};





export default LobbyComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
