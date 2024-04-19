import React, { useEffect } from "react";
import GoogleLogin from "../components/login/googleLogin";
import { Image, StyleSheet, View } from "react-native";
import { Dimensions } from "react-native";
import FontedText from "../components/global/fontedText";
import { colors } from "../styles/colors";
import AsyncStorage from "@react-native-async-storage/async-storage";

const win = Dimensions.get("window");
const ratio = win.width / 720;
const imgHeight = 788 * ratio;

const Login = () => {
  useEffect(() => {
    const saveViewedInitialPages = async () => {
      const viewed = await AsyncStorage.getItem("viewedInitialPages");
      if (!viewed) {
        await AsyncStorage.setItem("viewedInitialPages", "true");
      }
    };
    saveViewedInitialPages();
  }, []);

  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={require("../assets/images/loginBG.png")}
      />
      <View style={styles.buttonContainer}>
        <View style={styles.top}>
          <FontedText weight={700} style={styles.topText}>
            Inicia sesión
          </FontedText>
        </View>
        <View style={styles.bottom}>
          <View style={styles.logoContainer}>
            <View
              style={{
                height: "100%",
                flex: 1,
              }}
            >
              <Image
                style={styles.logo}
                source={require("../assets/images/CubiertoLogo.png")}
              />
            </View>
            <View
              style={{
                flexDirection: "column",
                gap: 12,
                height: "100%",
                flex: 1,
                alignItems: "center",
              }}
            >
              <Image
                style={styles.cochaLogo}
                source={require("../assets/images/WebCubiertoLogos-01.png")}
              />
              <Image
                style={styles.uniLogo}
                source={require("../assets/images/unifranzLogo.png")}
              />
            </View>
          </View>
          <FontedText style={styles.text} weight={600}>
            Inicia sesión con tu cuenta de Google
          </FontedText>
          <GoogleLogin />
        </View>
      </View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: win.width,
    height: imgHeight,
  },
  buttonContainer: {
    position: "absolute",
    height: "100%",
    width: "100%",
    alignItems: "center",
  },
  top: {
    height: imgHeight,
    justifyContent: "center",
    alignSelf: "flex-start",
  },
  topText: {
    color: colors.white,
    marginLeft: 32,
    fontSize: 40,
  },
  bottom: {
    flex: 1,
    alignItems: "center",
    paddingTop: 12,
    position: "absolute",
    bottom: "12%",
  },
  text: {
    color: colors.gray500,
    fontSize: 16,
    width: "80%",
    textAlign: "center",
    marginBottom: 24,
  },
  logoContainer: {
    flexDirection: "row",
    marginBottom: 32,
    height: 120,
    alignItems: "center",
  },
  logo: {
    width: 128,
    aspectRatio: 897 / 885,
    flex: 1,
  },
  uniLogo: {
    width: 144,
    aspectRatio: 200 / 85,
    flex: 1,
  },
  cochaLogo: {
    width: 144,
    flex: 1,
  },
});
