import {
  StyleSheet,
  useColorScheme,
  View,
  SafeAreaView,
  StatusBar,
  Pressable,
  Text,
  Button,
} from "react-native";
import * as React from "react";
import { Searchbar, Chip } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useForm, Controller } from "react-hook-form";
import { DarkTheme, DefaultTheme } from "@react-navigation/native";
import { useState, useEffect } from "react";
import axios from "axios";
import { CustomeTextInput } from "./textInput";

export function SearchScreen({ hideModal }) {
  const colorScheme = useColorScheme();
  const [searchQuery, setSearchQuery] = React.useState();
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [foundId, setFoundId] = useState([]);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      searchbar: "",
    },
  });

  const fetchEvents = async () => {
    const response = await axios
      .get("https://api.komornikantal.hu/events/")
      .then((response) => {
        // console.log(response.data.results);
        setData(response.data.results);
      })
      .catch((error) => console.log(error));
  };

  const search = (text) => {
    var found = false;

    if (data) {
      Object.values(data).forEach((values) => {
        // console.log(values);
        for (const key in values) {
          const value = values[key];
          console.log(value);
          if (typeof value === "string" && value.includes(searchQuery)) {
            found = true;
            if (found) {
              setFoundId(...foundId, values.id);
              console.log(
                `Egyezés az "${values.id}" id-vel rendelkező objektumban.`
              );
            }
            console.log(
              `A "${key}" tulajdonság értéke tartalmazza a "${searchQuery}" karakterláncot.`
            );
            // break;
          }
        }
        if (!found) {
          console.log(
            `A "${searchQuery}" karakterlánc nem található az objektumban.`
          );
        }
      });
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  useEffect(() => {
    console.log(foundId);
    console.log("mentés");
  }, [foundId]);

  useEffect(() => {
    search(searchQuery);
  }, [searchQuery]);

  const onSubmit = (data) => {
    setSearchQuery(data.searchbar);
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "space-between",
      width: "100%",
      gap: 20,
    },
    closeBtnContainer: {
      width: "100%",
      justifyContent: "flex-start",
      alignItems: "flex-start",
    },
    closeBtn: {
      color:
        colorScheme === "light"
          ? DefaultTheme.colors.text
          : DarkTheme.colors.text,
    },
    searchbar: {
      width: "80%",
      gap: 10,
    },
    btncontainer: {
      width: "30%",
    },
    text: {
      color:
        colorScheme === "light"
          ? DefaultTheme.colors.text
          : DarkTheme.colors.text,
    },

    button: {
      backgroundColor:
        colorScheme === "light"
          ? DefaultTheme.colors.primary
          : DarkTheme.colors.primary,
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.closeBtnContainer}>
        <Pressable onPress={hideModal} style={styles.closeBtn}>
          <Icon
            name={"close"}
            color={
              colorScheme === "light"
                ? DefaultTheme.colors.text
                : DarkTheme.colors.text
            }
            size={50 / 2}
          />
        </Pressable>
      </View>
      <View style={styles.searchbar}>
        <Text style={styles.text}>Mit keresel?</Text>
        <CustomeTextInput
          placeholder={"Search"}
          name={"searchbar"}
          control={control}
          errors={errors}
          secureTextEntry={false}
          autoComplete={"searchbar"}
        />
        {errors.searchbar && (
          <Text style={{ color: "red" }}>{errors.searchbar.message}</Text>
        )}
      </View>
      <View style={styles.btncontainer}>
        <Button title="Search" onPress={handleSubmit(onSubmit)} />
      </View>
    </View>
  );
}
