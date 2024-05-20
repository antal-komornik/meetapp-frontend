import React, { useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { TextInput } from "react-native-paper";
import { Link, router } from "expo-router";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useContext } from "react";

export const CustomeTextInput = ({
  placeholder,
  name,
  control,
  errors,
  secureTextEntry,
  autoComplete,
}) => {
  return (
    <>
      <Controller
        control={control}
        // rules={{
        //   required: true,
        // }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            placeholder={placeholder}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            secureTextEntry={secureTextEntry}
          />
        )}
        name={name}
      />
    </>
  );
};
