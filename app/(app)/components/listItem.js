import {
  useColorScheme,
  StyleSheet,
  View,
  Text,
  Pressable,
  Button,
} from "react-native";
import axios from "axios";
import { DarkTheme, DefaultTheme } from "@react-navigation/native";
import { useEffect, useContext, useState } from "react";
import { UserContext } from "../context/useContext";
import { Link } from "expo-router";

const ListItem = ({ title, location, starting_time, max_participants, id }) => {
  const colorScheme = useColorScheme();
  const { user, loggedin, loading, userdata, setLoading } =
    useContext(UserContext);

  const styles = StyleSheet.create({
    container: {
      width: "100%",
      flex: 1,
      alignItems: "center",

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
    header: {
      fontSize: 22,
      fontWeight: "bold",
      marginBottom: 10,
      color:
        colorScheme === "light"
          ? DefaultTheme.colors.text
          : DarkTheme.colors.text,
    },
    subText: {
      fontSize: 16,
      color:
        colorScheme === "light"
          ? DefaultTheme.colors.text
          : DarkTheme.colors.text,
      marginBottom: 10,
    },

    button: {
      width: "100%",
      flex: 1,
      backgroundColor:
        colorScheme === "light"
          ? DefaultTheme.colors.primary
          : DarkTheme.colors.primary,
      // padding: 10,
      borderRadius: 5,
    },
    buttonText: {
      fontWeight: "bold",
      textAlign: "center",
      color:
        colorScheme === "light"
          ? DefaultTheme.colors.text
          : DarkTheme.colors.text,
    },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{title}</Text>
      <Text style={styles.subText}>
        {max_participants} free space available
      </Text>
      <Text style={styles.subText}>Location: {location}</Text>
      <Text style={styles.subText}>Starting date: {starting_time}</Text>

      {loggedin ? (
        <>
          <View style={{ width: "100%" }}>
            <Link
              href={{
                pathname: "../(event)/[slug]",
                params: { slug: id },
              }}
              asChild
            >
              <View style={styles.button}>
                <Text style={styles.buttonText}>More</Text>
              </View>
            </Link>
          </View>
        </>
      ) : (
        <Link
          href={{
            pathname: "../(tabs)/profile",
            params: { slug: id },
          }}
          asChild
        >
          <Text
            style={
              (styles.subText,
              {
                fontWeight: "bold",
                color:
                  colorScheme === "light"
                    ? DefaultTheme.colors.text
                    : DarkTheme.colors.text,
              })
            }
          >
            Log in to apply or save to wishlist
          </Text>
        </Link>
      )}
    </View>
  );
};

export default ListItem;
