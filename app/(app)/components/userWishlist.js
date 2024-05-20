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

const UserWishlist = () => {
  const colorScheme = useColorScheme();
  const {
    loggedin,
    user,
    userdata,
    getUserInfo,
    setLoading,
    removeEvent,
    loading,
    removeSave,
  } = useContext(UserContext);
  const [wishes, setWishes] = useState([]);
  const [events, setEvents] = useState([]);

  const fetchWishlist = () => {
    let wishurls = [];
    if (userdata && userdata.url) {
      axios
        .get(`${baseUrl}/wishlistlist/`)
        .then((response) => {
          const data = Object.values(Object.entries(response.data.results));
          data.forEach((element) => {
            if (userdata.url == element[1].user) {
              let subdata = {};
              subdata.eventurl = element[1].event;
              subdata.regid = element[1].id;
              subdata.url = element[1].url;
              wishurls.push(subdata);
            }
          });
          setWishes(wishurls);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const fetchEvents = () => {
    let event = [];
    if (wishes.length > 0) {
      wishes.forEach((element) => {
        axios
          .get(element.eventurl)
          .then((response) => {
            response.data.regid = element.regid;
            event.push(response.data);
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
    fetchWishlist();
  }, [userdata]);

  useEffect(() => {
    fetchEvents();
  }, [wishes]);

  const onSubmit = (eventid) => {
    const data = {
      event_id: eventid,
      user_id: userdata.id,
    };
    removeSave(data).then(() => {
      fetchWishlist();
      fetchEvents();
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
      borderRadius: 5,
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
        colorScheme == "light"
          ? DefaultTheme.colors.text
          : DarkTheme.colors.text,
    },
  });

  return (
    <View style={{ flex: 1 }}>
      {events.length > 0 ? (
        <FlatList
          data={events}
          style={styles.flatlistcontainer}
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
              </Link>
              <View style={{ width: "100%" }}>
                <Button
                  title={"Delete from wishlist"}
                  onPress={() => onSubmit(item.id)}
                />
              </View>
            </View>
          )}
          keyExtractor={(item) => item.id.toString()}
        />
      ) : (
        <View
          style={{
            flex: 1,
            alignItems: "center",
            paddingTop: 140,
          }}
        >
          <Text style={styles.text}>No item in your wishlist</Text>
        </View>
      )}
    </View>
  );
};

export default UserWishlist;
