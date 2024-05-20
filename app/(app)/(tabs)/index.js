import {
  StyleSheet,
  useColorScheme,
  View,
  FlatList,
  ScrollView,
  Pressable,
  Text,
  Platform,
  StatusBar,
  Modal,
  SafeAreaView,
} from "react-native";
import { Link, Stack, router } from "expo-router";
import { useEffect, useContext, useState } from "react";
import MainHeader from "../components/mainHeader";
import { UserContext } from "../context/useContext";
import { useRouter } from "expo-router";
// import { themes } from "../constants/Colors";
import { DarkTheme, DefaultTheme } from "@react-navigation/native";
import EventsList from "../components/eventlist";
import Spin from "../components/activityIndicatior";

export default function HomeScreen() {
  const colorScheme = useColorScheme();
  const router = useRouter();
  const { user, loggedin, loading, setLoading, events } =
    useContext(UserContext);

  const styles = StyleSheet.create({
    container: {
      width: "100%",
      flex: 1,
      alignItems: "stretch",
      justifyContent: "center",
      backgroundColor:
        colorScheme === "light"
          ? DefaultTheme.colors.background
          : DarkTheme.colors.background,
      marginTop: StatusBar.currentHeight,
    },
    textcontainer: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor:
        colorScheme === "light"
          ? DefaultTheme.colors.background
          : DarkTheme.colors.background,
      marginTop: StatusBar.currentHeight,
    },
    text: {
      color:
        colorScheme === "light"
          ? DefaultTheme.colors.text
          : DarkTheme.colors.text,
      fontWeight: "bold",
    },
  });

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: false,
          header: () => <MainHeader />,
        }}
      />

      {/* <ScrollView> */}
      {events.length > 0 ? (
        <>
          <View style={styles.container}>
            <EventsList />
          </View>
        </>
      ) : (
        <>
          <View style={styles.textcontainer}>
            <Text style={styles.text}>No items</Text>
          </View>
        </>
      )}
      {/* </ScrollView> */}
    </>
  );
}
