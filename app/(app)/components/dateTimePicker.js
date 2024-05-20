import DateTimePicker from "react-native-ui-datepicker";
import dayjs from "dayjs";
import {
  useColorScheme,
  View,
  StyleSheet,
  Platform,
  ScrollView,
} from "react-native";
import { useState } from "react";
import { DarkTheme, DefaultTheme } from "@react-navigation/native";

const DateTimeInput = ({ date, setDate }) => {
  const colorScheme = useColorScheme();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor:
        colorScheme === "dark"
          ? DefaultTheme.colors.background
          : DefaultTheme.colors.background,
    },
  });

  return (
    <View style={styles.container}>
      {/* <ScrollView> */}
      <DateTimePicker
        mode="single"
        timePicker={true}
        date={date}
        onChange={(params) => setDate(params.date)}
      />
      {/* </ScrollView> */}
    </View>
  );
};

export default DateTimeInput;
