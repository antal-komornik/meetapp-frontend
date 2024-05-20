import {
  StyleSheet,
  useColorScheme,
  View,
  Text,
  Button,
  TouchableOpacity,
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
      .min(5, "Username must contain at least 5 characters")
      .max(15, "Username must contain at most 15 characters"),
    email: yup.string().required("Email is required").email("Invalid email"),
    password1: yup
      .string()
      .required("Password is required")
      .min(5, "Password must contain at least 5 characters"),
    password2: yup
      .string()
      .required("Password is required")
      .min(5, "Password must contain at least 5 characters"),
  })
  .shape();

export function RegisterScreen({ hideModal }) {
  const colorScheme = useColorScheme();
  const { user_register } = useContext(UserContext);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: "",
      email: "",
      password1: "",
      password2: "",
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
    user_register(data);
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
        <Text style={styles.text}>Registration</Text>
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
          placeholder={"Email"}
          name={"email"}
          control={control}
          errors={errors}
          secureTextEntry={false}
        />
        {errors.email && (
          <Text style={{ color: "red" }}>{errors.email.message}</Text>
        )}

        <CustomeTextInput
          placeholder={"Password"}
          name={"password1"}
          control={control}
          errors={errors}
          secureTextEntry={true}
        />
        {errors.password1 && (
          <Text style={{ color: "red" }}>{errors.password1.message}</Text>
        )}

        <CustomeTextInput
          placeholder={"Password"}
          name={"password2"}
          control={control}
          errors={errors}
          secureTextEntry={true}
        />
        {errors.password2 && (
          <Text style={{ color: "red" }}>{errors.password2.message}</Text>
        )}
        <Button title={"Sign up"} onPress={handleSubmit(onSubmit)} />
      </View>
    </View>
  );
}
