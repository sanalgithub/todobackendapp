import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { colors } from "../colors/colors";

const ResetPasswordScreen = () => {
  const navigation = useNavigation();
  const [secureEntry, setSecureEntry] = useState(true);
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleLogin = () => {
    navigation.navigate("login");
  };

  const toggleSecureEntry = () => {
    setSecureEntry((prev) => !prev);
  };

  const handleResetPassword = () => {
    console.log("OTP:", otp);
    console.log("Password:", password);
    console.log("Confirm Password:", confirmPassword);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButtonWrapper} onPress={handleGoBack}>
        <Text>Back</Text>
      </TouchableOpacity>
      <View style={styles.textContainer}>
        <Text style={styles.headingText}>Reset</Text>
        <Text style={styles.headingText}>Password</Text>
      </View>
      <View style={styles.formContainer}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.textInput}
            placeholder="Enter OTP"
            placeholderTextColor={colors.secondary}
            keyboardType="number-pad"
            value={otp}
            onChangeText={setOtp}
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.textInput}
            placeholder="Enter new password"
            placeholderTextColor={colors.secondary}
            secureTextEntry={secureEntry}
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity
            onPress={toggleSecureEntry}
            style={styles.toggleButton}
          >
            <Text>Show/Hide</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.textInput}
            placeholder="Confirm new password"
            placeholderTextColor={colors.secondary}
            secureTextEntry={secureEntry}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
          <TouchableOpacity
            onPress={toggleSecureEntry}
            style={styles.toggleButton}
          >
            <Text>Show/Hide</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.loginButtonWrapper}
          onPress={handleResetPassword}
        >
          <Text style={styles.loginText}>Reset Password</Text>
        </TouchableOpacity>
        <View style={styles.footerContainer}>
          <Text style={styles.accountText}>Remember your password?</Text>
          <TouchableOpacity onPress={handleLogin}>
            <Text style={styles.signupText}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ResetPasswordScreen;

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
  loginButtonWrapper: {
    backgroundColor: colors.primary,
    borderRadius: 100,
    marginTop: 20,
    alignItems: "center", // Added for centering text inside TouchableOpacity
  },
  loginText: {
    color: colors.white,
    fontSize: 20,
    textAlign: "center",
    padding: 10,
  },
  footerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  accountText: {
    color: colors.primary,
  },
  signupText: {
    color: colors.primary,
    marginLeft: 5,
  },
  toggleButton: {
    position: "absolute",
    right: 10,
  },
});
