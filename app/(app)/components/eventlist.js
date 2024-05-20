import React, { useState, useEffect } from "react";
import { useColorScheme, StyleSheet, View, FlatList, Text } from "react-native";
import axios from "axios";
import { DarkTheme, DefaultTheme } from "@react-navigation/native";
import ListItem from "./listItem";
import { UserContext } from "../context/useContext";
import { useContext } from "react";
import Spin from "../components/activityIndicatior";
import { baseUrl } from "../context/useContext";

const EventsList = () => {
  const colorScheme = useColorScheme();
  const {
    user,
    loggedin,
    loading,
    setLoading,
    events,
    setEvents,
    userdata,
    getUserInfo,
    getEvents,
  } = useContext(UserContext);

  const fetchEvents = async () => {
    setLoading(true);
    const response = await axios
      .get(`${baseUrl}/events/`)
      .then((response) => {
        setEvents(response.data.results);
      })
      .catch((error) => console.log(error));
    setLoading(false);
  };

  useEffect(() => {
    // fetchEvents();
    getEvents();
  }, [userdata]);

  const Item = ({ title, location, starting_time, max_participants, id }) => (
    <View style={styles.container}>
      <ListItem
        title={title}
        location={location}
        starting_time={starting_time}
        max_participants={max_participants}
        id={id}
      />
    </View>
  );

  const styles = StyleSheet.create({
    container: {
      width: "100%",
      flex: 1,
      // paddingVertical: 20,
      // marginVertical: 10,
      // marginHorizontal: 16,
      borderRadius: 5,
      // elevation: 1,
      backgroundColor:
        colorScheme === "light"
          ? DefaultTheme.colors.background
          : DarkTheme.colors.background,
    },
  });

  return (
    <>
      {loading ? (
        <Spin />
      ) : (
        <>
          <FlatList
            data={events}
            style={(styles.container, { gap: 40 })}
            renderItem={({ item }) => (
              <Item
                title={item.title}
                location={item.location}
                starting_time={item.starting_time}
                max_participants={
                  item.max_participants - item.event_registration.length
                }
                id={item.id}
              />
            )}
            keyExtractor={(item) => item.id}
            // onRefresh={() => console.log("refreshing")}
          />
        </>
      )}
    </>
  );
};

export default EventsList;
