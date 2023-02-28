import React, { useState, useEffect } from "react";
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
  TextInput,
} from "react-native";
import { Input } from "react-native-elements";
import { Icon } from "react-native-elements";
const { width } = Dimensions.get("window");
import * as yup from "yup";
import { Formik } from "formik";
import { Button } from "@rneui/themed";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { useNavigation } from "@react-navigation/native";
import { auth } from "../firebase-config";
import {
  responsiveHeight,
  responsiveScreenWidth,
} from "react-native-responsive-dimensions";

let handleSignup = yup.object().shape({
  name: yup.string().required("*Please enter you name"),
  email: yup
    .string()
    .email("*Please enter valid email")
    .required("*Email Address is Required"),
  number: yup
    .string()
    .required("*Please enter you phone number")
    .matches(/^[0-9\b]+$/, "*Must be numeric form")
    .min(10, "*Invalid")
    .max(10, "*Invalid"),
  password: yup
    .string()
    .required("*Please Enter your password")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      "*Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
    ),
  confirmPassword: yup
    .string()
    .required("*Confirm password required")
    .oneOf([yup.ref("password"), null], "*Passwords must match"),
});

export default function Signup() {
  const [hidePass, setHidePass] = useState(true);
  const [hideCPass, setHideCPass] = useState(true);
  const navigation = useNavigation();
  const [data, setData] = useState({
    name: "",
    email: "",
    number: "",
    password: "",
    confirmPassword: "",
  });
  // function is using as a middleware to remove the duplicacy or copies of saved data
  const middeleWare = () => {
    console.log("Checking...");
  };

  // save all details of the user
  const saveData = async () => {
    const { name, email, number, password, confirmPassword } = data;
    if (
      name != "" &&
      email != "" &&
      password != "" &&
      number != "" &&
      confirmPassword != ""
    ) {
      const res = await fetch(
        "https://reactnativeform-f52ae-default-rtdb.firebaseio.com/registration.json",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            email,
            number,
            password,
            confirmPassword,
          }),
        }
      );
      loginData();
    }
  };

  useEffect(() => {
    saveData();
  }, [middeleWare]);

  const loginData = async () => {
    try {
      createUserWithEmailAndPassword(auth, data.email, data.password);
      // await sendEmailVerification(auth.currentUser)
      // alert("Email Send")
      setData({
        name: "",
        email: "",
        number: "",
        password: "",
        confirmPassword: "",
      });
      navigation.navigate("Login");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <Formik
      validationSchema={handleSignup}
      initialValues={{
        name: "",
        email: "",
        number: "",
        password: "",
        confirmPassword: "",
      }}
      onSubmit={(values, action) => {
        setData({
          ...data,
          name: values.name,
          email: values.email,
          number: values.number,
          password: values.password,
          confirmPassword: values.confirmPassword,
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
                            name="person"
                            size={20}
                            color="#ff7c00"
                          />
                        }
                        label="Sign Up"
                      
                        placeholder="Enter Your Full Name"
                        onChangeText={handleChange("name")}
                        onBlur={handleBlur("name")}
                        value={values.name}
                      />
                      {errors.name && touched.name && (
                        <Text style={styles.errorText}>{errors.name}</Text>
                      )}
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
                        onBlur={handleBlur("email")}
                        value={values.email}
                        autoCapitalize="none"
                        textContentType="emailAddress"
                        keyboardType="email-address"
                      />
                      {errors.email && touched.email && (
                        <Text style={styles.errorText}>{errors.email}</Text>
                      )}
                      <Input
                        inputContainerStyle={{ borderBottomWidth: 0.3 }}
                        style={styles.textStyle}
                        leftIcon={
                          <Icon
                            style={{ marginRight: 8 }}
                            name="phone"
                            size={20}
                            color="#ff7c00"
                          />
                        }
                        placeholder="Enter Your Number"
                        onChangeText={handleChange("number")}
                        onBlur={handleBlur("number")}
                        value={values.number}
                      />
                      {errors.number && touched.number && (
                        <Text style={styles.errorText}>{errors.number}</Text>
                      )}
                      <Input
                        inputContainerStyle={{ borderBottomWidth: 0.3 }}
                        style={styles.textStyle}
                        secureTextEntry={hidePass ? true : false}
                        disabledInputStyle={{ background: "#ddd" }}
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
                        autoCapitalize={false}
                        placeholder="Enter Your Password"
                        onChangeText={handleChange("password")}
                        onBlur={handleBlur("password")}
                        value={values.password}
                      />
                      {errors.password && touched.password && (
                        <Text style={styles.errorText}>{errors.password}</Text>
                      )}
                      <Input
                        inputContainerStyle={{ borderBottomWidth: 0.3 }}
                        style={styles.textStyle}
                        secureTextEntry={hideCPass ? true : false}
                        disabledInputStyle={{ background: "#ddd" }}
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
                            name={hideCPass ? "eye-slash" : "eye"}
                            size={22}
                            type="font-awesome"
                            color="#A9A9A9"
                            onPress={() => setHideCPass(!hideCPass)}
                          />
                        }
                        autoCapitalize={false}
                        placeholder="Confirm-Password"
                        onChangeText={handleChange("confirmPassword")}
                        onBlur={handleBlur("confirmPassword")}
                        value={values.confirmPassword}
                      />
                      {errors.confirmPassword && touched.confirmPassword && (
                        <Text style={styles.errorText}>
                          {errors.confirmPassword}
                        </Text>
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
                              name="create"
                              size={22}
                              color="white"
                              style={{ marginRight: 5 }}
                            />
                          }
                          title="Sign Up"
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
                              name="create"
                              size={22}
                              color="white"
                              style={{ marginRight: 5 }}
                            />
                          }
                          title="Sign Up"
                        />
                      )}

                      <Text style={styles.logintext}>
                        Alreay Have an Account?{" "}
                        <Text
                          onPress={() => navigation.navigate("Login")}
                          style={{
                            color: "blue",
                            fontSize: 16,
                            fontWeight: "400",
                          }}
                        >
                          Login
                        </Text>
                      </Text>
                    </View>
                  </TouchableWithoutFeedback>
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
    borderRadius: 10,
  },
  container: {
    height: 150,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  container2: {
    marginTop: 150,
    Top: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    height: responsiveHeight(10),
    width: responsiveScreenWidth(30),
    bottom: responsiveHeight(-8),
    marginTop: responsiveHeight(10),
    resizeMode: "contain",
  },

  inner: {
    width: width - 30,
  },

  errorText: {
    color: "red",
    fontWeight: "bold",
    fontSize: 14.6,
    marginLeft: 35,
    marginTop: -25,
  },

  buttonStyle: {
    borderRadius: 20,
  },

  logintext: {
    color: "grey",
    marginTop: 8,
    marginLeft: 20,
    marginBottom: 30,
    fontWeight: "400",
  },
  textStyle: {
    color: "black",
    fontWeight: "500",
  },
});
