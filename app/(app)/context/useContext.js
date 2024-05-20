import React, { createContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter, useSegments } from "expo-router";
import axios from "axios";
import Spin from "../components/activityIndicatior";
// import * as Cookies from "expo-cookies";

const UserContext = createContext(null);

const storeData = async (key, value) => {
  try {
    if (value !== undefined) {
      await AsyncStorage.setItem(key, value);
      // console.log("Adat tárolva sikeresen.", await AsyncStorage.getItem(key));
    }
  } catch (error) {
    console.error("Hiba történt az adat tárolása közben:", error);
  }
};

const getData = async (key, data) => {
  try {
    if ((await AsyncStorage.getItem(key)) !== null) {
      console.log("Tárolt érték:", await AsyncStorage.getItem(key));
      data(key);
    } else {
      console.log("Nincs tárolt érték a megadott kulcshoz.");
    }
  } catch (error) {
    console.error("Hiba történt az adat olvasása közben:", error);
  }
};

const removeData = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
    console.log("Adat törölve sikeresen.", await AsyncStorage.getItem(key));
  } catch (error) {
    console.error("Hiba történt az adat törlése közben:", error);
  }
};

export const baseUrl = "https://api.komornikantal.hu";

const UserProvider = ({ children }) => {
  const rootSegment = useSegments()[0];
  const router = useRouter();
  const [user, setUser] = useState();
  const [loggedin, setLoggedIn] = useState(false);
  const [data, setData] = useState();
  const [usertoken, setUserToken] = useState();
  const [userdata, setUserData] = useState();
  const [errorMessage, setErrorMessage] = useState();
  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [events, setEvents] = useState([]);

  // felhasználó mentése storage-be
  useEffect(() => {
    if (loggedin) {
      storeData("username", user);
      getUserInfo();
    }

    if (user == undefined) {
      AsyncStorage.getItem("username", (error, username) => {
        if (error) {
          console.log("Hiba a lekérés során:", error);
        } else if (username) {
          setUser(username);
          setLoggedIn(true);
        } else {
          console.log("nincs mentett username");
        }
      });
    }
  }, [loggedin]);
  // VÁLTOZÁS, , NEM VOLT MEGADVA A []-ban paraméter

  // bejelentkezés eldőntése
  useEffect(() => {
    setLoading(true);
    if (user) {
      setLoggedIn(true);
    }
    setLoading(false);
  }, [user]);

  // töltő képernyő
  useEffect(() => {
    <Spin />;
  }, [loading]);

  //
  // useEffect(() => {
  //   getUserInfo();
  // }, [user]);

  // eventek lekérése
  useEffect(() => {
    getEvents();
  }, []);

  const getUserInfo = () => {
    axios
      .get(baseUrl + "/users/")
      .then((response) => {
        const data = response.data.results;
        Object.values(data).forEach((item) => {
          if (user == item.username) {
            return setUserData(item);
          }
        });
      })
      .catch((error) => console.log(error));
  };

  const getCsrfToken = async () => {
    try {
      const response = await axios.get(`${baseUrl}/api/get-csrf-token/`, {
        withCredentials: true,
      });
      const csrfToken = response.data.csrfToken;
      // Sütibeállítás mobilon
      // Cookies.set("csrftoken", csrfToken);
      return csrfToken;
    } catch (error) {
      console.error("Error fetching CSRF token:", error);
      return null;
    }
  };

  // const login = (data) => {
  //   setLoading(true);
  //   console.log("login");
  //   axios
  //     .post(baseUrl + "/auth/login/", data)
  //     .then((response) => {
  //       if (response.status !== 200) {
  //         console.log(response.status);
  //         console.log("Hiba a bejelentkezéskor");
  //       } else {
  //         console.log(response.data);
  //         setData(response.data.results);
  //         setUserToken(response.data.results);
  //         if (
  //           Object.values(data)[0] !== undefined ||
  //           Object.values(data)[0] !== null
  //         ) {
  //           setUser(Object.values(data)[0]);
  //         } else {
  //           console.log("hiba a felhasználó elmentésében");
  //         }
  //       }
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  //   setLoading(false);
  // };

  const login = async (data) => {
    setLoading(true);
    // CSRF token beszerzése
    // const csrftoken = await getCsrfToken();
    // if (!csrftoken) {
    //   console.error("Unable to fetch CSRF token.");
    //   setLoading(false);
    //   return;
    // }
    // Cookies.set("csrftoken", csrftoken);

    axios
      .post(`${baseUrl}/auth/login/`, data, {
        headers: {
          // "X-CSRFToken": csrftoken,
          "Content-Type": "application/json",
        },
        withCredentials: true, // Fontos a sütik kezeléséhez
      })
      .then((response) => {
        if (response.status !== 200) {
          console.log(response.status);
          console.log("Hiba a bejelentkezéskor");
        } else {
          console.log(response.data);
          setData(response.data.results);
          setUserToken(response.data.results);
          if (
            Object.values(data)[0] !== undefined ||
            Object.values(data)[0] !== null
          ) {
            setUser(Object.values(data)[0]);
          } else {
            console.log("hiba a felhasználó elmentésében");
          }
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const user_register = (data) => {
    setLoading(true);
    console.log(data);
    axios
      .post(baseUrl + "/auth/registration/", data)
      .then((response) => {
        if (response.status == 204) {
          console.log(response.status);
          console.log("sikeres a regisztrációnál");
          delete data.password2;
          data.password = data.password1;
          delete data.password1;
          console.log(data);
          return login(data);
        } else {
          console.log("hiba a regisztrációban");
        }
      })
      .catch((error) => {
        console.log(error);
      });
    setLoading(false);
  };

  const logout = async () => {
    setLoading(true);
    // const csrftoken = await getCsrfToken();
    // console.log(csrftoken);
    // if (!csrftoken) {
    //   console.error("Unable to fetch CSRF token.");
    //   setLoading(false);
    //   return;
    // }
    // Cookies.set("csrftoken", csrftoken);

    axios
      .post(baseUrl + "/auth/logout/", {
        headers: {
          // "X-CSRFToken": csrftoken,
          "Content-Type": "application/json",
        },
        withCredentials: true, // Fontos a sütik kezeléséhez
      })
      .then((response) => {
        if (response.status !== 200) {
          console.log(response.status);
          console.log("Hiba a kijelentkezéskor");
        } else {
          console.log(response.data);
          setData();
          setUser();
          removeData("username");
          setUserData();
          setUserToken();
          setLoggedIn(false);
          router.replace("/");
        }
      })
      .catch((error) => {
        console.log(error);
      });
    setLoading(false);
  };

  const updateUserInfo = (data) => {
    axios
      .put(userdata.url, data)
      .then((respone) => {
        if (respone.status !== 200) {
          console.log(respone.status);
          console.log("error in update");
        }
        console.log(respone.status);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const errorShow = () => {
    if (errorMessage) {
      Alert.alert(
        errorMessage[
          {
            text: "ok",
            onPress: () => {
              console.log("pressed");
              setErrorMessage(null);
            },
          }
        ],
        { cancelable: false }
      );
    }
  };

  // események
  const event_register = (data) => {
    axios
      .post(baseUrl + "/events/", data)
      .then((respone) => {
        console.log(respone.status);
        getEvents();
        router.replace("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getEvents = () => {
    axios
      .get(baseUrl + "/events/")
      .then((response) => {
        setEvents(response.data.results);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const updateEvent = (id, data) => {
    axios
      .put(baseUrl + `/events/${id}/`, data)
      .then((respone) => {
        if (respone.status !== 200) {
          console.log(respone.status);
          console.log("error in update");
        } else {
          console.log(respone.status);
          console.log(respone.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const removeEvent = (id) => {
    return axios
      .delete(baseUrl + `/events/${id}/`)
      .then((respone) => {
        if (respone.status !== 204) {
          console.log(respone.status);
          console.log("error in delete");
        } else {
          console.log(respone.data);
          getUserInfo();
          getEvents();
          router.replace("/");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // register
  const apply = (data) => {
    axios
      .post(baseUrl + "/eventsregister/", data)
      .then((response) => {
        if (response.status !== 201) {
          console.log("hiba");
          console.log(response.status);
        } else {
          console.log(response.status);
          console.log("yes");
        }
      })
      .catch((error) => console.log(error));
  };

  const removeApply = (data) => {
    return axios
      .post(baseUrl + `/eventsregister/delete_registration/`, data)
      .then((response) => {
        if (response.status !== 200) {
          console.log("hiba");
          console.log(response.status);
        } else {
          console.log(response.status);
        }
      })
      .catch((error) => console.log(error));
  };
  // wish
  const save = (data) => {
    axios
      .post(baseUrl + "/wishlistlist/", data)
      .then((response) => {
        if (response.status !== 201) {
          console.log("hiba");
          console.log(response.status);
        } else {
          console.log(response.status);
          console.log("yes");
        }
      })
      .catch((error) => console.log(error));
  };

  const removeSave = (data) => {
    return axios
      .post(baseUrl + `/wishlistlist/delete_wishlist/`, data)
      .then((response) => {
        if (response.status !== 200) {
          console.log("hiba");
          console.log(response.status);
        } else {
          console.log(response.status);
          console.log("yes");
        }
      })
      .catch((error) => console.log(error));
  };

  return (
    <UserContext.Provider
      value={{
        user,
        loggedin,
        login,
        logout,
        user_register,
        usertoken,
        updateUserInfo,
        userdata,
        setUserData,
        getUserInfo,

        //
        errorMessage,
        setErrorMessage,
        isError,
        setIsError,
        errorShow,
        //
        loading,
        setLoading,
        //
        events,
        setEvents,
        event_register,
        removeEvent,
        updateEvent,
        getEvents,

        apply,
        removeApply,
        save,
        removeSave,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
