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

const UserRegistration = () => {
  const colorScheme = useColorScheme();
  const {
    loggedin,
    user,
    userdata,
    getUserInfo,
    setLoading,
    removeEvent,
    loading,
    removeApply,
    getEvents,
  } = useContext(UserContext);
  const [registrations, setRegistrations] = useState([]);
  const [events, setEvents] = useState([]);

  const fetchRegisters = () => {
    let registerurls = [];
    if (userdata && userdata.url) {
      const promises = axios
        .get(`${baseUrl}/eventsregister/`)
        .then((response) => {
          const data = Object.values(Object.entries(response.data.results));
          data.forEach((element) => {
            if (userdata.url == element[1].user) {
              let subdata = {};
              subdata.eventurl = element[1].event;
              subdata.regid = element[1].id;
              subdata.url = element[1].url;
              registerurls.push(subdata);
            }
          });
          // console.log(registerurls);
          setRegistrations(registerurls);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const fetchEvents = () => {
    let event = [];
    if (registrations.length > 0) {
      registrations.map((element) => {
        axios
          .get(element.eventurl)
          .then((response) => {
            response.data.regid = element.regid;
            event.push(response.data);
            // console.log(event);
            setEvents([...event]);
          })
          .catch((error) => {
            console.log(error);
          });
      });
    } else {
      setEvents([]);
    }
  };

  useEffect(() => {
    fetchRegisters();
  }, [userdata]);

  useEffect(() => {
    fetchEvents();
  }, [registrations]);

  const onSubmit = (eventid) => {
    const data = {
      event_id: eventid,
      user_id: userdata.id,
    };
    removeApply(data).then(() => {
      fetchRegisters();
      fetchEvents;
      getEvents();
    });
  };

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
    flatlistcontainer: {
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
    header: {
      fontSize: 22,
      fontWeight: "bold",
      marginBottom: 10,
      color:
        colorScheme === "light"
          ? DefaultTheme.colors.text
          : DarkTheme.colors.text,
    },
    text: {
      color:
        colorScheme === "light"
          ? DefaultTheme.colors.text
          : DarkTheme.colors.text,
    },
  });

  return (
    <View style={{ flex: 1 }}>
      {registrations.length > 0 ? (
        <>
          <FlatList
            data={events}
            style={(styles.flatlistcontainer, { gap: 40 })}
            renderItem={({ item }) => (
              <View style={styles.container}>
                <Link
                  href={{
                    pathname: "../(event)/[slug]",
                    params: { slug: item.id },
                  }}
                  asChild
                >
                  <Text style={styles.header}>{item.title}</Text>
                  {/* <Text style={styles.header}>{item.id}</Text> */}
                </Link>
                <View style={{ width: "100%" }}>
                  <Button
                    title={"Delete registration"}
                    onPress={() => onSubmit(item.id)}
                  />
                </View>

                <View>
                  <Text>You havent registration</Text>
                </View>
              </View>
            )}
            keyExtractor={(item) => item.id}
          />
        </>
      ) : (
        <>
          <View style={{ flex: 1, alignItems: "center", paddingTop: 140 }}>
            <Text style={styles.text}>You do not have any registrauio</Text>
          </View>
        </>
      )}
    </View>
  );
};

export default UserRegistration;
