import React, { useEffect, useState, useContext } from "react";
import {
  View,
  Text,
  Pressable,
  StatusBar,
  SafeAreaView,
  useColorScheme,
  ScrollView,
  StyleSheet,
  Image,
  Button,
} from "react-native";
import { Stack, useRouter, useLocalSearchParams, useParams } from "expo-router";
import axios from "axios";
import { DarkTheme, DefaultTheme } from "@react-navigation/native";
import { UserContext } from "../context/useContext";

const EventDetailScreen = () => {
  const colorScheme = useColorScheme();
  const router = useRouter();
  const { loggedin, logout, userdata, apply, save, getEvents } =
    useContext(UserContext);
  const { slug } = useLocalSearchParams();
  const [event, setEvent] = useState();
  const [owner, setOwner] = useState();
  const [image, setImage] = useState();
  const [created, setCreated] = useState();
  const [timesince, setTimeSince] = useState();
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [location, setLocation] = useState();
  const [maxParticipants, setMaxParticipants] = useState();
  const [registration, setRegistration] = useState();
  const [starting, setStarting] = useState();

  const fetchEvent = () => {
    axios
      .get(`https://api.komornikantal.hu/events/${slug}/`)
      .then((response) => {
        setEvent(response.data);
        setImage(response.data.image);
        setTitle(response.data.title);
        setDescription(response.data.description);
        setCreated(new Date(response.data.date));
        setLocation(response.data.location);
        setMaxParticipants(
          response.data.max_participants -
            response.data.event_registration.length
        );
        setStarting(response.data.starting_time);
        fetchUser(response.data);
      })
      .then((response) => {});
  };

  const differentDate = () => {
    const now = new Date();
    const difference = now - created;
    const diffirenceinday = Math.floor(difference / (1000 * 60 * 60 * 24));
    setTimeSince(diffirenceinday);
  };

  const fetchUser = (res) => {
    axios
      .get(`${res.owner}`)
      .then((response) => {
        return setOwner(response.data.username);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    fetchEvent();
    differentDate();
  }, [event]);

  const eventAppy = async () => {
    const data = {
      event_id: parseInt(slug),
      user_id: userdata.id,
    };

    await apply(data);
    await getEvents();
  };

  const addWishlist = () => {
    const data = {
      event_id: parseInt(slug),
      user_id: userdata.id,
    };
    save(data);
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      width: "100%",
      padding: 10,
      backgroundColor:
        colorScheme === "light"
          ? DefaultTheme.colors.background
          : DarkTheme.colors.background,
      //   borderColor: "red",
      //   borderStyle: "solid",
      //   borderWidth: 4,
      //
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
      paddingTop: 40,
    },
  });

  return (
    <>
      <Stack.Screen
        options={{
          title: title,
          headerShown: true,
        }}
      />
      <View style={styles.container}>
        <Image source={{ uri: image }} style={styles.image} />
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.spots}>{maxParticipants} space left</Text>
        <Text style={styles.spots}>{description}</Text>
        <Text style={styles.spots}>
          Created by {owner} at {timesince} days ago
        </Text>
        <Text style={styles.spots}>Location: {location}</Text>
        <Text style={styles.spots}>Starting at: {starting}</Text>
        <View style={{ gap: 30, width: "95%" }}>
          {loggedin ? (
            <>
              <Button title="Apply" style={styles.button} onPress={eventAppy} />
              <Button
                title="Save"
                style={styles.button}
                onPress={addWishlist}
              />
            </>
          ) : null}
        </View>
      </View>
    </>
  );
};

export default EventDetailScreen;
