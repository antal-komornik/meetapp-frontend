import { Redirect, Tabs } from "expo-router";
import { themes } from "../constants/Colors";
import { useColorScheme, StatusBar } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";

function TabBarIcon({ color, name }) {
  return (
    <FontAwesome
      name={name}
      color={color}
      size={28}
      style={{
        marginBottom: 0,
      }}
    />
  );
}

export default function TabsLayout() {
  const colorScheme = useColorScheme();
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarIcon: {
          tabBarActiveTintColor: themes(colorScheme).tint,
          tabBarInactiveTintColor: "var(--theme-color-primary)",
          tabBarStyle: { backgroundColor: "rgb(251, 248, 244)" },
        },

        initialRouteName: "index",
      }}
    >
      <Tabs.Screen
        name="settings"
        options={{
          tabBarLabel: "Settings",
          title: "Settings",
          tabBarIcon: ({ color }) => <TabBarIcon name="gear" color={color} />,
        }}
      />
      <Tabs.Screen
        name="index"
        options={{
          tabBarLabel: "Home",
          title: "Home",
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarLabel: "Profile",
          title: "Profile",
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="user-circle" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
