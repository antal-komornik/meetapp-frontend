import {
  StyleSheet,
  colorScheme,
  View,
  TouchableOpacity,
  Text,
  Button,
  useColorScheme,
} from "react-native";
import { Link, router } from "expo-router";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useContext, useState } from "react";
import { UserContext } from "../context/useContext";
import { DarkTheme, DefaultTheme } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import { CustomeTextInput } from "../components/textInput";

const schema = yup
  .object({
    username: yup
      .string()
      .required("Username is required")
      .min(4, "Username must contain at least 5 characters")
      .max(15, "Username must contain at most 15 characters"),
    password: yup
      .string()
      .required("Password is required")
      .min(4, "Password must contain at least 5 characters"),
  })
  .shape();

export function LoginScreen({ hideModal }) {
  const colorScheme = useColorScheme();
  const { login } = useContext(UserContext);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: "",
      password: "",
    },
    resolver: yupResolver(schema),
  });

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      width: "100%",
    },

    form: {
      width: "80%",
      gap: 20,
    },
    text: {
      color:
        colorScheme === "light"
          ? DefaultTheme.colors.text
          : DarkTheme.colors.text,
    },
    closeBtnContainer: {
      flex: 1,
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
  });

  const onSubmit = (data) => {
    login(data);
  };

  return (
    <View style={styles.container}>
      <View style={(styles.closeBtnContainer, { alignItems: "flex-start" })}>
        <TouchableOpacity onPress={hideModal} style={styles.closeBtn}>
          <Icon
            name={"close"}
            color={
              colorScheme === "light"
                ? DefaultTheme.colors.text
                : DarkTheme.colors.text
            }
            size={50 / 2}
          />
        </TouchableOpacity>
      </View>
      <View>
        <Text style={styles.text}>Login</Text>
      </View>
      <View style={styles.form}>
        <CustomeTextInput
          placeholder={"Username"}
          name={"username"}
          control={control}
          errors={errors}
          secureTextEntry={false}
        />
        {errors.username && (
          <Text style={{ color: "red" }}>{errors.username.message}</Text>
        )}

        <CustomeTextInput
          placeholder={"Password"}
          name={"password"}
          control={control}
          errors={errors}
          secureTextEntry={true}
        />
        {errors.password && (
          <Text style={{ color: "red" }}>{errors.password.message}</Text>
        )}
        {/* <Button title="Submit" onPress={handleSubmit(onSubmit)} /> */}
        <Button title={"Sign in"} onPress={handleSubmit(onSubmit)} />
      </View>
    </View>
  );
}
