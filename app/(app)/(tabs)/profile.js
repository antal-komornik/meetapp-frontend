import * as React from "react";
import { Link, Stack, router } from "expo-router";
// import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  useColorScheme,
  SafeAreaViewBase,
  View,
  ScrollView,
  SafeAreaView,
  Platform,
  Text,
  StatusBar,
  TextInput,
  Button,
  Pressable,
} from "react-native";
import { Modal, Portal, PaperProvider, Divider } from "react-native-paper";
import { useEffect, useContext } from "react";
import { LoginScreen } from "../components/login";
import EventRegister from "../components/eventregister";
import { RegisterScreen } from "../components/userregister";
import { UserContext } from "../context/useContext";
import { DarkTheme, DefaultTheme } from "@react-navigation/native";

export default function ProfileScreen() {
  const colorScheme = useColorScheme();
  const { loggedin, logout, userdata } = useContext(UserContext);
  const [loginvisible, setLoginVisible] = React.useState(false);
  const [registervisible, setRegisterVisible] = React.useState(false);
  const [createEventvisible, setCreateEventVisible] = React.useState(false);

  useEffect(() => {
    if (loggedin) {
      setLoginVisible(false);
      setRegisterVisible(false);
      router.replace("/");
    }
  }, [loggedin]);

  const showLoginModal = () => setLoginVisible(true);
  const hideLoginModal = () => setLoginVisible(false);
  const showRegisterModal = () => setRegisterVisible(true);
  const hideRegisterModal = () => setRegisterVisible(false);
  const showEventCreateModal = () => setCreateEventVisible(true);
  const hideEventCreateModal = () => setCreateEventVisible(false);

  const containerStyle = {
    width: "90%",
    backgroundColor:
      colorScheme === "light"
        ? DefaultTheme.colors.background
        : DarkTheme.colors.background,
    padding: 20,
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      width: "100%",
      alignItems: "center",
      // justifyContent: "",
      backgroundColor:
        colorScheme === "light"
          ? DefaultTheme.colors.background
          : DarkTheme.colors.background,
      marginTop: StatusBar.currentHeight,
    },
    text: {
      color:
        colorScheme === "light"
          ? DefaultTheme.colors.text
          : DarkTheme.colors.text,
    },
    header: {
      width: "90%",
      marginTop: 20,
      marginBottom: 20,
      paddingTop: 5,
      paddingBottom: 5,
      borderColor:
        colorScheme === "light"
          ? DefaultTheme.colors.border
          : DarkTheme.colors.border,
      borderStyle: "solid",
      borderWidth: 2,
      alignItems: "center",
    },
    headerText: {
      fontSize: 24,
      fontWeight: "bold",
      color:
        colorScheme === "light"
          ? DefaultTheme.colors.text
          : DarkTheme.colors.text,
    },
    btn: {
      // flex: 1,
      backgroundColor:
        colorScheme === "light"
          ? DefaultTheme.colors.background
          : DarkTheme.colors.background,
      width: "90%",
      padding: 15,
      alignItems: "center",
      justifyContent: "center",
      // borderRadius: 5,
      marginBottom: 10,
      gap: 20,
      // borderColor: "red",
      // borderStyle: "dashed",
      // borderWidth: 2,
    },
    btnText: {
      color:
        colorScheme === "light"
          ? DefaultTheme.colors.text
          : DarkTheme.colors.text,
      fontSize: 18,
      fontWeight: "bold",
    },
    userInfo: {
      width: "90%",
      // marginBottom: 20,
      alignItems: "center",
    },
    userName: {
      fontSize: 20,
      fontWeight: "bold",
      marginBottom: 10,
      color:
        colorScheme === "light"
          ? DefaultTheme.colors.text
          : DarkTheme.colors.text,
    },
    label: {
      fontSize: 16,
      color:
        colorScheme === "light"
          ? DefaultTheme.colors.text
          : DarkTheme.colors.text,
    },
    value: {
      fontSize: 18,
      marginBottom: 10,
      color:
        colorScheme === "light"
          ? DefaultTheme.colors.text
          : DarkTheme.colors.text,
    },
  });

  return (
    <>
      <Stack.Screen options={{ headerShown: false, title: "Profile" }} />
      {/* <SafeAreaView> */}
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Profile</Text>
        </View>

        {loggedin ? (
          <>
            <View style={styles.btn}>
              <View style={styles.userInfo}>
                {userdata ? (
                  <>
                    <Text style={styles.userName}>{userdata.username}</Text>
                    <Text style={styles.label}>Your Username: </Text>
                    <Text style={styles.value}>{userdata.username}</Text>
                    <Text style={styles.label}>Your Lastname:</Text>
                    {userdata.last_name ? (
                      <Text style={styles.value}>{userdata.last_name}</Text>
                    ) : (
                      <Text style={styles.value}>Not Specified</Text>
                    )}
                    <Text style={styles.label}>Your Firstname:</Text>
                    {userdata.last_name ? (
                      <Text style={styles.value}>{userdata.first_name}</Text>
                    ) : (
                      <Text style={styles.value}>Not Specified</Text>
                    )}
                    <Text style={styles.label}>Your Email address:</Text>
                    {userdata.last_name ? (
                      <Text style={styles.value}>{userdata.email}</Text>
                    ) : (
                      <Text style={styles.value}>Not Specified</Text>
                    )}
                    {/* <Text style={styles.label}>Értékelésed:</Text>
                      <Text style={styles.value}>5/5</Text> */}
                  </>
                ) : null}
              </View>
              <View style={styles.btn}>
                <Button
                  style={styles.btnText}
                  onPress={showEventCreateModal}
                  title="Create Event"
                />
                <Portal>
                  <Modal
                    visible={createEventvisible}
                    onDismiss={hideEventCreateModal}
                    contentContainerStyle={containerStyle}
                    style={{
                      flex: 1,
                      alignItems: "center",
                    }}
                  >
                    <ScrollView>
                      <EventRegister hideModal={hideEventCreateModal} />
                    </ScrollView>
                  </Modal>
                </Portal>

                <Button
                  style={styles.btnText}
                  onPress={logout}
                  title="Logout"
                />
              </View>
            </View>
          </>
        ) : (
          <>
            <View
              style={
                (styles.btn,
                {
                  flex: 1,
                  justifyContent: "center",
                  gap: 10,
                })
              }
            >
              <Button
                style={styles.btnText}
                onPress={showLoginModal}
                title="Login"
              />

              <Portal>
                <Modal
                  visible={loginvisible}
                  onDismiss={hideLoginModal}
                  contentContainerStyle={containerStyle}
                  style={{ flex: 1, alignItems: "center" }}
                >
                  <ScrollView>
                    <LoginScreen hideModal={hideLoginModal} />
                  </ScrollView>
                </Modal>
              </Portal>

              <Divider />
              <Button
                style={styles.btnText}
                onPress={showRegisterModal}
                title="Register"
              />

              <Portal>
                <Modal
                  visible={registervisible}
                  onDismiss={hideRegisterModal}
                  contentContainerStyle={containerStyle}
                  style={{ flex: 1, alignItems: "center" }}
                >
                  <ScrollView>
                    <RegisterScreen hideModal={hideRegisterModal} />
                  </ScrollView>
                </Modal>
              </Portal>
            </View>
          </>
        )}
      </View>
      <StatusBar style="auto" />
      {/* </SafeAreaView> */}
    </>
  );
}
