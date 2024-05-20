import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Pressable,
  StatusBar,
  useColorScheme,
  Button,
  // Modal,
  // Portal,
} from "react-native";
import { Modal, Portal } from "react-native-paper";
import { useRef, useState, useContext } from "react";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { Link } from "expo-router";
import * as React from "react";
import { SearchScreen } from "./search";
import { themes } from "../constants/Colors";
import { DarkTheme, DefaultTheme } from "@react-navigation/native";

const categories = [
  {
    name: "All",
    icon: "flag",
  },
  {
    name: "Boardgame",
    icon: "home",
  },
  {
    name: "Videogame",
    icon: "house-siding",
  },
  {
    name: "Sport",
    icon: "local-fire-department",
  },
  {
    name: "Traveling",
    icon: "videogame-asset",
  },
  {
    name: "Shopping",
    icon: "apartment",
  },
  {
    name: "Cooking",
    icon: "beach-access",
  },
  {
    name: "Equipments",
    icon: "nature-people",
  },
  {
    name: "Social work",
    icon: "apartment",
  },
  {
    name: "Other",
    icon: "apartment",
  },
];

const MainHeader = ({ onCategoryChanged }) => {
  const colorScheme = useColorScheme();
  const scrollRef = useRef(null);
  const itemsRef = useRef([]);
  const [activeIndex, setActiveIndex] = useState(0);

  const selectCategory = (index) => {
    const selected = itemsRef.current[index];
    setActiveIndex(index);
    selected?.measure((x) => {
      scrollRef.current?.scrollTo({ x: x - 16, y: 0, animated: true });
    });
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    // onCategoryChanged(categories[index].name);
  };

  const [visible, setVisible] = React.useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const containerStyle = {
    width: "80%",
    backgroundColor:
      colorScheme === "light"
        ? DefaultTheme.colors.background
        : DarkTheme.colors.background,
    padding: 20,
  };

  const styles = StyleSheet.create({
    container: {
      backgroundColor:
        colorScheme === "light"
          ? DefaultTheme.colors.background
          : DarkTheme.colors.background,
      height: 160,
      elevation: 2,
      shadowColor:
        colorScheme === "light"
          ? DefaultTheme.colors.border
          : DarkTheme.colors.border,
      shadowOpacity: 0.9,
      shadowRadius: 6,
      shadowOffset: {
        width: 1,
        height: 10,
      },
    },
    actionRow: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      paddingHorizontal: 24,
      paddingBottom: 16,
    },
    searchBtn: {
      flexDirection: "row",
      gap: 10,
      padding: 14,
      alignItems: "center",
      width: 280,
      borderWidth: 1,
      // borderColor: "#c2c2c2",
      borderColor:
        colorScheme === "light"
          ? DefaultTheme.colors.border
          : DarkTheme.colors.border,
      borderRadius: 30,
      elevation: 2,
      shadowColor: colorScheme === "light" ? "#000" : "#fff",
      shadowOpacity: 0.12,
      shadowRadius: 8,
      shadowOffset: {
        width: 1,
        height: 1,
      },
    },
    filterBtn: {
      padding: 10,
      borderWidth: 1,
      // borderColor: "#A2A0A2",
      borderColor:
        colorScheme === "light"
          ? DefaultTheme.colors.border
          : DarkTheme.colors.border,
      borderRadius: 24,
    },
    categoryText: {
      fontSize: 14,
      color:
        colorScheme === "light"
          ? DefaultTheme.colors.text
          : DarkTheme.colors.text,
    },
    categoryTextActive: {
      fontSize: 14,
      color:
        colorScheme === "light"
          ? DefaultTheme.colors.primary
          : DarkTheme.colors.primary,
    },
    categoriesBtn: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      paddingBottom: 8,
      color:
        colorScheme === "light"
          ? DefaultTheme.colors.text
          : DarkTheme.colors.text,
    },
    categoriesBtnActive: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      borderBottomColor:
        colorScheme === "light"
          ? DefaultTheme.colors.primary
          : DarkTheme.colors.primary,
      borderBottomWidth: 2,
      paddingBottom: 8,
      color:
        colorScheme === "light"
          ? DefaultTheme.colors.primary
          : DarkTheme.colors.primary,
    },
    icon: {
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
    <SafeAreaView
      style={{
        // flex: 1,
        flexGrow: 1,
        marginTop: StatusBar.currentHeight,
      }}
    >
      <View style={styles.container}>
        <View style={styles.actionRow}>
          <Link href={"/"} asChild>
            <Pressable onPress={showModal}>
              <View style={[styles.searchBtn]}>
                <Ionicons name="search" size={24} style={styles.icon} />
                <View>
                  <Text style={styles.text}>What?</Text>
                  <Text style={styles.text}>Anything</Text>
                </View>
              </View>
            </Pressable>
          </Link>
          {/* <Pressable style={styles.filterBtn}>
            <Ionicons name="options-outline" size={24} />
          </Pressable> */}
          <Portal>
            <Modal
              visible={visible}
              onDismiss={hideModal}
              contentContainerStyle={containerStyle}
              style={{ flex: 1, alignItems: "center" }}
            >
              <ScrollView>
                <SearchScreen hideModal={hideModal} />
              </ScrollView>
            </Modal>
          </Portal>
        </View>
        <ScrollView
          horizontal={true}
          ref={scrollRef}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            flexGrow: 1,
            alignItems: "center",
            gap: 20,
            paddingHorizontal: 16,
          }}
        >
          {categories.map((item, index) => (
            <Pressable
              ref={(el) => (itemsRef.current[index] = el)}
              key={index}
              style={
                activeIndex === index
                  ? styles.categoriesBtnActive
                  : styles.categoriesBtn
              }
              onPress={() => {
                selectCategory(index);
                console.log(item.name);
              }}
            >
              {/* <MaterialIcons
                name={item.icon}
                size={24}
                color={activeIndex === index ? "#000" : "grey"}
              /> */}
              <Text
                style={
                  activeIndex === index
                    ? styles.categoryTextActive
                    : styles.categoryText
                }
              >
                {item.name}
              </Text>
            </Pressable>
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default MainHeader;
