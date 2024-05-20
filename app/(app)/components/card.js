import React from "react";
import {
  ScrollView,
  View,
  Text,
  Image,
  StyleSheet,
  Button,
  Pressable,
  useColorScheme,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import axios from "axios";
import { useState } from "react";
import { DarkTheme, DefaultTheme } from "@react-navigation/native";
import { VStack, Box, Divider } from "native-base";

const Card = ({ event, image, owner, timesince }) => {
  const colorScheme = useColorScheme();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor:
        colorScheme === "light"
          ? DefaultTheme.colors.background
          : DarkTheme.colors.background,
    },
    image: {
      width: "100%",
      height: 200,
    },
    title: {
      fontSize: 24,
      fontWeight: "bold",
      marginVertical: 10,
      textAlign: "center",
      color:
        colorScheme === "light"
          ? DefaultTheme.colors.text
          : DarkTheme.colors.text,
    },
    spots: {
      fontSize: 16,
      color:
        colorScheme === "light"
          ? DefaultTheme.colors.text
          : DarkTheme.colors.text,
      // textAlign: "center",
      padding: 10,
      marginTop: 5,
    },

    button: {
      backgroundColor:
        colorScheme === "light"
          ? DefaultTheme.colors.primary
          : DarkTheme.colors.primary,
      padding: 10,
      margin: 20,
      alignItems: "center",
      borderRadius: 5,
      marginTop: 5,
    },
    buttonText: {
      color:
        colorScheme === "light"
          ? DarkTheme.colors.text
          : DefaultTheme.colors.text,
      fontSize: 18,
      fontWeight: "bold",
      marginTop: 5,
    },
  });

  return (
    <View style={styles.container}>
      {event ? (
        <>
          {/* <Pressable style={styles.button} onPress={() => console.log("press")}>
      <Text style={styles.buttonText}>Appy</Text>
    </Pressable> */}
        </>
      ) : null}
    </View>
  );
};

export default Card;
