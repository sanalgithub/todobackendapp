import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { colors } from "../colors/colors";

const ForgotPasswordScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleResetPassword = () => {
    navigation.navigate("resetpassword");
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backButtonWrapper}
        onPress={handleGoBack}
      ></TouchableOpacity>
      <View style={styles.textContainer}>
        <Text style={styles.headingText}>Forgot</Text>
        <Text style={styles.headingText}>Password?</Text>
      </View>
      <View style={styles.descriptionContainer}>
        <Text style={styles.descriptionText}>
          Enter your email address and we'll send you a link to reset your
          password.
        </Text>
      </View>
      {/* Form */}
      <View style={styles.formContainer}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.textInput}
            placeholder="Enter your email"
            placeholderTextColor={colors.secondary}
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />
        </View>
        <TouchableOpacity
          style={styles.resetButtonWrapper}
          onPress={handleResetPassword}
        >
          <Text style={styles.resetText}>Reset Password</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ForgotPasswordScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    padding: 20,
  },
  backButtonWrapper: {
    height: 40,
    width: 40,
    backgroundColor: colors.gray,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  textContainer: {
    marginVertical: 20,
  },
  headingText: {
    fontSize: 32,
    color: colors.primary,
  },
  descriptionContainer: {
    marginVertical: 10,
  },
  descriptionText: {
    color: colors.secondary,
    fontSize: 16,
  },
  formContainer: {
    marginTop: 20,
  },
  inputContainer: {
    borderWidth: 1,
    borderColor: colors.secondary,
    borderRadius: 100,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    padding: 2,
    marginVertical: 10,
  },
  textInput: {
    flex: 1,
    paddingHorizontal: 10,
  },
  resetButtonWrapper: {
    backgroundColor: colors.primary,
    borderRadius: 100,
    marginTop: 20,
  },
  resetText: {
    color: colors.white,
    fontSize: 20,
    textAlign: "center",
    padding: 10,
  },
});
