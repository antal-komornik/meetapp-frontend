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
import axios from "axios";
import { baseUrl } from "../context/useContext";

const UsersEvents = () => {
  const colorScheme = useColorScheme();
  const {
    loggedin,
    user,
    userdata,
    getUserInfo,
    setLoading,
    removeEvent,
    loading,
    getEvents,
    events,
  } = useContext(UserContext);
  const [ownevents, setOwnEvents] = useState([]);

  const fetchEvents = async () => {
    if (userdata && userdata.events) {
      let data = [];
      const promises = userdata.events.map((element) =>
        axios
          .get(element)
          .then((response) => {
            data.push(response.data);
          })
          .catch((error) => {
            console.error(
              `An error occurred while retrieving data from the following URL: ${element}`,
              error
            );
            return null;
          })
      );

      await Promise.all(promises);
      setOwnEvents([...data]);
    }
  };

  const loadEvents = async () => {
    // setLoading(true);
    await fetchEvents();
    // setLoading(false);
  };

  useEffect(() => {
    loadEvents();
  }, [userdata]);

  const deleteEvent = async (id) => {
    await removeEvent(id);
    await fetchEvents();
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      width: "100%",
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
  });

  const Item = ({ title, starting_time, max_participants, id }) => (
    <View style={styles.listItemContainer}>
      <Text style={styles.listItemHeader}>Title: {title}</Text>
      <Text style={styles.listItemSubText}>Starting date: {starting_time}</Text>
      <Text style={styles.listItemSubText}>
        {max_participants} free space available
      </Text>
      <View style={{ gap: 20 }}>
        <Button title="Delete" onPress={() => deleteEvent(id)} />
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {ownevents.length > 0 ? (
        <FlatList
          data={ownevents}
          style={styles.flatlistcontainer}
          renderItem={({ item }) => (
            <Item
              title={item.title}
              starting_time={item.starting_time}
              max_participants={
                item.max_participants - item.event_registration.length
              }
              id={item.id}
            />
          )}
          keyExtractor={(item) => item.id.toString()}
        />
      ) : (
        <View style={{ flex: 1, alignItems: "center", paddingTop: 140 }}>
          <Text style={styles.text}>You do not have any programs</Text>
        </View>
      )}
    </View>
  );
};

export default UsersEvents;
