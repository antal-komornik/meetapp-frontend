// import { StatusBar } from "expo-status-bar";
import { Stack } from "expo-router";
import {
  StyleSheet,
  Text,
  SafeAreaView,
  ScrollView,
  Pressable,
  Button,
  View,
  StatusBar,
  useColorScheme,
  FlatList,
} from "react-native";
import { DarkTheme, DefaultTheme } from "@react-navigation/native";
import { UserContext } from "../context/useContext";
import { Link } from "expo-router";
import React, { useEffect, useState, useContext } from "react";
import axios, { all } from "axios";
import Spin from "../components/activityIndicatior";
import UserRegistration from "../components/userRegistered";
import UsersEvents from "../components/usersEvents";
import UserWishlist from "../components/userWishlist";

export default function SettingsScreen() {
  const colorScheme = useColorScheme();
  const {
    loggedin,
    user,
    userdata,
    getUserInfo,
    setLoading,
    removeEvent,
    loading,
  } = useContext(UserContext);
  const [activTab, setActivTab] = useState("event");
  const [isActiveEvent, setIsActiveEvent] = useState(false);
  const [isActiveWish, setIsActiveWish] = useState(false);
  const [isActiveRegist, setIsActiveRegist] = useState(false);

  const RenderItem = () => {
    switch (activTab) {
      case "registration":
        return <UserRegistration />;
      case "wishlist":
        return <UserWishlist />;
      case "event":
        return <UsersEvents />;
      default:
        return <UsersEvents />;
    }
  };

  useEffect(() => {
    // console.log(activTab);
  }, [activTab]);

  const styles = StyleSheet.create({
    container: {
      width: "100%",
      // flex: 1,
      backgroundColor:
        colorScheme === "light"
          ? DefaultTheme.colors.background
          : DarkTheme.colors.background,
      alignItems: "center",
      justifyContent: "flex-start",
      marginTop: StatusBar.currentHeight,
    },
    flatlistcontainer: {
      width: "100%",
      padding: 20,
      marginVertical: 10,
      marginHorizontal: 16,
      borderRadius: 5,
      elevation: 1,
      backgroundColor:
        colorScheme === "light"
          ? DefaultTheme.colors.background
          : DarkTheme.colors.background,
    },
    text: {
      color:
        colorScheme === "light"
          ? DefaultTheme.colors.text
          : DarkTheme.colors.text,
    },
    activeColor: {
      color: DefaultTheme.colors.primary,
    },
    header: {
      width: "90%",
      marginTop: 20,
      marginBottom: 20,
      paddingTop: 5,
      paddingBottom: 5,
      borderColor:
        colorScheme === "light"
          ? DefaultTheme.colors.border
          : DarkTheme.colors.border,
      borderStyle: "solid",
      borderWidth: 2,
      alignItems: "center",
    },
    headerText: {
      fontSize: 24,
      fontWeight: "bold",
      color:
        colorScheme === "light"
          ? DefaultTheme.colors.text
          : DarkTheme.colors.text,
    },
    listItemContainer: {
      width: "100%",
      flex: 1,
      padding: 20,
      marginTop: 30,
      backgroundColor:
        colorScheme === "light"
          ? DefaultTheme.colors.background
          : DarkTheme.colors.background,
      borderColor:
        colorScheme === "light"
          ? DefaultTheme.colors.border
          : DarkTheme.colors.border,
      borderWidth: 3,
      borderStyle: "solid",
      shadowColor:
        colorScheme === "light"
          ? DefaultTheme.colors.border
          : DarkTheme.colors.border,
      shadowOpacity: 0.9,
      shadowRadius: 6,
    },
    listItemHeader: {
      fontSize: 22,
      fontWeight: "bold",
      marginBottom: 10,
      color:
        colorScheme === "light"
          ? DefaultTheme.colors.text
          : DarkTheme.colors.text,
    },
    listItemSubText: {
      fontSize: 16,
      color:
        colorScheme === "light"
          ? DefaultTheme.colors.text
          : DarkTheme.colors.text,
      marginBottom: 10,
    },
    listItemButton: {
      backgroundColor:
        colorScheme === "light"
          ? DefaultTheme.colors.primary
          : DarkTheme.colors.primary,
      padding: 10,
      borderRadius: 5,
    },
    listItemButtonText: {
      fontWeight: "bold",
      textAlign: "center",
      color:
        colorScheme === "light"
          ? DefaultTheme.colors.text
          : DarkTheme.colors.text,
    },
    separatedBtn: {
      borderColor:
        colorScheme === "light"
          ? DefaultTheme.colors.border
          : DarkTheme.colors.border,
      borderWidth: 2,
      borderStyle: "solid",
    },
  });

  return (
    <>
      <Stack.Screen options={{ headerShown: false, title: "Settings" }} />

      {loading ? (
        <Spin />
      ) : (
        <>
          <View style={styles.container}>
            <View style={styles.header}>
              <Text style={styles.headerText}>Settings</Text>
            </View>
          </View>
          {loggedin ? (
            <>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  margin: 10,
                  gap: 32,
                }}
              >
                <Pressable
                  style={styles.separatedBtn}
                  onPress={() => {
                    setActivTab("registration");
                    setIsActiveRegist(!isActiveRegist);
                    setIsActiveEvent(false);
                    setIsActiveWish(false);
                  }}
                >
                  <Text
                    style={[
                      styles.text,
                      isActiveRegist ? styles.activeColor : styles.text,
                    ]}
                  >
                    Registrations
                  </Text>
                </Pressable>
                <Pressable
                  style={styles.separatedBtn}
                  onPress={() => {
                    setActivTab("event");
                    setIsActiveEvent(!isActiveEvent);
                    setIsActiveRegist(false);
                    setIsActiveWish(false);
                  }}
                >
                  <Text
                    s
                    style={[
                      styles.text,
                      isActiveEvent ? styles.activeColor : styles.text,
                    ]}
                  >
                    Events
                  </Text>
                </Pressable>
                <Pressable
                  style={styles.separatedBtn}
                  onPress={() => {
                    setActivTab("wishlist");
                    setIsActiveWish(!isActiveWish);
                    setIsActiveEvent(false);
                    setIsActiveRegist(false);
                  }}
                >
                  <Text
                    style={[
                      styles.text,
                      isActiveWish ? styles.activeColor : styles.text,
                    ]}
                  >
                    Wish
                  </Text>
                </Pressable>
              </View>
              <RenderItem />
            </>
          ) : (
            <View style={{ alignItems: "center", marginTop: 60 }}>
              <Text style={styles.headerText}>Log in to continue</Text>
            </View>
          )}

          {/* <StatusBar style="auto" /> */}
        </>
      )}
    </>
  );
}
