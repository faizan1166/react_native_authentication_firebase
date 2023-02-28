import React, { useEffect, useState } from "react";
import {
  Text,
  Dimensions,
  ScrollView,
  Keyboard,
  TouchableWithoutFeedback,
  View,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
} from "react-native";
import { Input } from "react-native-elements";
import { Icon } from "@rneui/themed";
const { width } = Dimensions.get("window");
import * as yup from "yup";
import { Formik } from "formik";
import { Button } from "@rneui/themed";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase-config";
import { useNavigation } from "@react-navigation/native";
import {
  responsiveHeight,
  responsiveScreenWidth,
} from "react-native-responsive-dimensions";

let handleLogin = yup.object().shape({
  email: yup
    .string()
    .email("*Please enter valid email")
    .required("*Email Address is Required"),
  password: yup
    .string()
    .required("*Please Enter your password")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      "*Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
    ),
});

export default function Login() {
  const navigation = useNavigation();
  const [hidePass, setHidePass] = useState(true);
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const middeleWare = () => {
    console.log("checking...");
  };

  useEffect(() => {
    login();
  }, [middeleWare]);

  const login = () => {
    if (data.email != "" && data.password != " ") {
      signInWithEmailAndPassword(auth, data.email, data.password)
        .then(() => {
          // if(auth.currentUser.emailVerified){
          //     console.log(auth.currentUser.emailVerified)
          setData({ email: "", password: "" });
          navigation.navigate("Home");
          // }else{
          //     alert("verify you email address")
        })
        .catch((error) => {
          console.log(error.message);
        });
    }
  };

  return (
    <Formik
      validationSchema={handleLogin}
      initialValues={{ email: "", password: "" }}
      onSubmit={(values, action) => {
        setData({
          ...data,
          email: values.email,
          password: values.password,
        }),
          middeleWare(),
          action.resetForm();
      }}
    >
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        errors,
        touched,
        isValid,
      }) => (
        <>
          <View style={styles.mainContainer}>
            <ScrollView>
              <View style={styles.container}>
                <Image
                  style={styles.image}
                  source={require("../images/logo.png")}
                />
              </View>
              <View style={styles.container2}>
                <KeyboardAvoidingView
                  behavior={Platform.OS === "ios" ? "padding" : "height"}
                >
                  <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={styles.inner}>
                      <Input
                        inputContainerStyle={{ borderBottomWidth: 0.3 }}
                        style={styles.textStyle}
                        leftIcon={
                          <Icon
                            style={{ marginRight: 8 }}
                            name="mail"
                            size={20}
                            color="#ff7c00"
                          />
                        }
                        placeholder="Enter Your Email"
                        onChangeText={handleChange("email")}
                        label={"Login"}
                        onBlur={handleBlur("email")}
                        value={values.email}
                        autoCapitalize="none"
                        keyboardType="email-address"
                      />
                      {errors.email && touched.email && (
                        <Text style={styles.errorText}>{errors.email}</Text>
                      )}

                      <Input
                        inputContainerStyle={{ borderBottomWidth: 0.3 }}
                        style={styles.textStyle}
                        secureTextEntry={hidePass ? true : false}
                        disabledInputStyle={{ background: "#ddd" }}
                        autoCapitalize={false}
                        leftIcon={
                          <Icon
                            style={{ marginRight: 8 }}
                            name="lock"
                            size={20}
                            color="#ff7c00"
                          />
                        }
                        rightIcon={
                          <Icon
                            name={hidePass ? "eye-slash" : "eye"}
                            size={22}
                            type="font-awesome"
                            color="#A9A9A9"
                            onPress={() => setHidePass(!hidePass)}
                          />
                        }
                        placeholder="Enter Your Password"
                        onChangeText={handleChange("password")}
                        onBlur={handleBlur("password")}
                        value={values.password}
                      />

                      {errors.password && touched.password && (
                        <Text style={styles.errorText}>{errors.password}</Text>
                      )}
                      {isValid ? (
                        <Button
                          buttonStyle={{
                            borderRadius: 20,
                            backgroundColor: "#ff7c00",
                          }}
                          titleStyle={{ fontWeight: "bold", fontSize: 17 }}
                          containerStyle={{
                            marginHorizontal: 50,
                            height: 50,
                            marginVertical: 10,
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                          onPress={handleSubmit}
                          icon={
                            <Icon
                              name="login"
                              size={22}
                              color="white"
                              style={{ marginRight: 5 }}
                            />
                          }
                          title="Login"
                        />
                      ) : (
                        <Button
                          disabled={true}
                          buttonStyle={{
                            borderRadius: 20,
                          }}
                          titleStyle={{ fontWeight: "bold", fontSize: 17 }}
                          containerStyle={{
                            marginHorizontal: 50,
                            height: 50,
                            marginVertical: 10,
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                          onPress={handleSubmit}
                          icon={
                            <Icon
                              name="login"
                              size={22}
                              color="white"
                              style={{ marginRight: 5 }}
                            />
                          }
                          title="Login"
                        />
                      )}
                    </View>
                  </TouchableWithoutFeedback>

                  <Text style={styles.textSignup}>
                    Don't have an account?{" "}
                    <Text
                      onPress={() => {
                        navigation.navigate("Signup");
                      }}
                      style={{
                        color: "blue",
                        fontSize: 16,
                        fontWeight: "400",
                      }}
                    >
                      sign up
                    </Text>
                  </Text>
                </KeyboardAvoidingView>
              </View>
            </ScrollView>
          </View>
        </>
      )}
    </Formik>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "white",
  },
  container: {
    flex: 1,
    alignItems: "center",
    height: 200,
  },
  container2: {
    flex: 1,
    marginTop: 150,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  image: {
    height: responsiveHeight(15),
    width: responsiveScreenWidth(30),
    bottom: responsiveHeight(-8),
    marginTop: responsiveHeight(10),
    resizeMode: "contain",
  },

  inner: {
    height: 70,
    width: width - 30,
    marginBottom: responsiveHeight(10),
  },
  errorText: {
    color: "red",
    marginLeft: 35,
    fontWeight: "bold",
    marginTop: -25,
  },
  buttonStyle: {
    borderRadius: 20,
  },
  textSignup: {
    color: "grey",
    marginTop: 170,
    marginLeft: 20,
    fontWeight: "400",
    fontSize: 14.6,
  },
  textStyle: {
    color: "black",
    fontWeight: "500",
  },
});
