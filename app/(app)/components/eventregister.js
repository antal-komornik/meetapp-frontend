import {
  StyleSheet,
  colorScheme,
  View,
  Pressable,
  Text,
  Button,
  useColorScheme,
  TextInput,
  ScrollView,
  Picker,
  Image,
  Platform,
} from "react-native";
import React from "react";
import { DarkTheme, DefaultTheme } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useEffect, useContext, useState } from "react";
import { CustomeTextInput } from "../components/textInput";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Menu, Divider, Provider } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";
import { UserContext } from "../context/useContext";
import DateTimeInput from "./dateTimePicker";
import dayjs from "dayjs";

const dateTimeRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/;

const schema = yup
  .object({
    title: yup.string().required("Title is required"),
    description: yup.string(),
    location: yup.string(),
    max_participants: yup.number().required("Max participants is required"),
    starting_time: yup
      .string()
      .matches(
        dateTimeRegex,
        "The date and time must be in the format YYYY-MM-DDThh:mm"
      )
      .required("Date and time is required"),
  })
  .shape();

export default function EventRegister({ hideModal }) {
  const colorScheme = useColorScheme();
  const [visible, setVisible] = React.useState(false);
  const [selected, setSelected] = React.useState("OTHER");
  const [image, setImage] = useState(null);
  const { event_register, userdata, getEvents } = useContext(UserContext);
  const [date, setDate] = useState(dayjs());

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      description: "",
      location: "",
      max_participants: "",
    },
    // resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    console.log("button");
    console.log(data);
    if (data) {
      data.type = selected;
      data.starting_time = date;
      // data.image = image;
      data.owner = userdata.url;
      // if (image) {
      //   console.log(data.image);
      // }
      console.log(data);
      event_register(data);
      getEvents();
      hideModal();
    } else {
      console.error("Form data is undefined.");
    }
  };

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    // result.assets.forEach((element) => {
    //   console.log(element.fileName);
    //   setImage(element.fileName);
    // });
    setImage(result);
    // console.log(result.assets);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const styles = StyleSheet.create({
    container: {
      // flex: 1,
      alignItems: "center",
      // justifyContent: "center",
      width: "100%",
      padding: 10,
      // gap: 30,
    },
    form: {
      width: "100%",
      gap: 20,
    },
    text: {
      color:
        colorScheme === "light"
          ? DefaultTheme.colors.text
          : DarkTheme.colors.text,
    },
    closeBtnContainer: {
      // flex: 1,
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
    headerText: {
      fontSize: 22,
      fontWeight: "bold",
      marginBottom: 20,
      textAlign: "center",
      color:
        colorScheme === "light"
          ? DefaultTheme.colors.text
          : DarkTheme.colors.text,
    },
    input: {
      // height: 40,
      borderColor:
        colorScheme === "light"
          ? DefaultTheme.colors.border
          : DarkTheme.colors.border,
      borderWidth: 1,
      marginBottom: 10,
      paddingHorizontal: 10,
      color:
        colorScheme === "light"
          ? DefaultTheme.colors.text
          : DarkTheme.colors.text,
    },
    textArea: {
      height: 100,
      borderColor: "gray",
      borderWidth: 1,
      marginBottom: 10,
      paddingHorizontal: 10,
      textAlignVertical: "top",
    },
    picker: {
      height: 50,
      width: "100%",
      marginBottom: 10,
    },
    buttonContainer: {
      width: "100%",
      flexDirection: "row",
      justifyContent: "space-around",
      marginBottom: 10,
    },
  });

  if (Platform.OS === "android" || Platform.OS === "ios") {
    return (
      <>
        <ScrollView>
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
            <View style={styles.header}>
              <Text style={styles.headerText}>Create Event</Text>
            </View>
            <View style={styles.form}>
              <View style={{ flex: 1, justifyContent: "space-between" }}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.text}>Choose a category</Text>
                  <Menu
                    visible={visible}
                    onDismiss={closeMenu}
                    anchor={
                      <Pressable onPress={openMenu}>
                        <Text style={styles.text}>{selected}</Text>
                      </Pressable>
                    }
                  >
                    <Menu.Item
                      onPress={() => {
                        setSelected("BOARDGAME");
                        closeMenu();
                      }}
                      title="Boardgame"
                    />
                    <Menu.Item
                      onPress={() => {
                        setSelected("Cooking");
                        closeMenu();
                      }}
                      title="Cooking"
                    />
                    <Menu.Item
                      onPress={() => {
                        setSelected("EQUIPMENT_RENTAL");
                        closeMenu();
                      }}
                      title="Equipment rental"
                    />
                    <Menu.Item
                      onPress={() => {
                        setSelected("OTHER");
                        closeMenu();
                      }}
                      title="Other"
                    />
                    <Menu.Item
                      onPress={() => {
                        setSelected("SHOPPING");
                        closeMenu();
                      }}
                      title="Shopping"
                    />
                    <Menu.Item
                      onPress={() => {
                        setSelected("SOCIAL_WORK");
                        closeMenu();
                      }}
                      title="Social work"
                    />
                    <Menu.Item
                      onPress={() => {
                        setSelected("SPORT");
                        closeMenu();
                      }}
                      title="Sport"
                    />
                    <Menu.Item
                      onPress={() => {
                        setSelected("TRAVELING");
                        closeMenu();
                      }}
                      title="Traveling"
                    />
                    <Menu.Item
                      onPress={() => {
                        setSelected("TUDOR");
                        closeMenu();
                      }}
                      title="Tudor"
                    />
                    <Menu.Item
                      onPress={() => {
                        setSelected("VIDEOGAME");
                        closeMenu();
                      }}
                      title="Videogame"
                    />
                  </Menu>
                </View>
              </View>
              <CustomeTextInput
                placeholder={"Title"}
                name={"title"}
                control={control}
                errors={errors}
                secureTextEntry={false}
              />
              {errors.title && (
                <Text style={{ color: "red" }}>{errors.title.message}</Text>
              )}
              <CustomeTextInput
                placeholder={"Description"}
                name={"description"}
                control={control}
                errors={errors}
                secureTextEntry={false}
              />
              {errors.description && (
                <Text style={{ color: "red" }}>
                  {errors.description.message}
                </Text>
              )}
              <CustomeTextInput
                placeholder={"Location"}
                name={"location"}
                control={control}
                errors={errors}
                secureTextEntry={false}
              />
              {errors.location && (
                <Text style={{ color: "red" }}>{errors.location.message}</Text>
              )}
              <CustomeTextInput
                placeholder={"Max participants"}
                name={"max_participants"}
                control={control}
                errors={errors}
                secureTextEntry={false}
              />
              {errors.max_participants && (
                <Text style={{ color: "red" }}>
                  {errors.max_participants.message}
                </Text>
              )}
              <View style={{ flex: 1 }}>
                <DateTimeInput date={date} setDate={setDate} />
              </View>

              <View style={styles.buttonContainer}>
                <Button title={"Create"} onPress={handleSubmit(onSubmit)} />
              </View>
            </View>
          </View>
        </ScrollView>
      </>
    );
  }
  return (
    <>
      {/* <ScrollView> */}
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
        <View style={styles.header}>
          <Text style={styles.headerText}>Create Event</Text>
        </View>
        <View style={styles.form}>
          <View style={{ flex: 1, justifyContent: "space-between" }}>
            <View style={{ flex: 1 }}>
              <Text style={styles.text}>Choose a category</Text>
              <Menu
                visible={visible}
                onDismiss={closeMenu}
                anchor={
                  <Pressable onPress={openMenu}>
                    <Text style={styles.text}>{selected}</Text>
                  </Pressable>
                }
              >
                <Menu.Item
                  onPress={() => {
                    setSelected("BOARDGAME");
                    closeMenu();
                  }}
                  title="Boardgame"
                />
                <Menu.Item
                  onPress={() => {
                    setSelected("Cooking");
                    closeMenu();
                  }}
                  title="Cooking"
                />
                <Menu.Item
                  onPress={() => {
                    setSelected("EQUIPMENT_RENTAL");
                    closeMenu();
                  }}
                  title="Equipment rental"
                />
                <Menu.Item
                  onPress={() => {
                    setSelected("OTHER");
                    closeMenu();
                  }}
                  title="Other"
                />
                <Menu.Item
                  onPress={() => {
                    setSelected("SHOPPING");
                    closeMenu();
                  }}
                  title="Shopping"
                />
                <Menu.Item
                  onPress={() => {
                    setSelected("SOCIAL_WORK");
                    closeMenu();
                  }}
                  title="Social work"
                />
                <Menu.Item
                  onPress={() => {
                    setSelected("SPORT");
                    closeMenu();
                  }}
                  title="Sport"
                />
                <Menu.Item
                  onPress={() => {
                    setSelected("TRAVELING");
                    closeMenu();
                  }}
                  title="Traveling"
                />
                <Menu.Item
                  onPress={() => {
                    setSelected("TUDOR");
                    closeMenu();
                  }}
                  title="Tudor"
                />
                <Menu.Item
                  onPress={() => {
                    setSelected("VIDEOGAME");
                    closeMenu();
                  }}
                  title="Videogame"
                />
              </Menu>
            </View>
          </View>
          <CustomeTextInput
            placeholder={"Title"}
            name={"title"}
            control={control}
            errors={errors}
            secureTextEntry={false}
          />
          {errors.title && (
            <Text style={{ color: "red" }}>{errors.title.message}</Text>
          )}
          <CustomeTextInput
            placeholder={"Description"}
            name={"description"}
            control={control}
            errors={errors}
            secureTextEntry={false}
          />
          {errors.description && (
            <Text style={{ color: "red" }}>{errors.description.message}</Text>
          )}
          <CustomeTextInput
            placeholder={"Location"}
            name={"location"}
            control={control}
            errors={errors}
            secureTextEntry={false}
          />
          {errors.location && (
            <Text style={{ color: "red" }}>{errors.location.message}</Text>
          )}
          <CustomeTextInput
            placeholder={"Max participants"}
            name={"max_participants"}
            control={control}
            errors={errors}
            secureTextEntry={false}
          />
          {errors.max_participants && (
            <Text style={{ color: "red" }}>
              {errors.max_participants.message}
            </Text>
          )}
          <View style={{}}>
            <DateTimeInput date={date} setDate={setDate} />
          </View>
          {/* <View
style={{
  flex: 1,
  alignItems: "center",
  justifyContent: "center",
}}
>
<Pressable onPress={pickImage}>
  <Text style={styles.text}>Pick an image from camera roll</Text>
</Pressable>
{image && (
  <Image
    source={{ uri: image }}
    style={{ width: 200, height: 200 }}
  />
)}
</View> */}

          <View style={styles.buttonContainer}>
            {/* <Button title={"Create"} onPress={() => handleSubmit(onSubmit)} /> */}
            <Button title={"Create"} onPress={handleSubmit(onSubmit)} />
          </View>
        </View>
      </View>
      {/* </ScrollView> */}
    </>
  );
}
