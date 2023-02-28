import {
  View,
  Text,
  StyleSheet,
  TextInputComponent,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { auth, signOut } from "../firebase-config";
import { Button, Card } from "@rneui/themed";
import { useNavigation } from "@react-navigation/native";
import { responsiveWidth } from "react-native-responsive-dimensions";

export default function Home() {
  const navigation = useNavigation();

  const handleLogout = async () => {
    await auth
      .signOut()
      .then(() => {
        Alert.alert("Sucess", "Loggoed Out");
        navigation.goBack();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <View style={styles.container}>
      <Card containerStyle={{ width: responsiveWidth(80) }}>
        <Card.Title>Welcome 🖐</Card.Title>
        <Card.Divider />
        <Text style={{ marginBottom: 10 }}>
          Hello,<Card.Title> {auth.currentUser.email} </Card.Title>
        </Text>

        <Button
          onPress={handleLogout}
          buttonStyle={{
            borderRadius: 0,
            marginLeft: 0,
            marginRight: 0,
            marginBottom: 0,
            alignSelf: "center",
            width: "40%",
            borderRadius: 10,
          }}
          title="LogOut"
        />
      </Card>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  textColor: {
    color: "#A9A9A9",
    fontSize: 18,
    fontWeight: "bold",
  },
});
